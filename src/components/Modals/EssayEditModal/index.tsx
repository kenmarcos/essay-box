import { Button, FileInput, Label, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EssayEditFormData } from "@/types";
import { useEssay } from "@/providers/Essay";
import { CircleNotch } from "@phosphor-icons/react";
import { useState } from "react";

interface EssayEditModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  essayId: string;
  urlId: string;
}

const EssayEditModal = (props: EssayEditModalProps) => {
  const { editEssay } = useEssay();
  const [isWaitingEdit, setIsWaitingEdit] = useState(false);

  const schema = yup.object().shape({
    essayId: yup.string().default(props.essayId),
    urlId: yup.string().default(props.urlId),
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
  } = useForm<EssayEditFormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: EssayEditFormData) => {
    setIsWaitingEdit(true);
    editEssay(data).then(() => {
      setIsWaitingEdit(false);
      onClose();
    });
  };

  const onClose = () => {
    reset();
    props.setOpenModal(false);
  };

  return (
    <Modal show={props.openModal} onClose={onClose}>
      <Modal.Header>Editar Redação</Modal.Header>
      <Modal.Body>
        <form
          className="space-y-6"
          id="essay-submit-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Selecione um arquivo de imagem ou pdf contendo a nova redação que
            deseja enviar.
          </p>

          <div className="mb-2 block">
            <Label htmlFor="file" value="Arquivo" />

            <FileInput
              id="file"
              {...register("file")}
              color={errors.file?.message ? "failure" : "gray"}
              disabled={isWaitingEdit}
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
          disabled={isWaitingEdit}
        >
          Enviar
          {isWaitingEdit && (
            <CircleNotch size={20} className="animate-spin ml-2" />
          )}
        </Button>

        <Button color="gray" onClick={onClose} disabled={isWaitingEdit}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EssayEditModal;
