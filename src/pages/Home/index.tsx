import illustration from "@/assets/img/write.svg";

const Home = () => {
  return (
    <div className="flex flex-col gap-8 sm:flex-row">
      <section className="sm:w-1/2 flex flex-col justify-center gap-10">
        <div className="space-y-4">
          <h1 className="text-primary-500">
            Bem-vindo ao{" "}
            <span className="text-secondary-500 text-6xl">Essay Box!</span>
          </h1>

          <h4 className="text-primary-400">
            Desperte o poder da escrita com a melhor plataforma de redação.
          </h4>
        </div>

        <div className="text-xl space-y-2">
          <p>
            Se está procurando aprimorar suas habilidades de escrita, você está
            no lugar certo.
          </p>

          <p>
            Nosso objetivo é ajudá-lo a alcançar seus objetivos de escrita e
            aprimorar suas habilidades para que você possa escrever com
            confiança e sucesso em todas as áreas da vida.
          </p>
        </div>
      </section>

      <section className="sm:w-1/2">
        <figure>
          <img src={illustration} alt="girl writing" />
        </figure>
      </section>
    </div>
  );
};

export default Home;
