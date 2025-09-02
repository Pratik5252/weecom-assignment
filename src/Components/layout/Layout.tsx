import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/Components/ui/sidebar';
import { AppSidebar } from '@/Components/layout/AppSidebar';
import { Toaster } from 'sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main>
                    <Toaster />
                    <div className='flex items-center gap-2 border-b py-2'>
                        <SidebarTrigger />
                        <p>Dashboard</p>
                    </div>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
