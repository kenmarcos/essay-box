import { Essay } from "@/types";
import { FolderNotchMinus } from "@phosphor-icons/react";
import { format, parseISO } from "date-fns";
import { Button, Card, Dropdown } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface EssaCardProps {
  essay: Essay;
}

const EssayCard = (props: EssaCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="duration-300 hover:shadow-2xl">
      <div className="flex justify-end px-4">
        <Dropdown inline={true} label="">
          <Dropdown.Item>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Editar
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Deletar
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>

      <div className="flex flex-col items-center">
        <FolderNotchMinus size={32} className="mb-3 h-12 w-12" />
        <div className="text-center">
          <h4 className="font-medium text-black">Redação</h4>
          <span className="text-gray-500 dark:text-gray-400">
            #{props.essay.numero}
          </span>
        </div>

        <div className="mt-8">
          <small>
            <time>
              {format(parseISO(props.essay.created_at), "dd/MM/yyyy hh'h'mm")}
            </time>
          </small>
        </div>

        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Button
            color="purple"
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
  );
};

export default EssayCard;
