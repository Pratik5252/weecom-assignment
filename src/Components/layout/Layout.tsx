import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/Components/ui/sidebar';
import { AppSidebar } from '@/Components/layout/AppSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
