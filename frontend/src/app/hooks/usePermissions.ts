// hooks/usePermissions.ts
"use client";

import { useEffect, useState } from 'react';

export function usePermissions(userType: 'admin' | 'client' = 'client') {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    // Load permissions from localStorage
    const storedPermissions = localStorage.getItem(`${userType}_permissions`);
    const storedRoles = localStorage.getItem(`${userType}_roles`);

    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    }
  }, [userType]);

  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    return roles.includes(role);
  };

  const hasAnyPermission = (permissionList: string[]): boolean => {
    return permissionList.some(p => permissions.includes(p));
  };

  const hasAllPermissions = (permissionList: string[]): boolean => {
    return permissionList.every(p => permissions.includes(p));
  };

  return {
    permissions,
    roles,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
  };
}