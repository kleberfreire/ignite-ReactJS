import Router from "next/router";
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/apiClient";

type TUser = {
  email: string;
  permissions: string[];
  roles: string[];
};

type TSignInCredentials = {
  email: string;
  password: string;
};

type TAuthContextData = {
  signIn: (credentials: TSignInCredentials) => Promise<void>;
  signOut: () => void;
  user: TUser;
  isAuthenticated: boolean;
  broadcastAuth: MutableRefObject<BroadcastChannel>;
};

type TAuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as TAuthContextData);

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");
  setTimeout(() => {
    Router.push("/");
  }, 1000);
}

export function AuthContextProvider({ children }: TAuthProviderProps) {
  const [user, setUser] = useState<TUser>();
  const isAuthenticated = !!user;

  const broadcastAuth = useRef<BroadcastChannel>(null);

  useEffect(() => {
    broadcastAuth.current = new BroadcastChannel("auth");

    broadcastAuth.current.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;

        default:
          break;
      }
    };
  }, [broadcastAuth]);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: TSignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error) {}
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signOut, signIn, user, broadcastAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
