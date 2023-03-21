import illustration from "@/assets/img/education.svg";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@/services";
import { LoginFormData } from "@/types";
import { useAuth } from "@/providers/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required("*Campo obrigatório"),
    password: yup.string().required("*Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: LoginFormData) => {
    login(data, navigate, setIsLoading);
  };

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 mb-2 max-w-screen-lg"
          >
            <div className="mb-4 flex flex-col gap-6">
              <div>
                <Input
                  size="lg"
                  label="Email"
                  color="indigo"
                  {...register("email")}
                  error={!!errors.email?.message}
                  disabled={isLoading}
                />
                {!!errors.email?.message && (
                  <small className="text-red-500">{errors.email.message}</small>
                )}
              </div>

              <div>
                <Input
                  size="lg"
                  type="password"
                  label="Password"
                  color="indigo"
                  {...register("password")}
                  error={!!errors.password?.message}
                  disabled={isLoading}
                />
                {!!errors.password?.message && (
                  <small className="text-red-500">
                    {errors.password.message}
                  </small>
                )}
              </div>
            </div>
            <Button
              type="submit"
              color="indigo"
              className="mt-6 flex justify-center gap-4"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              Login
              {isLoading && <CircleNotch size={20} className="animate-spin" />}
            </Button>
          </form>
        </div>
      </section>
    </Card>
  );
};

export default Login;
