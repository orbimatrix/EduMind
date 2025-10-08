
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
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const students = [
  { id: 'S001', name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/alice/100/100', grade: 92, progress: 92, status: 'On Track' },
  { id: 'S002', name: 'Bob Williams', avatar: 'https://picsum.photos/seed/bob/100/100', grade: 85, progress: 85, status: 'On Track' },
  { id: 'S003', name: 'Charlie Brown', avatar: 'https://picsum.photos/seed/charlie/100/100', grade: 74, progress: 74, status: 'Needs Attention' },
  { id: 'S004', name: 'Diana Miller', avatar: 'https://picsum.photos/seed/diana/100/100', grade: 98, progress: 98, status: 'Excelling' },
  { id: 'S005', name: 'Ethan Davis', avatar: 'https://picsum.photos/seed/ethan/100/100', grade: 65, progress: 65, status: 'At Risk' },
  { id: 'S006', name: 'Fiona Garcia', avatar: 'https://picsum.photos/seed/fiona/100/100', grade: 88, progress: 88, status: 'On Track' },
];

export default function StudentRoster() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Overall Grade</TableHead>
              <TableHead className="w-[200px]">Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
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
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      student.status === 'Excelling' ? 'bg-green-100 text-green-800' :
                      student.status === 'On Track' ? 'bg-blue-100 text-blue-800' :
                      student.status === 'Needs Attention' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {student.status}
                  </span>
                </TableCell>
                <TableCell>
                   <div className={`font-semibold ${student.grade >= 90 ? 'text-green-600' : student.grade >= 80 ? 'text-blue-600' : student.grade >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {student.grade}%
                   </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={student.progress} className="h-2" />
                    <span>{student.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
