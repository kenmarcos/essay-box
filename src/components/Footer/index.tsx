import { DesktopTower, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { Tooltip } from "flowbite-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-16 px-4 bg-primary-400">
      <div className="max-w-6xl mx-auto flex items-center gap-2 h-full text-secondary-400">
        <p className="max-w-md mx-auto text-center ">
          {currentYear} — Desenvolvido por Marcos Kenji Kuribayashi 😉
        </p>

        <ul className="max-w-sm mx-auto grid grid-cols-3 space-x-4 justify-items-center">
          <li>
            <Tooltip content="Portfólio">
              <a
                href="https://marcos-kuribayashi.vercel.app"
                target="_blank"
                rel="noreferrer noopener"
              >
                <DesktopTower size={32} />
              </a>
            </Tooltip>
          </li>

          <li>
            <Tooltip content="LinkedIn">
              <a
                href="https://linkedin.com/in/marcos-kuribayashi"
                target="_blank"
                rel="noreferrer noopener"
              >
                <LinkedinLogo size={32} />
              </a>
            </Tooltip>
          </li>

          <li>
            <Tooltip content="Github">
              <a
                href="https://github.com/kenmarcos"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubLogo size={32} />
              </a>
            </Tooltip>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
