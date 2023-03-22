import { Essay } from "@/types";
import {
  CircleNotch,
  FolderNotchMinus,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react";
import {
  format,
  formatDistance,
  formatDistanceToNow,
  parseISO,
} from "date-fns";
import { Button, Card, Dropdown, Modal, Tooltip } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ptBR } from "date-fns/locale";
import EssayDeleteModal from "../Modals/EssayDeleteModal";

interface EssaCardProps {
  essay: Essay;
}

const EssayCard = (props: EssaCardProps) => {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <Card className="duration-300 hover:shadow-2xl">
        <div className="flex justify-end px-4">
          <Dropdown inline={true} label="">
            <Dropdown.Item
              onClick={() => setOpenDeleteModal(true)}
              className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <Trash size={20} className="mr-2" />
              Deletar
            </Dropdown.Item>
          </Dropdown>
        </div>

        <div className="flex flex-col items-center">
          <FolderNotchMinus
            size={32}
            className="mb-3 h-12 w-12 text-secondary-500"
          />
          <div className="text-center">
            <h4 className="font-bold text-secondary-500">Redação</h4>
            <span className="text-primary-500 dark:text-gray-400">
              #{props.essay.numero}
            </span>
          </div>

          <div className="mt-8">
            <small>
              <Tooltip
                content={
                  <span>
                    {format(
                      parseISO(props.essay.created_at),
                      "dd/MM/yyyy hh'h'mm"
                    )}
                  </span>
                }
              >
                <time className="text-primary-400">
                  {formatDistanceToNow(parseISO(props.essay.created_at), {
                    locale: ptBR,
                  })}
                </time>
              </Tooltip>
            </small>
          </div>

          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Button
              color="primary"
              outline
              onClick={() =>
                navigate("/dashboard/essay", {
                  state: { essayId: props.essay.id },
                })
              }
            >
              Visualizar
            </Button>
          </div>
        </div>
      </Card>

      <EssayDeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        essayId={props.essay.id}
      />
    </>
  );
};

export default EssayCard;
