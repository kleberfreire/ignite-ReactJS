type TUser = {
  permissions: string[];
  roles: string[];
};

type TValidateUserPermissionsParams = {
  user: TUser;
  permissions?: string[];
  roles?: string[];
};

export function validateUserPermissions({
  user,
  permissions,
  roles,
}: TValidateUserPermissionsParams) {
  if (permissions?.length > 0) {
    const hasPermissions = permissions.every((permissions) => {
      return user.permissions.includes(permissions);
    });

    if (!hasPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some((role) => {
      return roles.includes(role);
    });

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}
