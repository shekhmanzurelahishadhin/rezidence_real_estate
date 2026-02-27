// app/contexts/AdminAuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from '../lib/api';

interface Admin {
  id: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  phone?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

interface AdminLoginData {
  email: string;
  password: string;
}

interface AdminRegisterData {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  role?: string;
}

interface AdminAuthContextType {
  admin: Admin | null;
  roles: string[];
  permissions: string[];
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }>;
  register: (adminData: AdminRegisterData) => Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token and get admin data
      const response = await apiRequest('/admin/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }, 'admin');

      if (response.success) {
        setAdmin(response?.data?.admin || response?.data?.user || null);
        setRoles(response?.data?.roles || []);
        setPermissions(response?.data?.permissions || []);
        
        // Update cookie for middleware
        document.cookie = `admin_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      } else {
        // Token invalid/expired → clear local storage
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_data');
        localStorage.removeItem('admin_roles');
        localStorage.removeItem('admin_permissions');
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setAdmin(null);
        setRoles([]);
        setPermissions([]);
      }
    } catch (error) {
      console.error('Error checking admin auth:', error);
      // Clear everything on error
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_data');
      localStorage.removeItem('admin_roles');
      localStorage.removeItem('admin_permissions');
      document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      setAdmin(null);
      setRoles([]);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }, 'admin');

      if (response.success) {
        const { token, admin: adminData, roles: userRoles, permissions: userPermissions } = response.data;

        // Store in localStorage
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_data', JSON.stringify(adminData));
        
        if (userRoles) {
          localStorage.setItem('admin_roles', JSON.stringify(userRoles));
        }
        
        if (userPermissions) {
          localStorage.setItem('admin_permissions', JSON.stringify(userPermissions));
        }
        
        // Set cookie for middleware
        document.cookie = `admin_token=${token}; path=/; max-age=86400; SameSite=Lax`;

        // Update state
        setAdmin(adminData);
        setRoles(userRoles || []);
        setPermissions(userPermissions || []);

        return { success: true };
      } else {
        return { 
          success: false, 
          message: response.message || 'Login failed',
          errors: response.errors 
        };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return { success: false, message };
    }
  };

  const register = async (adminData: AdminRegisterData) => {
    try {
      const response = await apiRequest('/admin/register', {
        method: 'POST',
        body: JSON.stringify(adminData),
      }, 'admin');

      if (response.success) {
        const { token, admin: newAdmin, roles: userRoles, permissions: userPermissions } = response.data;

        // Store in localStorage
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_data', JSON.stringify(newAdmin));
        
        if (userRoles) {
          localStorage.setItem('admin_roles', JSON.stringify(userRoles));
        }
        
        if (userPermissions) {
          localStorage.setItem('admin_permissions', JSON.stringify(userPermissions));
        }
        
        // Set cookie for middleware
        document.cookie = `admin_token=${token}; path=/; max-age=86400; SameSite=Lax`;

        // Update state
        setAdmin(newAdmin);
        setRoles(userRoles || []);
        setPermissions(userPermissions || []);

        return { success: true };
      } else {
        return { 
          success: false, 
          message: response.message || 'Registration failed',
          errors: response.errors 
        };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        await apiRequest('/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }, 'admin');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all admin-related localStorage
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_data');
      localStorage.removeItem('admin_roles');
      localStorage.removeItem('admin_permissions');
      localStorage.removeItem('admin_remember');
      
      // Clear cookie
      document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Reset state
      setAdmin(null);
      setRoles([]);
      setPermissions([]);
    }
  };

  // --- 🔥 Helpers (Super Admin bypass like Laravel) ---
  const hasRole = (role: string) => {
    if (!roles.length) return false;
    return roles.includes(role) || roles.includes('Super Admin');
  };

  const hasPermission = (permission: string) => {
    if (roles.includes('Super Admin')) return true;
    return permissions.includes(permission);
  };

  const refreshAdmin = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await apiRequest('/admin/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }, 'admin');

      if (response.success) {
        setAdmin(response?.data?.admin || response?.data?.user || null);
        setRoles(response?.data?.roles || []);
        setPermissions(response?.data?.permissions || []);
      }
    } catch (error) {
      console.error('Failed to refresh admin:', error);
    }
  };

  const value: AdminAuthContextType = {
    admin,
    roles,
    permissions,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!admin,
    hasRole,
    hasPermission,
    refreshAdmin
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return context;
}