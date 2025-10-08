
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Download, Filter, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"

const gradeData = [
  { id: 'S001', name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/alice/100/100', assignments: { quiz1: 95, midterm: 88, project1: 92 } },
  { id: 'S002', name: 'Bob Williams', avatar: 'https://picsum.photos/seed/bob/100/100', assignments: { quiz1: 82, midterm: 85, project1: 87 } },
  { id: 'S003', name: 'Charlie Brown', avatar: 'https://picsum.photos/seed/charlie/100/100', assignments: { quiz1: 70, midterm: 75, project1: 78 } },
  { id: 'S004', name: 'Diana Miller', avatar: 'https://picsum.photos/seed/diana/100/100', assignments: { quiz1: 98, midterm: 95, project1: 100 } },
  { id: 'S005', name: 'Ethan Davis', avatar: 'https://picsum.photos/seed/ethan/100/100', assignments: { quiz1: 60, midterm: 68, project1: 72 } },
  { id: 'S006', name: 'Fiona Garcia', avatar: 'https://picsum.photos/seed/fiona/100/100', assignments: { quiz1: 88, midterm: 90, project1: 85 } },
];

const assignmentWeights = {
    quiz1: 0.2,
    midterm: 0.4,
    project1: 0.4
}

const calculateFinalGrade = (assignments: Record<string, number>) => {
    let finalGrade = 0;
    for (const assignment in assignments) {
        if(assignment in assignmentWeights) {
            finalGrade += assignments[assignment] * (assignmentWeights as any)[assignment];
        }
    }
    return Math.round(finalGrade);
}

const GradeCell = ({ grade }: { grade: number | null }) => {
    if (grade === null || grade === undefined) {
        return <TableCell className="text-center text-muted-foreground">-</TableCell>;
    }
    const getColor = () => {
        if (grade >= 90) return 'text-green-600';
        if (grade >= 80) return 'text-blue-600';
        if (grade >= 70) return 'text-yellow-600';
        return 'text-red-600';
    }
    return <TableCell className={`text-center font-medium ${getColor()}`}>{grade}</TableCell>;
}

export default function Gradebook() {
  return (
    <div className="w-full space-y-4">
       <div className="flex items-center justify-between gap-2">
            <div className="relative w-full max-w-sm">
                <Input placeholder="Search students..." />
            </div>
            <div className="flex gap-2">
                <Button variant="outline"><Filter className="mr-2" /> Filter</Button>
                <Button variant="outline"><Download className="mr-2" /> Export</Button>
            </div>
        </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Student</TableHead>
              <TableHead className="text-center">Quiz 1</TableHead>
              <TableHead className="text-center">Midterm</TableHead>
              <TableHead className="text-center">Project 1</TableHead>
              <TableHead className="text-center font-bold bg-muted/50">Final Grade</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gradeData.map((student) => {
              const finalGrade = calculateFinalGrade(student.assignments);
              return (
                <TableRow key={student.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div>{student.name}</div>
                                <div className="text-xs text-muted-foreground">{student.id}</div>
                            </div>
                        </div>
                    </TableCell>
                    <GradeCell grade={student.assignments.quiz1} />
                    <GradeCell grade={student.assignments.midterm} />
                    <GradeCell grade={student.assignments.project1} />
                    <GradeCell grade={finalGrade} />

                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
