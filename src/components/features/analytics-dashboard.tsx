
'use client';

import React from 'react';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const accuracyData = [
  { subject: 'Physics', accuracy: 85 },
  { subject: 'Math', accuracy: 92 },
  { subject: 'Chemistry', accuracy: 78 },
  { subject: 'Biology', accuracy: 88 },
  { subject: 'History', accuracy: 95 },
];

const timeSpentData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 2.5 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 2 },
  { day: 'Fri', hours: 4 },
  { day: 'Sat', hours: 5 },
  { day: 'Sun', hours: 3.5 },
];

const topicMasteryData = [
  { name: 'Mechanics', value: 400 },
  { name: 'Calculus', value: 300 },
  { name: 'Organic Chem', value: 300 },
  { name: 'Genetics', value: 200 },
];
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];


const comparativeData = [
    { subject: 'Physics', user: 85, average: 75 },
    { subject: 'Math', user: 92, average: 88 },
    { subject: 'Chemistry', user: 78, average: 82 },
    { subject: 'Biology', user: 88, average: 85 },
];


export default function AnalyticsDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Accuracy Chart</CardTitle>
          <CardDescription>Your performance by subject.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Time Spent This Week</CardTitle>
          <CardDescription>Your daily study duration.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSpentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Topic Mastery</CardTitle>
          <CardDescription>Progress across different subjects.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={topicMasteryData} cx="50%" cy="50%" labelLine={false} outerRadius={80} dataKey="value" nameKey="name" label>
                 {topicMasteryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Comparative Performance</CardTitle>
          <CardDescription>Your scores vs. the class average.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparativeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="user" fill="hsl(var(--primary))" name="Your Score" />
                <Bar dataKey="average" fill="hsl(var(--secondary))" name="Class Average" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}
