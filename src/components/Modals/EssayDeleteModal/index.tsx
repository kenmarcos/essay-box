import { useEssay } from "@/providers/Essay";
import { CircleNotch, WarningCircle } from "@phosphor-icons/react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface EssayDeleteModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  essayId: string;
}

const EssayDeleteModal = (props: EssayDeleteModalProps) => {
  const { deleteEssay } = useEssay();
  const [isWaitingDelete, setIsWaitingDelete] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const onClose = () => {
    props.setOpenModal(false);
  };

  const onClick = () => {
    setIsWaitingDelete(true);
    deleteEssay(props.essayId).then(() => {
      setIsWaitingDelete(false);
      onClose();

      if (location.pathname === "/dashboard/essay") {
        navigate("/dashboard");
      }
    });
  };

  return (
    <Modal show={props.openModal} size="md" onClose={onClose}>
      <Modal.Header>Deletar Redação</Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <WarningCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Tem certeza que deseja deletar essa redação?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={onClick}
              disabled={isWaitingDelete}
            >
              Sim, tenho certeza
              {isWaitingDelete && (
                <CircleNotch size={20} className="animate-spin ml-2" />
              )}
            </Button>

            <Button color="gray" onClick={onClose} disabled={isWaitingDelete}>
              Não, cancelar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EssayDeleteModal;
