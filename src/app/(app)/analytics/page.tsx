
import AnalyticsDashboard from '@/components/features/analytics-dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LineChart } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <LineChart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Performance Analytics</h1>
          <p className="mt-1 text-muted-foreground">
            Track your progress, identify strengths, and see how you stack up.
          </p>
        </div>
      </div>

      <AnalyticsDashboard />
      
    </div>
  );
}
