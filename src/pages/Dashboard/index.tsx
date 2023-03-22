import EssayCard from "@/components/EssayCard";
import { useEssay } from "@/providers/Essay";
import { Badge } from "flowbite-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { essays, getEssays } = useEssay();

  useEffect(() => {
    getEssays();
  }, []);

  return (
    <div>
      <header className="mb-12">
        <h2 className="">Redações</h2>
      </header>

      <section className="space-y-4">
        <div className="flex gap-1">
          <h4 className="">Minhas redações</h4>
          {!!essays?.length && (
            <Badge color="indigo" className="">
              {essays?.length}
            </Badge>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {essays?.map((essay) => (
            <li key={essay.id}>
              <EssayCard essay={essay} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
