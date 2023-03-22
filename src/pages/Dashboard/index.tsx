import EssayCard from "@/components/EssayCard";
import EssayAddModal from "@/components/Modals/EssayAddModal";
import Loading from "@/components/Loading";
import { useEssay } from "@/providers/Essay";
import { Plus } from "@phosphor-icons/react";
import { Badge, Button } from "flowbite-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { essays, isLoadingEssays, getEssays } = useEssay();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getEssays();
  }, []);

  return (
    <>
      <div>
        <header className="mb-12 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-end">
          <h2 className="">Redações</h2>

          <div>
            <Button color="primary" onClick={() => setOpenModal(true)}>
              <Plus size={14} className="mr-2" />
              Adicionar Redação
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex gap-1">
            <h4 className="">Minhas redações</h4>
            {!!essays?.length && (
              <Badge color="primary" className="">
                {essays?.length}
              </Badge>
            )}
          </div>

          {isLoadingEssays && <Loading />}

          {!isLoadingEssays && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {essays?.map((essay) => (
                <li key={essay.id}>
                  <EssayCard essay={essay} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <EssayAddModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Dashboard;
