import { Typography } from "@material-tailwind/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData } from "@/types";
import { useAuth } from "@/providers/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import { Button, Label, TextInput } from "flowbite-react";

const LoginForm = () => {
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
    <div>
      <h4 color="blue-gray" className="text-center">
        Bem-vindo(a)!
      </h4>
      <p color="gray" className="mt-1 font-normal text-center max-w-sm">
        Por favor, faça o login abaixo com suas informações para acessar a sua
        conta.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 max-w-screen-lg"
      >
        <div className="mb-4 flex flex-col">
          <div className="mb-4 block">
            <Label
              htmlFor="email"
              value="E-mail"
              color={errors.email?.message ? "failure" : "gray"}
            />

            <TextInput
              id="email"
              {...register("email")}
              placeholder="seu@email.com"
              color={errors.email?.message ? "failure" : "gray"}
              disabled={isLoading}
            />
            {!!errors.email?.message && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>

          <div className="mb-2 block">
            <Label
              htmlFor="password"
              value="Senha"
              color={errors.email?.message ? "failure" : "gray"}
            />

            <TextInput
              id="password"
              {...register("password")}
              placeholder="Digite sua senha"
              color={errors.password?.message ? "failure" : "gray"}
              disabled={isLoading}
              type="password"
            />
            {!!errors.password?.message && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>
        </div>

        <Button
          type="submit"
          color="primary"
          size="lg"
          className="w-full [&>span]:justify-center"
          disabled={isLoading}
        >
          Login
          {isLoading && <CircleNotch size={20} className="animate-spin ml-2" />}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
