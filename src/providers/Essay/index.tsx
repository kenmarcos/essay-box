import { api } from "@/services";
import {
  Essay,
  EssayDetails,
  EssayAddFormData,
  EssayEditFormData,
} from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../Auth";

interface EssayProviderProps {
  children: ReactNode;
}

interface EssayProviderData {
  essays: Essay[];
  essayDetails: EssayDetails;
  isLoadingEssays: boolean;
  setIsLoadingEssays: React.Dispatch<React.SetStateAction<boolean>>;
  setEssayDetails: React.Dispatch<React.SetStateAction<EssayDetails>>;
  getEssays: () => Promise<void>;
  getEssayDetails: (essayId: string) => Promise<void>;
  addEssay: (data: EssayAddFormData) => Promise<void>;
  editEssay: (data: EssayEditFormData) => Promise<void>;
  deleteEssay: (essayId: string) => Promise<void>;
}

export const EssayContext = createContext<EssayProviderData>(
  {} as EssayProviderData
);

export const EssayProvider = ({ children }: EssayProviderProps) => {
  const { user } = useAuth();
  const [essays, setEssays] = useState<Essay[]>([]);
  const [essayDetails, setEssayDetails] = useState({} as EssayDetails);
  const [isLoadingEssays, setIsLoadingEssays] = useState(false);

  const getEssays = async () => {
    setIsLoadingEssays(true);

    try {
      const response = await api.get(`/index/aluno/${user.id}`);

      setEssays(response.data.data);
    } catch (error) {
      console.log(error);
    }

    setIsLoadingEssays(false);
  };

  const getEssayDetails = async (essayId: string) => {
    setIsLoadingEssays(true);

    try {
      const response = await api.get(`/redacao/${essayId}`);

      setEssayDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }

    setIsLoadingEssays(false);
  };

  const addEssay = async (data: EssayAddFormData) => {
    const formData = new FormData();
    formData.append("file[]", data.file);

    try {
      await api.post("/alunos/redacao/create", formData);

      toast.success("Arquivo enviado com sucesso!");

      getEssays();
    } catch (error) {
      toast.error("Ocorreu um erro! Tente novamente.");
    }
  };

  const editEssay = async (data: EssayEditFormData) => {
    const formData = new FormData();
    formData.append("urls[]", data.urlId);
    formData.append("file[]", data.file);

    try {
      await api.post(`/redacao/${data.essayId}/update`, formData);

      toast.success("Arquivo enviado com sucesso!");

      getEssayDetails(data.essayId);
    } catch (error) {
      toast.error("Ocorreu um erro! Tente novamente.");
    }
    console.log(data.essayId);
  };

  const deleteEssay = async (essayId: string) => {
    try {
      await api.delete(`/redacao/${essayId}/delete`);

      toast.success("Arquivo deletado com sucesso!");

      getEssays();
    } catch (error) {
      toast.error("Ocorreu um erro! Tente novamente.");
    }
  };

  return (
    <EssayContext.Provider
      value={{
        essays,
        essayDetails,
        isLoadingEssays,
        setIsLoadingEssays,
        setEssayDetails,
        getEssays,
        getEssayDetails,
        addEssay,
        editEssay,
        deleteEssay,
      }}
    >
      {children}
    </EssayContext.Provider>
  );
};

export const useEssay = () => useContext(EssayContext);
