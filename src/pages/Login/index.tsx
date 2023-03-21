import illustration from "@/assets/img/education.svg";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

const Login = () => {
  return (
    <Card
      color="white"
      shadow={false}
      className="sm:flex-row overflow-hidden h-[500px]"
    >
      <figure className="hidden sm:w-1/2 bg-primary-500 sm:flex sm:flex-col sm:items-center sm:justify-center">
        <img src={illustration} alt="people studying" className="w-full" />
      </figure>

      <section className="flex flex-col items-center h-full justify-center sm:w-1/2 p-4">
        <div>
          <Typography variant="h4" color="blue-gray" className="text-center">
            Bem-vindo(a)!
          </Typography>
          <Typography
            color="gray"
            className="mt-1 font-normal text-center max-w-sm"
          >
            Por favor, faça o login abaixo com suas informações para acessar a
            sua conta.
          </Typography>
          <form className="mt-8 mb-2 max-w-screen-lg">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Email" />
              <Input size="lg" type="password" label="Password" />
            </div>
            <Button color="indigo" className="mt-6" size="lg" fullWidth>
              Login
            </Button>
          </form>
        </div>
      </section>
    </Card>
  );
};

export default Login;
