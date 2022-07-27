import Router from "next/router";
import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";

type TUser = {
  email: string;
  permissions: string;
  roles: string;
};

type TSignInCredentials = {
  email: string;
  password: string;
};

type TAuthContextData = {
  signIn(credentials: TSignInCredentials): Promise<void>;
  user: TUser;
  isAuthenticated: boolean;
};

type TAuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as TAuthContextData);

export function AuthContextProvider({ children }: TAuthProviderProps) {
  const [user, setUser] = useState<TUser>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: TSignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles,
      });

      Router.push("/dashboard");

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
