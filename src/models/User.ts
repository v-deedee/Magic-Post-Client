import { getToken } from "../services/token";

export interface User {
  username: string;
  role: ROLE;
}

export enum ROLE {
  BOSS = "BOSS",
  STORAGE_MANAGER = "STORAGE-MANAGER",
  POSTOFFICE_MANAGER = "POSTOFFICE-MANAGER",
  STORAGE_EMPLOYEE = "STORAGE-EMPLOYEE",
  POSTOFFICE_EMPLOYEE = "POSTOFFICE-EMPLOYEE",
  
}

export function stringToRole(roleString: string): ROLE | undefined {
  const roles = Object.values(ROLE);
  if (roles.includes(roleString as ROLE)) {
    return roleString as ROLE;
  }
  return undefined;
}

export function roleToString(role: ROLE): string {
    return role;
  }

export function createUser(username: string, role: string): User {
  const roleEnum = stringToRole(role);

  if (roleEnum !== undefined) {
    return {
      username: username,
      role: roleEnum,
    };
  } else {
    throw new Error(`Invalid role: ${role}`);
  }
}

export function getUser(): User | null {
    const token: string | null = getToken()
    if(!token) {
        //call api to get User
        //if fail return null
    }
    return null;
}


