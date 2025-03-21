
import React from 'react';
import { 
  CircleAlert, 
  BarChart4, 
  LayoutDashboard, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  Settings, 
  CreditCard,
  UsersRound,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/', group: 'Overview' },
    { icon: CreditCard, label: 'Transactions', href: '/transactions', group: 'Overview' },
    { icon: AlertTriangle, label: 'Alerts', href: '/alerts', group: 'Overview' },
    { icon: BarChart4, label: 'Metrics', href: '/metrics', group: 'Overview' },
    { icon: CircleAlert, label: 'Rule Engine', href: '/rule-engine', group: 'Management' },
    { icon: FileText, label: 'Reports', href: '/reports', group: 'Management' },
    { icon: UsersRound, label: 'Entities', href: '/entities', group: 'Management' },
  ];

  const MenuItem = ({ icon: Icon, label, href, isActive }: { icon: any, label: string, href: string, isActive?: boolean }) => (
    <SidebarMenuItem>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton 
              asChild 
              className={`group transition-all duration-200 hover:bg-white/10 ${isActive ? 'bg-white/10' : ''}`}
            >
              <a href={href} className="flex items-center gap-3 py-2 px-4 rounded-lg overflow-hidden">
                <span className={`relative flex items-center justify-center w-8 h-8 ${isActive ? 'text-primary' : 'text-white/60 group-hover:text-white'}`}>
                  <Icon className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-sm opacity-70"></span>
                  )}
                </span>
                <span className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                  {label}
                </span>
                {isActive && (
                  <span className="absolute left-0 w-1 h-4/6 bg-gradient-to-b from-primary to-primary/50 rounded-r-full"></span>
                )}
              </a>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SidebarMenuItem>
  );

  return (
    <SidebarComponent className="border-r border-white/10 bg-black/40 backdrop-blur-xl">
      <SidebarHeader className="flex items-center py-6 h-16 px-4">
        <div className="flex items-center gap-2">
      
          <div className="font-display font-semibold tracking-tight text-lg bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            FraudVisionary
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs text-white/50 font-medium px-4 mb-2">Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItem icon={LayoutDashboard} label="Dashboard" href="/" isActive={true} />
              <MenuItem icon={CreditCard} label="Transactions" href="/transactions" />
              <MenuItem icon={AlertTriangle} label="Alerts" href="/alerts" />
              <MenuItem icon={BarChart4} label="Metrics" href="/metrics" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-white/50 font-medium px-4 mb-2">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItem icon={CircleAlert} label="Rule Engine" href="/rule-engine" />
              <MenuItem icon={FileText} label="Reports" href="/reports" />
              <MenuItem icon={UsersRound} label="Entities" href="/entities" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-2 py-4 border-t border-white/10 mt-auto">
        <SidebarMenu>
          <MenuItem icon={HelpCircle} label="Help & Support" href="/help" />
          <MenuItem icon={Settings} label="Settings" href="/settings" />
          <MenuItem icon={LogOut} label="Log Out" href="/logout" />
        </SidebarMenu>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
