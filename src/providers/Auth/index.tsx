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
  user: { id: string; token: string };
  login: (
    data: LoginFormData,
    navigate: NavigateFunction,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(storage.getUser() || "");

  const login = async (
    data: LoginFormData,
    navigate: NavigateFunction,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", data);

      const user = {
        id: response.data.aluno_id,
        token: response.data.access_token,
      };

      setUser(user);
      storage.setUser(user);

      navigate("/dashboard");

      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro! Verifique seus dados e tente novamente.");
      console.log(error);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    storage.clearUser();
    setUser({ id: "", token: "" });
    toast.success("Até breve!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
