import { useAuth } from "@/providers/Auth";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.png";

const navigations = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-screen h-16 shadow-lg fixed bg-primary-500 px-4 z-50">
      <div className="max-w-6xl mx-auto flex h-full justify-between">
        <figure className="w-28 flex items-center">
          <Link to="/">
            <img className="max-w-full" src={logo} alt="logo" />
          </Link>
        </figure>

        <nav>
          <ul className="flex h-full items-center gap-4">
            {navigations.map((navItem) => (
              <li key={navItem.label}>
                <Link to={navItem.path} className="text-white font-bold">
                  {navItem.label}
                </Link>
              </li>
            ))}
            <li>
              {!user?.token ? (
                <Button
                  color="deep-orange"
                  size="lg"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              ) : (
                <Button
                  color="deep-orange"
                  variant="outlined"
                  size="lg"
                  onClick={logout}
                >
                  Logout
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
