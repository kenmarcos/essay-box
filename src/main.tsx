import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import Providers from "./providers";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";

const theme: CustomFlowbiteTheme = {
  badge: {
    root: {
      color: {
        primary: "text-white bg-primary-500",
      },
    },
  },
  button: {
    base: "font-bold uppercase",
    color: {
      primary: "bg-primary-500 text-white hover:bg-primary-400",
      secondary: "bg-secondary-500 text-white hover:bg-secondary-400",
    },
    outline: {
      color: {
        primary:
          "border-2 border-primary-500 [&>span]:text-primary-500 hover:[&>span]:bg-primary-500 hover:[&>span]:text-white",
        secondary:
          "border-2 border-secondary-500 [&>span]:text-secondary-500 hover:[&>span]:bg-secondary-500 hover:[&>span]:text-white",
        failure:
          "border-2 [&>span]:text-red-800 hover:[&>span]:bg-red-800 hover:[&>span]:text-white",
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Flowbite theme={{ theme }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Flowbite>
    </Providers>
  </React.StrictMode>
);
