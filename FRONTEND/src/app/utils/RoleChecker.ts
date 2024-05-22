export const hasPermission = (userRole: string | string[], requiredRoles: string | string[]): boolean => {
  if (!userRole || !requiredRoles) {
    return false;
  }

  const normalizedUserRole = Array.isArray(userRole) ? userRole : [userRole];
  const normalizedRequiredRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  return normalizedRequiredRoles.some((role) => normalizedUserRole.includes(role));
};

