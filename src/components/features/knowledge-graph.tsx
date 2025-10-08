
'use client';

import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Line } from 'recharts';

const data = {
  nodes: [
    { name: 'Physics', x: 100, y: 200, z: 200, type: 'subject' },
    { name: 'Mechanics', x: 200, y: 150, z: 150, type: 'branch' },
    { name: 'Newton\'s Laws', x: 300, y: 180, z: 120, type: 'topic' },
    { name: 'First Law', x: 400, y: 160, z: 80, type: 'concept' },
    { name: 'Second Law', x: 400, y: 200, z: 80, type: 'concept' },
    { name: 'Quantum Mechanics', x: 250, y: 300, z: 150, type: 'branch' },
    { name: 'Schrödinger Eq.', x: 350, y: 320, z: 120, type: 'topic' },
    { name: 'Mathematics', x: 500, y: 250, z: 200, type: 'subject' },
    { name: 'Calculus', x: 600, y: 280, z: 150, type: 'branch' },
  ],
  edges: [
    { from: 'Physics', to: 'Mechanics' },
    { from: 'Physics', to: 'Quantum Mechanics' },
    { from: 'Mechanics', to: 'Newton\'s Laws' },
    { from: 'Newton\'s Laws', to: 'First Law' },
    { from: 'Newton\'s Laws', to: 'Second Law' },
    { from: 'Quantum Mechanics', to: 'Schrödinger Eq.' },
    { from: 'Second Law', to: 'Calculus' },
    { from: 'Mathematics', to: 'Calculus' },
  ],
};

const nodeColors: { [key: string]: string } = {
    subject: 'hsl(var(--primary))',
    branch: 'hsl(var(--chart-2))',
    topic: 'hsl(var(--chart-3))',
    concept: 'hsl(var(--chart-4))'
}


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-popover p-2.5 text-popover-foreground shadow-sm">
        <p className="font-bold">{data.name}</p>
        <p className="text-sm capitalize text-muted-foreground">{data.type}</p>
      </div>
    );
  }
  return null;
};


export default function KnowledgeGraph() {
  const findNode = (name: string) => data.nodes.find(n => n.name === name);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis type="number" dataKey="x" name="x" hide />
          <YAxis type="number" dataKey="y" name="y" hide />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="size" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          
          {data.edges.map((edge, index) => {
            const fromNode = findNode(edge.from);
            const toNode = findNode(edge.to);
            if (!fromNode || !toNode) return null;
            return (
              <Line
                key={`line-${index}`}
                points={[{ x: fromNode.x, y: fromNode.y }, { x: toNode.x, y: toNode.y }]}
                stroke="hsl(var(--border))"
                strokeWidth={2}
              />
            );
          })}

          <Scatter name="Concepts" data={data.nodes} fill="hsl(var(--primary))">
             {data.nodes.map((entry, index) => (
              <circle
                key={`cell-${index}`}
                cx={entry.x}
                cy={entry.y}
                r={10}
                fill={nodeColors[entry.type] || 'hsl(var(--primary))'}
              />
            ))}
          </Scatter>
          
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
