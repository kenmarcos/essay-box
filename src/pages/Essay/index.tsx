import Loading from "@/components/Loading";
import { useEssay } from "@/providers/Essay";
import { EssayDetails } from "@/types";
import { CircleNotch } from "@phosphor-icons/react";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

const Essay = () => {
  const { getEssayDetails, essayDetails, setEssayDetails } = useEssay();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  if (!location.state) {
    return <Navigate to={"/dashboard"} />;
  }

  const { essayId } = location.state;

  useEffect(() => {
    getEssayDetails(essayId, setIsLoading);

    return () => {
      setEssayDetails({} as EssayDetails);
    };
  }, []);

  return (
    <div>
      <header className="mb-12">
        <h2 className="">
          {isLoading && (
            <span className="inline-block animate-pulse bg-gray-400 w-72 h-8 rounded-full"></span>
          )}

          {!isLoading && `Redação - #${essayDetails.numero}`}
        </h2>
      </header>

      <section className="space-y-4">
        {isLoading && <Loading />}

        {!isLoading && !!essayDetails.urls && (
          <Card className="max-w-3xl mx-auto">
            <figure>
              <img
                src={essayDetails?.urls[0]?.url}
                alt={`imagem da redação #${essayDetails.numero}`}
              />
            </figure>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Essay;
