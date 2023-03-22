import { api } from "@/services";
import { Essay, EssayDetails, LoginFormData } from "@/types";
import storage from "@/utils/storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { useAuth } from "../Auth";

interface EssayProviderProps {
  children: ReactNode;
}

interface EssayProviderData {
  essays: Essay[];
  essayDetails: EssayDetails;
  setEssayDetails: React.Dispatch<React.SetStateAction<EssayDetails>>;
  getEssays: () => Promise<void>;
  getEssayDetails: (
    essayId: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}

export const EssayContext = createContext<EssayProviderData>(
  {} as EssayProviderData
);

export const EssayProvider = ({ children }: EssayProviderProps) => {
  const { user } = useAuth();
  const [essays, setEssays] = useState<Essay[]>([]);
  const [essayDetails, setEssayDetails] = useState({} as EssayDetails);

  const getEssays = async () => {
    try {
      const response = await api.get(`/index/aluno/${user.id}`);

      setEssays(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEssayDetails = async (
    essayId: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsLoading(true);

    try {
      const response = await api.get(`/redacao/${essayId}`);

      setEssayDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <EssayContext.Provider
      value={{
        essays,
        essayDetails,
        setEssayDetails,
        getEssays,
        getEssayDetails,
      }}
    >
      {children}
    </EssayContext.Provider>
  );
};

export const useEssay = () => useContext(EssayContext);
