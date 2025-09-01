import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from '@/Components/ui/sidebar';

export function AppSidebar() {
    return (
        <Sidebar
            variant="floating"
            collapsible="icon"
            className="overflow-hidden"
        >
            <SidebarHeader />
            <SidebarContent>
                <div>asda</div>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
