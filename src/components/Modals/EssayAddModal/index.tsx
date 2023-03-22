import { Button, FileInput, Label, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EssayAddFormData } from "@/types";
import { useEssay } from "@/providers/Essay";
import { CircleNotch } from "@phosphor-icons/react";
import { useState } from "react";

interface EssayAddModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EssayAddModal = (props: EssayAddModalProps) => {
  const { addEssay } = useEssay();
  const [isWaitingAdd, setIsWaitingAdd] = useState(false);

  const schema = yup.object().shape({
    file: yup
      .mixed()
      .required("*Selecione um arquivo")
      .transform((value) => value[0]),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EssayAddFormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: EssayAddFormData) => {
    setIsWaitingAdd(true);
    addEssay(data).then(() => {
      setIsWaitingAdd(false);
      onClose();
    });
  };

  const onClose = () => {
    reset();
    props.setOpenModal(false);
  };

  return (
    <Modal show={props.openModal} onClose={onClose}>
      <Modal.Header>Adicionar Redação</Modal.Header>
      <Modal.Body>
        <form
          className="space-y-6"
          id="essay-submit-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Por favor, selecione um arquivo de imagem ou pdf contendo a redação
            que deseja enviar.
          </p>

          <div className="mb-2 block">
            <Label htmlFor="file" value="Arquivo" />

            <FileInput
              id="file"
              {...register("file")}
              color={errors.file?.message ? "failure" : "gray"}
              disabled={isWaitingAdd}
            />
            {!!errors.file?.message && (
              <small className="text-red-500">{errors.file.message}</small>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="essay-submit-form"
          color="primary"
          disabled={isWaitingAdd}
        >
          Enviar
          {isWaitingAdd && (
            <CircleNotch size={20} className="animate-spin ml-2" />
          )}
        </Button>

        <Button color="gray" onClick={onClose} disabled={isWaitingAdd}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EssayAddModal;
