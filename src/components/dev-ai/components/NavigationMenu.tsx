
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Home, Mail, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavigationMenu = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Menubar className="border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer hover:bg-gray-100">
          <Home className="h-4 w-4 mr-2" />
          Menu
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => handleNavigation('/')}>
            <Home className="h-4 w-4 mr-2" />
            Início
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigation('/')}>
            <Mail className="h-4 w-4 mr-2" />
            Contato
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigation('/dev-ai')}>
            <Code2 className="h-4 w-4 mr-2" />
            DevAI
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavigationMenu;
