
// 'use client';

// import { useActionState, useEffect, useState, useMemo } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// import { createQuiz } from '@/lib/actions';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { FormSubmitButton } from '@/components/features/form-submit-button';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter,CardDescription } from '@/components/ui/card';
// import { Check, X, HelpCircle, Lightbulb, CheckCircle, Circle, Clock, Award, Target, Repeat, Star } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { Badge } from '@/components/ui/badge';
// import { Slider } from '@/components/ui/slider';
// import React from 'react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Button } from '../ui/button';
// import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
// import { Progress } from '../ui/progress';
// import { cn } from '@/lib/utils';
// import type { GenerateExamRelevantQuizzesOutput } from '@/ai/flows/generate-exam-relevant-quizzes';

// const quizSchema = z.object({
//   topic: z.string().min(3, 'Topic is required and must be at least 3 characters.'),
//   examType: z.string().min(3, 'Exam type is required and must be at least 3 characters.'),
//   numQuestions: z.coerce.number().min(1).max(10),
//   difficulty: z.enum(['Easy', 'Medium', 'Hard']),
// });

// type FormData = z.infer<typeof quizSchema>;

// type QuizState = 'configuring' | 'taking' | 'results';

// export default function QuizGenerator() {
//   const { toast } = useToast();
//   const [generateState, formAction, isPending] = useActionState(createQuiz, { message: '' });
  
//   const [numQuestions, setNumQuestions] = React.useState(5);
//   const [quizData, setQuizData] = useState<GenerateExamRelevantQuizzesOutput | null>(null);
//   const [quizState, setQuizState] = useState<QuizState>('configuring');
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
//   const [timeLeft, setTimeLeft] = useState(0);
  
//   const timeLimit = useMemo(() => (quizData?.quizQuestions.length || 0) * 60, [quizData]);

//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(quizSchema),
//     defaultValues: {
//       numQuestions: 5,
//       difficulty: 'Medium',
//     },
//   });
  
//   useEffect(() => {
//     if (generateState.message && generateState.message !== 'success') {
//       toast({ variant: 'destructive', title: 'Error Generating Quiz', description: generateState.message });
//       setQuizState('configuring');
//     }
//     if (generateState.message === 'success' && generateState.data) {
//       setQuizData(generateState.data);
//       setUserAnswers({});
//       setCurrentQuestionIndex(0);
//       setQuizState('taking');
//       setTimeLeft(generateState.data.quizQuestions.length * 60);
//     }
//   }, [generateState, toast]);
  
//   useEffect(() => {
//     setValue('numQuestions', numQuestions);
//   }, [numQuestions, setValue]);

//   useEffect(() => {
//     if (quizState !== 'taking' || timeLeft <= 0) return;
//     const timer = setInterval(() => {
//       setTimeLeft(prevTime => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           setQuizState('results');
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [quizState, timeLeft]);

//   const handleAnswerChange = (questionIndex: number, answer: string) => {
//     setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
//   };

//   const calculateScore = () => {
//     if (!quizData) return { score: 0, correct: 0 };
//     const correctAnswers = quizData.quizQuestions.reduce((count, question, index) => {
//         return userAnswers[index] === question.correctAnswer ? count + 1 : count;
//     }, 0);
//     return {
//         score: Math.round((correctAnswers / quizData.quizQuestions.length) * 100),
//         correct: correctAnswers
//     };
//   };

//   const resetQuiz = () => {
//     setQuizData(null);
//     setQuizState('configuring');
//   };

//   const { score, correct } = useMemo(calculateScore, [quizState, userAnswers, quizData]);

//   if (quizState === 'taking' && quizData) {
//     const currentQuestion = quizData.quizQuestions[currentQuestionIndex];
//     const progress = (timeLeft / timeLimit) * 100;
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;

//     return (
//         <Card>
//             <CardHeader>
//                 <div className="flex justify-between items-center">
//                     <CardTitle className="font-headline">Taking Quiz: {generateState.data?.topic}</CardTitle>
//                     <div className="flex items-center gap-2 text-sm font-medium">
//                         <Clock className="h-4 w-4" />
//                         <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
//                     </div>
//                 </div>
//                 <Progress value={progress} className="h-2" />
//             </CardHeader>
//             <CardContent className="space-y-6">
//                 <div>
//                     <p className="text-sm text-muted-foreground mb-2">Question {currentQuestionIndex + 1} of {quizData.quizQuestions.length}</p>
//                     <p className="font-semibold text-lg">{currentQuestion.question}</p>
//                 </div>
//                 <RadioGroup 
//                     value={userAnswers[currentQuestionIndex] || ''}
//                     onValueChange={(value) => handleAnswerChange(currentQuestionIndex, value)}
//                     className="space-y-2"
//                 >
//                     {currentQuestion.options.map((option, index) => (
//                         <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent has-[[data-state=checked]]:bg-accent">
//                             <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
//                             <Label htmlFor={`q${currentQuestionIndex}-o${index}`} className="flex-1 cursor-pointer">{option}</Label>
//                         </div>
//                     ))}
//                 </RadioGroup>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//                 <Button variant="outline" onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))} disabled={currentQuestionIndex === 0}>
//                     Previous
//                 </Button>
//                 {currentQuestionIndex < quizData.quizQuestions.length - 1 ? (
//                     <Button onClick={() => setCurrentQuestionIndex(p => Math.min(quizData.quizQuestions.length - 1, p + 1))}>
//                         Next
//                     </Button>
//                 ) : (
//                     <Button onClick={() => setQuizState('results')} className="bg-green-600 hover:bg-green-700">
//                         Submit Quiz
//                     </Button>
//                 )}
//             </CardFooter>
//         </Card>
//     );
//   }

//   if (quizState === 'results' && quizData) {
//       const isPass = score >= 70;
//       return (
//         <div className="space-y-6">
//             <Card className={cn("border-2", isPass ? "border-green-500" : "border-destructive")}>
//                 <CardHeader className="text-center">
//                     <Award className={cn("mx-auto h-12 w-12", isPass ? "text-green-500" : "text-destructive")} />
//                     <CardTitle className="font-headline text-2xl">{isPass ? 'Congratulations!' : 'Needs Improvement'}</CardTitle>
//                     <CardDescription>You scored {score}%</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="flex justify-around text-center">
//                         <div>
//                             <p className="text-2xl font-bold">{quizData.quizQuestions.length}</p>
//                             <p className="text-sm text-muted-foreground">Total Questions</p>
//                         </div>
//                         <div>
//                             <p className="text-2xl font-bold text-green-600">{correct}</p>
//                             <p className="text-sm text-muted-foreground">Correct</p>
//                         </div>
//                          <div>
//                             <p className="text-2xl font-bold text-red-600">{quizData.quizQuestions.length - correct}</p>
//                             <p className="text-sm text-muted-foreground">Incorrect</p>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             <Card>
//                 <CardHeader>
//                     <CardTitle className="font-headline">Review Your Answers</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     {quizData.quizQuestions.map((q, i) => {
//                         const userAnswer = userAnswers[i];
//                         const isCorrect = userAnswer === q.correctAnswer;
//                         return (
//                             <div key={i} className="rounded-md border p-4">
//                                 <p className="font-semibold mb-2">{i + 1}. {q.question}</p>
//                                 <div className="space-y-2">
//                                 {q.options.map((option, j) => {
//                                     const isUserChoice = userAnswer === option;
//                                     const isCorrectChoice = q.correctAnswer === option;
//                                     return (
//                                         <div key={j} className={cn("flex items-center gap-2 text-sm p-2 rounded-md", 
//                                             isCorrectChoice ? "bg-green-100 dark:bg-green-900/30" : isUserChoice ? "bg-red-100 dark:bg-red-900/30" : ""
//                                         )}>
//                                             {isCorrectChoice ? <CheckCircle className="h-4 w-4 text-green-600" /> : isUserChoice ? <X className="h-4 w-4 text-red-600" /> : <Circle className="h-4 w-4 text-muted-foreground/50" />}
//                                             <span>{option}</span>
//                                         </div>
//                                     )
//                                 })}
//                                 </div>
//                                 {!isCorrect && (
//                                     <div className="flex items-start gap-3 rounded-md bg-accent/50 p-3 mt-3">
//                                         <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
//                                         <div>
//                                             <h4 className="font-semibold">Explanation</h4>
//                                             <p className="text-sm text-muted-foreground">{q.explanation}</p>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </CardContent>
//             </Card>
//             <Button onClick={resetQuiz} className="w-full">
//                 <Repeat className="mr-2" />
//                 Take Another Quiz
//             </Button>
//         </div>
//       );
//   }

//   return (
//     <Card className="shadow-sm">
//       <CardHeader>
//           <CardTitle className="font-headline">Create a New Quiz</CardTitle>
//           <CardDescription>
//             Specify the topic, exam type, and number of questions to create a practice quiz instantly.
//           </CardDescription>
//         </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit(data => formAction(data as any))} className="space-y-6">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div className="space-y-2">
//                 <Label htmlFor="topic">Chapter or Topic</Label>
//                 <Input id="topic" placeholder="e.g., Work, Power, Energy" {...register('topic')} />
//                 {(errors.topic || generateState.errors?.topic) && (
//                     <p className="text-sm text-destructive">{errors.topic?.message || generateState.errors?.topic?.[0]}</p>
//                 )}
//             </div>
//             <div className="space-y-2">
//                 <Label htmlFor="examType">Exam Type</Label>
//                 <Input id="examType" placeholder="e.g., Board Exam" {...register('examType')} />
//                 {(errors.examType || generateState.errors?.examType) && (
//                     <p className="text-sm text-destructive">{errors.examType?.message || generateState.errors?.examType?.[0]}</p>
//                 )}
//             </div>
//             </div>

//             <div className="space-y-2">
//                 <Label htmlFor="difficulty">Difficulty Level</Label>
//                 <Select onValueChange={(value) => setValue('difficulty', value as 'Easy' | 'Medium' | 'Hard')} defaultValue="Medium">
//                     <SelectTrigger id="difficulty">
//                         <SelectValue placeholder="Select difficulty" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="Easy"><div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400" /> Easy</div></SelectItem>
//                         <SelectItem value="Medium"><div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /> Medium</div></SelectItem>
//                         <SelectItem value="Hard"><div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /> Hard</div></SelectItem>
//                     </SelectContent>
//                 </Select>
//                 {(errors.difficulty || generateState.errors?.difficulty) && (
//                     <p className="text-sm text-destructive">{errors.difficulty?.message || generateState.errors?.difficulty?.[0]}</p>
//                 )}
//             </div>

//             <div className="space-y-3">
//             <Label htmlFor="numQuestions">Number of Questions: <Badge variant="secondary">{numQuestions}</Badge></Label>
//             <Slider
//                 id="numQuestions"
//                 min={1}
//                 max={10}
//                 step={1}
//                 value={[numQuestions]}
//                 onValueChange={(value) => setNumQuestions(value[0])}
//             />
//             {(errors.numQuestions || generateState.errors?.numQuestions) && (
//                     <p className="text-sm text-destructive">{errors.numQuestions?.message || generateState.errors?.numQuestions?.[0]}</p>
//                 )}
//             </div>
//             <input type="hidden" {...register('numQuestions')} />
            
//             <FormSubmitButton disabled={isPending}>
//                 {isPending ? 'Generating...' : 'Start Quiz'}
//             </FormSubmitButton>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

    

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Check, X, Lightbulb, CheckCircle, Circle, Clock, Award, Repeat, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

const quizSchema = z.object({
  topic: z.string().min(3, 'Topic is required and must be at least 3 characters.'),
  examType: z.string().min(3, 'Exam type is required and must be at least 3 characters.'),
  numQuestions: z.coerce.number().min(1).max(10),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
});

type FormData = z.infer<typeof quizSchema>;

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

type QuizResponse = {
  topic?: string;
  quizQuestions: QuizQuestion[];
};

type QuizState = 'configuring' | 'taking' | 'results';

export default function QuizGenerator() {
  const { toast } = useToast();

  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [quizData, setQuizData] = useState<QuizResponse | null>(null);
  const [quizState, setQuizState] = useState<QuizState>('configuring');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const timeLimit = useMemo(() => (quizData?.quizQuestions.length || 0) * 60, [quizData]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      numQuestions: 5,
      difficulty: 'Medium',
    },
  });

  useEffect(() => {
    setValue('numQuestions', numQuestions);
  }, [numQuestions, setValue]);

  useEffect(() => {
    if (quizState !== 'taking' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setQuizState('results');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizState, timeLeft]);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const calculateScore = () => {
    if (!quizData) return { score: 0, correct: 0 };
    const correctAnswers = quizData.quizQuestions.reduce((count, question, index) => {
      return userAnswers[index] === question.correctAnswer ? count + 1 : count;
    }, 0);
    return {
      score: Math.round((correctAnswers / quizData.quizQuestions.length) * 100),
      correct: correctAnswers
    };
  };

  const resetQuiz = () => {
    setQuizData(null);
    setQuizState('configuring');
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(0);
  };

  const { score, correct } = useMemo(calculateScore, [quizState, userAnswers, quizData]);

  // New: call FastAPI /quiz
  const fetchQuizFromApi = async (data: FormData) => {
    setIsPending(true);
    try {
      const body = {
        scope: data.topic || data.examType || 'whole book',
        num_questions: Number(data.numQuestions || numQuestions),
        difficulty: data.difficulty.toLowerCase() // fastapi expects "medium" maybe - but we'll accept either
      };

      const res = await fetch(`${API_BASE}/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        const err = json?.detail || json?.error || JSON.stringify(json);
        toast({ variant: 'destructive', title: 'Quiz API error', description: String(err) });
        setIsPending(false);
        return;
      }

      // Expected: { "result": { quizQuestions: [...] } } OR { "result": "<raw text>" }
      const result = json.result;
      if (!result) {
        toast({ variant: 'destructive', title: 'Quiz API', description: 'Empty result from server.' });
        setIsPending(false);
        return;
      }

      // If result is string, try to parse as JSON
      let parsed: QuizResponse | null = null;
      if (typeof result === 'string') {
        try {
          parsed = JSON.parse(result);
        } catch (e) {
          // fallback: not JSON
          toast({
            variant: 'destructive',
            title: 'Quiz API response not JSON',
            description: 'Server returned plain text. Check the API or model output.'
          });
          setIsPending(false);
          return;
        }
      } else if (typeof result === 'object') {
        parsed = result as QuizResponse;
      }

      if (!parsed || !Array.isArray(parsed.quizQuestions)) {
        toast({
          variant: 'destructive',
          title: 'Invalid quiz format',
          description: 'API returned unexpected structure. Expecting quizQuestions array.'
        });
        setIsPending(false);
        return;
      }

      // set topic if not included
      if (!parsed.topic) parsed.topic = data.topic;

      setQuizData(parsed);
      setUserAnswers({});
      setCurrentQuestionIndex(0);
      setQuizState('taking');
      setTimeLeft(parsed.quizQuestions.length * 60);
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Network error', description: String(err) });
    } finally {
      setIsPending(false);
    }
  };

  // UI: Taking state
  if (quizState === 'taking' && quizData) {
    const currentQuestion = quizData.quizQuestions[currentQuestionIndex];
    const progress = timeLimit ? (timeLeft / timeLimit) * 100 : 0;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-headline">Taking Quiz: {quizData.topic}</CardTitle>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Question {currentQuestionIndex + 1} of {quizData.quizQuestions.length}</p>
            <p className="font-semibold text-lg">{currentQuestion.question}</p>
          </div>
          <RadioGroup
            value={userAnswers[currentQuestionIndex] || ''}
            onValueChange={(value) => handleAnswerChange(currentQuestionIndex, value)}
            className="space-y-2"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
                <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
                <Label htmlFor={`q${currentQuestionIndex}-o${index}`} className="flex-1 cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          {currentQuestionIndex < quizData.quizQuestions.length - 1 ? (
            <Button onClick={() => setCurrentQuestionIndex(p => Math.min(quizData.quizQuestions.length - 1, p + 1))}>
              Next
            </Button>
          ) : (
            <Button onClick={() => setQuizState('results')} className="bg-green-600 hover:bg-green-700">
              Submit Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  // UI: Results
  if (quizState === 'results' && quizData) {
    const isPass = score >= 70;
    return (
      <div className="space-y-6">
        <Card className={cn("border-2", isPass ? "border-green-500" : "border-destructive")}>
          <CardHeader className="text-center">
            <Award className={cn("mx-auto h-12 w-12", isPass ? "text-green-500" : "text-destructive")} />
            <CardTitle className="font-headline text-2xl">{isPass ? 'Congratulations!' : 'Needs Improvement'}</CardTitle>
            <CardDescription>You scored {score}%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-bold">{quizData.quizQuestions.length}</p>
                <p className="text-sm text-muted-foreground">Total Questions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{correct}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{quizData.quizQuestions.length - correct}</p>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Review Your Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quizData.quizQuestions.map((q, i) => {
              const userAnswer = userAnswers[i];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={i} className="rounded-md border p-4">
                  <p className="font-semibold mb-2">{i + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, j) => {
                      const isUserChoice = userAnswer === option;
                      const isCorrectChoice = q.correctAnswer === option;
                      return (
                        <div key={j} className={cn("flex items-center gap-2 text-sm p-2 rounded-md",
                          isCorrectChoice ? "bg-green-100 dark:bg-green-900/30" : isUserChoice ? "bg-red-100 dark:bg-red-900/30" : ""
                        )}>
                          {isCorrectChoice ? <CheckCircle className="h-4 w-4 text-green-600" /> : isUserChoice ? <X className="h-4 w-4 text-red-600" /> : <Circle className="h-4 w-4 text-muted-foreground/50" />}
                          <span>{option}</span>
                        </div>
                      )
                    })}
                  </div>
                  {!isCorrect && (
                    <div className="flex items-start gap-3 rounded-md bg-accent/50 p-3 mt-3">
                      <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Explanation</h4>
                        <p className="text-sm text-muted-foreground">{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Button onClick={resetQuiz} className="w-full">
          <Repeat className="mr-2" />
          Take Another Quiz
        </Button>
      </div>
    );
  }

  // Default: configuration form
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="font-headline">Create a New Quiz</CardTitle>
        <CardDescription>
          Specify the topic, exam type, and number of questions to request a quiz from your FastAPI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((data) => fetchQuizFromApi(data))} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="topic">Chapter or Topic</Label>
              <Input id="topic" placeholder="e.g., Work, Power, Energy" {...register('topic')} />
              {(errors.topic) && (
                <p className="text-sm text-destructive">{errors.topic?.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Input id="examType" placeholder="e.g., Board Exam" {...register('examType')} />
              {(errors.examType) && (
                <p className="text-sm text-destructive">{errors.examType?.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select onValueChange={(value) => setValue('difficulty', value as 'Easy' | 'Medium' | 'Hard')} defaultValue="Medium">
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy"><div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400" /> Easy</div></SelectItem>
                <SelectItem value="Medium"><div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /> Medium</div></SelectItem>
                <SelectItem value="Hard"><div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /><Star className="h-4 w-4 text-yellow-400" /> Hard</div></SelectItem>
              </SelectContent>
            </Select>
            {(errors.difficulty) && (
              <p className="text-sm text-destructive">{errors.difficulty?.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="numQuestions">Number of Questions: <Badge variant="secondary">{numQuestions}</Badge></Label>
            <Slider
              id="numQuestions"
              min={1}
              max={10}
              step={1}
              value={[numQuestions]}
              onValueChange={(value) => setNumQuestions(value[0])}
            />
            {(errors.numQuestions) && (
              <p className="text-sm text-destructive">{errors.numQuestions?.message}</p>
            )}
          </div>
          <input type="hidden" {...register('numQuestions')} />

          <FormSubmitButton disabled={isPending}>
            {isPending ? 'Requesting quiz...' : 'Start Quiz'}
          </FormSubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
