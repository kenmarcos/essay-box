import illustration from "@/assets/img/education.svg";
import LoginForm from "@/components/Forms/LoginForm";

const Login = () => {
  return (
    <div
      color="white"
      className="relative flex-col bg-clip-border rounded-xl bg-white text-gray-700 flex flex sm:flex-row overflow-hidden h-[500px]"
    >
      <figure className="hidden sm:w-1/2 bg-primary-400 sm:flex sm:flex-col sm:items-center sm:justify-center">
        <img src={illustration} alt="people studying" className="w-full" />
      </figure>

      <section className="flex flex-col items-center h-full justify-center sm:w-1/2 p-4">
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;
