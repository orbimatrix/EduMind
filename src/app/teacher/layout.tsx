
import AppHeader from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { GamificationProvider } from '@/context/gamification-context';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <GamificationProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </GamificationProvider>
  );
}
