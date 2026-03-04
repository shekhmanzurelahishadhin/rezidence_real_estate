// app/contexts/ClientAuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from '../lib/api';

interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

interface Role {
  id: number;
  name: string;
  guard_name: string;
  permissions?: Permission[];
}

interface Permission {
  id: number;
  name: string;
  guard_name: string;
}

interface ClientLoginData {
  email: string;
  password: string;
  remember?: boolean;
}

interface ClientRegisterData {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
}

interface ClientAuthContextType {
  client: Client | null;
  roles: string[];
  permissions: string[];
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }>;
  register: (clientData: ClientRegisterData) => Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  refreshClient: () => Promise<void>;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<Client | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkClientAuth();
  }, []);

  const checkClientAuth = async () => {
    try {
      const token = localStorage.getItem('user_token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token and get client data
      const response = await apiRequest('/client/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }, 'client');

      if (response.success) {
        const clientData = response?.data?.client || response?.data?.user || null;
        const rolesData = response?.data?.roles || [];
        const permissionsData = response?.data?.permissions || [];
        
        setClient(clientData);
        setRoles(rolesData);
        setPermissions(permissionsData);
        
        // Also store in localStorage for persistence
        localStorage.setItem('user_data', JSON.stringify(clientData));
        localStorage.setItem('user_roles', JSON.stringify(rolesData));
        localStorage.setItem('user_permissions', JSON.stringify(permissionsData));
        
        // Update cookie for middleware
        document.cookie = `user_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      } else {
        // Token invalid/expired → clear all storage
        clearAuthData();
      }
    } catch (error) {
      console.error('Error checking client auth:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_roles');
    localStorage.removeItem('user_permissions');
    localStorage.removeItem('user_remember');
    document.cookie = 'user_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setClient(null);
    setRoles([]);
    setPermissions([]);
  };

  const login = async (email: string, password: string, remember: boolean = false) => {
    try {
      const response = await apiRequest('/client/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, remember }),
      }, 'client');

      if (response.success) {
        const { token, client: clientData } = response.data;
        
        // Extract roles and permissions from the response
        // Based on your data structure, roles and permissions are nested
        const userRoles = clientData?.roles?.map((role: any) => role.name) || [];
        
        // Flatten permissions from all roles
        const userPermissions: string[] = [];
        clientData?.roles?.forEach((role: any) => {
          if (role.permissions) {
            role.permissions.forEach((permission: any) => {
              if (!userPermissions.includes(permission.name)) {
                userPermissions.push(permission.name);
              }
            });
          }
        });

        // Store in localStorage
        localStorage.setItem('user_token', token);
        localStorage.setItem('user_data', JSON.stringify(clientData));
        localStorage.setItem('user_roles', JSON.stringify(userRoles));
        localStorage.setItem('user_permissions', JSON.stringify(userPermissions));
        
        if (remember) {
          localStorage.setItem('user_remember', 'true');
        }

        // Set cookie for middleware
        document.cookie = `user_token=${token}; path=/; max-age=86400; SameSite=Lax`;

        // Update state
        setClient(clientData);
        setRoles(userRoles);
        setPermissions(userPermissions);

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

  const register = async (clientData: ClientRegisterData) => {
    try {
      const response = await apiRequest('/client/register', {
        method: 'POST',
        body: JSON.stringify(clientData),
      }, 'client');

      if (response.success) {
        const { token, client: newClient } = response.data;

        // Extract roles and permissions
        const userRoles = newClient?.roles?.map((role: any) => role.name) || [];
        
        const userPermissions: string[] = [];
        newClient?.roles?.forEach((role: any) => {
          if (role.permissions) {
            role.permissions.forEach((permission: any) => {
              if (!userPermissions.includes(permission.name)) {
                userPermissions.push(permission.name);
              }
            });
          }
        });

        // Store in localStorage
        localStorage.setItem('user_token', token);
        localStorage.setItem('user_data', JSON.stringify(newClient));
        localStorage.setItem('user_roles', JSON.stringify(userRoles));
        localStorage.setItem('user_permissions', JSON.stringify(userPermissions));

        // Set cookie for middleware
        document.cookie = `user_token=${token}; path=/; max-age=86400; SameSite=Lax`;

        // Update state
        setClient(newClient);
        setRoles(userRoles);
        setPermissions(userPermissions);

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
      const token = localStorage.getItem('user_token');
      if (token) {
        await apiRequest('/client/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }, 'client');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
    }
  };

  // Helper functions for role/permission checking
  const hasRole = (role: string) => {
    return roles.includes(role);
  };

  const hasPermission = (permission: string) => {
    return permissions.includes(permission);
  };

  const refreshClient = async () => {
    try {
      const token = localStorage.getItem('user_token');
      if (!token) return;

      const response = await apiRequest('/client/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }, 'client');

      if (response.success) {
        const clientData = response?.data?.client || response?.data?.user || null;
        const rolesData = response?.data?.roles || [];
        const permissionsData = response?.data?.permissions || [];
        
        setClient(clientData);
        setRoles(rolesData);
        setPermissions(permissionsData);
        
        // Update localStorage
        localStorage.setItem('user_data', JSON.stringify(clientData));
        localStorage.setItem('user_roles', JSON.stringify(rolesData));
        localStorage.setItem('user_permissions', JSON.stringify(permissionsData));
      }
    } catch (error) {
      console.error('Failed to refresh client:', error);
    }
  };

  const value: ClientAuthContextType = {
    client,
    roles,
    permissions,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!client,
    hasRole,
    hasPermission,
    refreshClient
  };

  return <ClientAuthContext.Provider value={value}>{children}</ClientAuthContext.Provider>;
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext);
  if (!context) throw new Error('useClientAuth must be used within a ClientAuthProvider');
  return context;
}