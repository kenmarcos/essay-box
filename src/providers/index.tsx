import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { EssayProvider } from "./Essay";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <EssayProvider>{children}</EssayProvider>
    </AuthProvider>
  );
};

export default Providers;
