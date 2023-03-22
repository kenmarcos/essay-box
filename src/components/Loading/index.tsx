import { CircleNotch } from "@phosphor-icons/react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 text-secondary-500 space-y-5">
      <CircleNotch className="animate-spin" size={60} />
      <h4 className="animate-bounce">Carregando...</h4>
    </div>
  );
};

export default Loading;
