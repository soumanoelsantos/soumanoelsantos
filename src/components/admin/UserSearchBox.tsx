
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface UserSearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const UserSearchBox: React.FC<UserSearchBoxProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-text/50" />
      <Input
        placeholder="Buscar usuário por email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-dark-background/30 border-dark-primary/20 text-dark-text"
      />
    </div>
  );
};

export default UserSearchBox;
