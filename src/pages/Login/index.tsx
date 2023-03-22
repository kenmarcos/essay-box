import illustration from "@/assets/img/education.svg";
import LoginForm from "@/components/Forms/LoginForm";
import { Card } from "@material-tailwind/react";

const Login = () => {
  return (
    <Card
      color="white"
      shadow={false}
      className="sm:flex-row overflow-hidden h-[500px]"
    >
      <figure className="hidden sm:w-1/2 bg-primary-400 sm:flex sm:flex-col sm:items-center sm:justify-center">
        <img src={illustration} alt="people studying" className="w-full" />
      </figure>

      <section className="flex flex-col items-center h-full justify-center sm:w-1/2 p-4">
        <LoginForm />
      </section>
    </Card>
  );
};

export default Login;
