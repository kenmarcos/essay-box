import EssayEditForm from "@/components/Modals/EssayEditModal";
import Loading from "@/components/Loading";
import { useEssay } from "@/providers/Essay";
import { EssayDetails, Url } from "@/types";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import EssayDeleteModal from "@/components/Modals/EssayDeleteModal";

const Essay = () => {
  const { essayDetails, isLoadingEssays, getEssayDetails, setEssayDetails } =
    useEssay();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const location = useLocation();

  if (!location.state) {
    return <Navigate to={"/dashboard"} />;
  }

  const { essayId } = location.state;

  useEffect(() => {
    getEssayDetails(essayId);

    return () => {
      setEssayDetails({} as EssayDetails);
    };
  }, []);

  let essayUrl: Url = {} as Url;
  if (!!essayDetails.urls) {
    if (essayDetails.urls.length === 2) {
      console.log("oi");
      essayUrl = essayDetails.urls[1];
    } else {
      essayUrl = essayDetails.urls[0];
    }
  }

  return (
    <>
      <div>
        <header className="mb-12 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-end">
          <h2 className="">
            {isLoadingEssays && (
              <span className="inline-block animate-pulse bg-gray-400 w-72 h-8 rounded-full"></span>
            )}

            {!isLoadingEssays && `Redação - #${essayDetails.numero}`}
          </h2>

          <div className="space-x-2">
            <Button
              color="primary"
              outline
              onClick={() => setOpenEditModal(true)}
            >
              <PencilSimpleLine size={20} className="mr-2" />
              Editar
            </Button>

            <Button
              color="failure"
              outline
              onClick={() => setOpenDeleteModal(true)}
            >
              <Trash size={20} className="mr-2" />
              Deletar
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          {isLoadingEssays && <Loading />}

          {!isLoadingEssays && !!essayDetails.urls && (
            <Card className="max-w-3xl mx-auto">
              {(essayUrl.url.split(".").pop() === "jpg" ||
                essayUrl.url.split(".").pop() === "png") && (
                <figure className="flex justify-center">
                  <img
                    src={essayUrl.url}
                    alt={`imagem da redação #${essayDetails.numero}`}
                  />
                </figure>
              )}

              {essayUrl.url.split(".").pop() === "pdf" && (
                <iframe src={essayUrl.url} className="h-96 md:h-[800px]" />
              )}
            </Card>
          )}
        </section>
      </div>

      <EssayEditForm
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        essayId={essayDetails.id}
        urlId={!!essayDetails.urls && essayUrl.url}
      />

      <EssayDeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        essayId={essayDetails.id}
      />
    </>
  );
};

export default Essay;
