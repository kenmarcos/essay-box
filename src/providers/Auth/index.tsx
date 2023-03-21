import { api } from "@/services";
import { LoginFormData } from "@/types";
import storage from "@/utils/storage";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderData {
  token: string;
  login: (
    data: LoginFormData,
    navigate: NavigateFunction,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState(storage.getToken() || "");

  const login = async (
    data: LoginFormData,
    navigate: NavigateFunction,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", data);

      const token = response.data.access_token;

      storage.setToken(token);
      setToken(token);

      navigate("/dashboard");

      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro! Verifique seus dados e tente novamente.");
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
