import EssayCard from "@/components/EssayCard";
import { useAuth } from "@/providers/Auth";
import { api } from "@/services";
import { Essay } from "@/types";
import storage from "@/utils/storage";
import { FolderNotchMinus } from "@phosphor-icons/react";
import { Badge, Card, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [essays, setEssays] = useState<Essay[]>([]);

  const getEssays = async () => {
    try {
      const response = await api.get(`/index/aluno/${user.id}`);

      setEssays(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
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
          {!!essays.length && (
            <Badge color="indigo" className="">
              {essays.length}
            </Badge>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {essays.map((essay) => (
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
