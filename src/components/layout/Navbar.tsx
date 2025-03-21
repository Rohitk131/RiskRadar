
import React, { useState } from 'react';
import { Bell, Search, Settings, User, Moon, Sun, Home, Menu, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const { toast } = useToast();
  
  const handleNotification = () => {
    toast({
      title: "High Risk Transactions Detected",
      description: "3 transactions triggered multiple fraud rules in the last hour",
      variant: "destructive",
    });
  };

  return (
    <header className="border-b border-white/10 backdrop-blur-xl bg-black/20 sticky top-0 z-40 transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-foreground hover:text-primary transition-colors" />
          <div className="font-display font-semibold tracking-tight text-lg hidden md:flex items-center space-x-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg">
              <img src='/image.png' className='w-4 h-4'></img>
            </div>
            <span>RiskRadar</span>
          </div>
        </div>
        
        <div className="flex-1 mx-8 hidden lg:block max-w-md">
          <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions or IDs..."
              className="pl-10 bg-white/5 border border-white/10 focus-visible:border-primary/50 focus-visible:bg-white/10 rounded-full text-sm h-10 transition-all duration-300"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-1 md:space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-white/10 transition-all duration-200 rounded-full relative" 
                  onClick={handleNotification}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>3 new alerts</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-white/10 transition-all duration-200 rounded-full"
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-xl border-white/10 w-56">
                    <DropdownMenuLabel>Rule Engine Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      <span>Configure Detection Thresholds</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">Import Rule Set</DropdownMenuItem>
                    <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">Export Rule Set</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 rounded-full">
            <Avatar className="h-9 w-9 transition-all hover:scale-105 duration-300 cursor-pointer border-2 border-background">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="text-xs bg-black/50 text-primary-foreground backdrop-blur-sm">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
