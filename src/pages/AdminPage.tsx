
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminData } from "@/hooks/useAdmin";
import AdminHeader from "@/components/admin/AdminHeader";
import UsersManagement from "@/components/admin/UsersManagement";
import AdminInfoCard from "@/components/admin/AdminInfoCard";
import { User } from "@/types/admin";
import { AdminUser } from "@/types/adminTypes";

// Helper function to transform User to AdminUser
const transformUsersToAdminUsers = (users: User[]): AdminUser[] => {
  return users.map(user => ({
    id: user.id,
    email: user.email,
    is_new_user: user.isNewUser,
    is_admin: user.isAdmin || false,
    unlockedModules: user.unlockedModules,
  }));
};

const AdminPage = () => {
  const navigate = useNavigate();
  const { userEmail } = useAuth();
  const { 
    users, 
    modules, 
    searchTerm, 
    setSearchTerm, 
    isLoading, 
    filteredUsers, 
    toggleModuleAccess, 
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser
  } = useAdminData(userEmail);

  const handleLogout = () => {
    navigate("/membros");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800">Carregando...</div>
      </div>
    );
  }

  // Transform users to match AdminUser type
  const adminUsers = transformUsersToAdminUsers(users);
  const filteredAdminUsers = transformUsersToAdminUsers(filteredUsers);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AdminHeader userEmail={userEmail} onLogout={handleLogout} />

      <div className="container mx-auto px-4 pb-8">
        <UsersManagement 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredUsers={filteredAdminUsers}
          totalUsers={users.length}
          modules={modules}
          toggleNewUserStatus={toggleNewUserStatus}
          toggleModuleAccess={toggleModuleAccess}
          deleteUser={deleteUser}
          editUserEmail={editUserEmail}
          viewAsUser={viewAsUser}
        />

        <AdminInfoCard />
      </div>
    </div>
  );
};

export default AdminPage;
