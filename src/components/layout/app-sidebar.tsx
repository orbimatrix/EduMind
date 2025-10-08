
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrainCircuit, GraduationCap, LayoutDashboard, ListTodo, MessageSquareQuote, MessagesSquare, Search, User } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/study-plan', label: 'Study Plan', icon: ListTodo },
  { href: '/quizzes', label: 'Quizzes', icon: MessageSquareQuote },
  { href: '/chat', label: 'Chat', icon: MessagesSquare },
  { href: '/topics', label: 'Key Topics', icon: Search },
  { href: '/augment', label: 'Augment', icon: BrainCircuit },
  { href: '/profile', label: 'Profile', icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-semibold text-primary">EduMind AI</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-9 w-9">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <span className="truncate text-sm font-medium">Guest User</span>
            <span className="truncate text-xs text-muted-foreground">guest@edumind.ai</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
