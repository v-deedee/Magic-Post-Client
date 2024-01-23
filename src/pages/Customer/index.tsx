import { Link, Outlet } from "react-router-dom";
import { Button } from "flowbite-react";
import { BsFacebook, BsGithub, BsReddit } from "react-icons/bs";
export default function Customer() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="bg-gray-800 bg-home-bg bg-cover bg-right">
        <div className="container mx-auto w-full px-5 py-3">
          <div className="flex w-full items-center justify-between">
            <a
              className="flex items-center text-2xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl"
              href="/"
            >
              <img src="/logo.svg" alt="" className="me-3 w-10" />
              <span className="hidden self-center whitespace-nowrap text-2xl font-bold text-white sm:inline">
                MagicPost
              </span>
            </a>

            <div className="flex w-1/2 content-center justify-end">
              <Link to="/login">
                <Button color="blue">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <a className="flex items-center font-bold lg:text-4xl" href="/">
              <img src="/logo.svg" alt="" className="me-3 w-10" />
              <span className="self-center whitespace-nowrap text-2xl font-bold">
                MagicPost
              </span>
            </a>

            <div className="-mx-4 mt-6 flex flex-wrap justify-center">
              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                {" "}
                Home{" "}
              </a>

              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                {" "}
                About{" "}
              </a>

              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                {" "}
                Teams{" "}
              </a>

              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                {" "}
                Privacy{" "}
              </a>

              <a
                href="#"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                {" "}
                Cookies{" "}
              </a>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700 md:my-10" />

          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              © 2023 DeeDee
            </p>

            <div className="-mx-2 flex pt-5 sm:pt-2">
              <a
                href="#"
                className="mx-2 text-xl text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                <BsReddit />
              </a>

              <a
                href="#"
                className="mx-2 text-xl text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Facebook"
              >
                <BsFacebook />
              </a>

              <a
                href="#"
                className="mx-2 text-xl text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Github"
              >
                <BsGithub />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
