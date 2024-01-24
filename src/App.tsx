import { Form, Link } from "react-router-dom";
import { Button } from "flowbite-react";
import homeIcon from "./assets/images/home-icon.svg";
import serviceImg from "./assets/images/service.jpg";
import shippingImg from "./assets/images/shipping.png";
import { PiMapPin, PiPhone } from "react-icons/pi";
import { HiCheckCircle } from "react-icons/hi";
import { BiEnvelope } from "react-icons/bi";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsReddit,
  BsTwitter,
} from "react-icons/bs";

export default function HomePage() {
  return (
    <>
      {/* Starting section */}
      <div className="bg-gray-800 bg-home-bg bg-cover bg-right pb-14 xl:h-screen">
        {/* Logo + Login button */}
        <div className="container mx-auto w-full p-6 px-5">
          <div className="flex w-full items-center justify-between">
            <a
              className="flex items-center text-2xl font-bold lg:text-4xl"
              href="#"
            >
              <img src="/logo.svg" alt="" className="me-3 w-14" />
              <span className="hidden self-center whitespace-nowrap text-4xl font-bold text-white sm:inline">
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

        {/* Slogan + Form */}
        <div className="container mx-auto flex flex-col flex-wrap items-center px-5 md:flex-row">
          {/* <!--Left Col--> */}
          <div className="flex w-full flex-col justify-center overflow-y-hidden lg:w-2/5 lg:items-start">
            <h1 className="slide-in-bottom-h1 my-4 text-center text-3xl font-extrabold leading-tight text-white md:text-left md:text-5xl">
              Your Lightning Fast Delivery Partner
            </h1>
            <p className="slide-in-bottom-subtitle mb-8 text-center text-base leading-normal text-white md:text-left md:text-2xl">
              Track your shipment right here!
            </p>

            <div className="w-full">
              <Form
                className="relative"
                action="/customer/postage-tracking"
                method="get"
              >
                <input
                  type="text"
                  placeholder="Shipment ID"
                  name="id"
                  required
                  className="z-0 h-14 w-full rounded-lg pl-5 pr-20 focus:shadow focus:outline-none"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-2 bg-blue-500"
                >
                  Locate
                </Button>
              </Form>
            </div>
          </div>

          {/* <!--Right Col--> */}
          <div className="w-full overflow-y-hidden py-6 text-center lg:w-3/5">
            <img
              className="slide-in-bottom mx-auto w-4/6 lg:mr-0"
              src={homeIcon}
            />
          </div>
        </div>
      </div>

      {/* Main */}
      <div>
        {/* First section - Service */}
        <section className="container mx-auto">
          <div className="max-w-screen-xl space-y-12 px-5 py-8 lg:space-y-20 lg:px-6 lg:py-24">
            <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
              <div className="text-gray-500 dark:text-gray-400 sm:text-lg">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Services
                </h2>
                <p className="mb-8 font-light lg:text-xl">
                  Our company provides fast, secure, and reliable delivery
                  services. We commit to delivering on time and ensuring the
                  best protection for your goods throughout the transportation
                  process.
                </p>
                <ul className="my-7 space-y-5 border-t border-gray-200 pt-8 dark:border-gray-700">
                  <li className="flex space-x-3">
                    <span className="flex-shrink-0 text-xl text-purple-500 dark:text-purple-400">
                      <HiCheckCircle />
                    </span>
                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                      Fast, secure, and reliable delivery services
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="flex-shrink-0 text-xl text-purple-500 dark:text-purple-400">
                      <HiCheckCircle />
                    </span>
                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                      Online shipment tracking
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="flex-shrink-0 text-xl text-purple-500 dark:text-purple-400">
                      <HiCheckCircle />
                    </span>
                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                      Knowledge management
                    </span>
                  </li>
                </ul>
              </div>
              <img
                className="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex"
                src={serviceImg}
                alt="dashboard feature image"
              />
            </div>
          </div>
        </section>

        {/* Second section */}
        <section className="lg:bg-gray-100">
          <div className="container mx-auto">
            <div className="space-y-12 px-5 py-8 lg:space-y-20 lg:px-6 lg:py-20">
              <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                <img
                  className="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex"
                  src={shippingImg}
                  alt="feature image 2"
                />
                <div className="text-gray-500 dark:text-gray-400 sm:text-lg">
                  <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    We invest in the worlds potential
                  </h2>
                  <p className="mb-8 font-light lg:text-xl">
                    With a professional, dedicated, and experienced team, we are
                    confident in being the ideal partner for all your
                    transportation needs. Whether you need to send goods
                    domestically or internationally, we can meet your
                    requirements.
                  </p>
                  <p className="font-light lg:text-xl">
                    We also offer online shipment tracking services, ensuring
                    that you always know the location of your shipped goods.
                    Trust and choose our services; we will not disappoint you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Third section - Contact */}
        <section className="mb-10">
          <div className="container mx-auto px-5 lg:py-12">
            <div className="lg:-mx-6 lg:flex lg:items-start">
              <div className="py-10 lg:mx-6 lg:w-1/2">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Contact us for more info
                </h2>

                {/* Address, Phone, Email */}
                <div className="mt-6 space-y-8 md:mt-8">
                  <p className="-mx-2 flex items-start">
                    <span className="mx-2 text-2xl text-blue-500 dark:text-blue-400">
                      <PiMapPin />
                    </span>
                    <span className="mx-2 w-72 truncate text-gray-700 dark:text-gray-400">
                      144 Xuan Thuy, Cau Giay, Hanoi, Vietnam
                    </span>
                  </p>
                  <p className="-mx-2 flex items-start">
                    <span className="mx-2 text-2xl text-blue-500 dark:text-blue-400">
                      <PiPhone />
                    </span>
                    <span className="mx-2 w-72 truncate text-gray-700 dark:text-gray-400">
                      (+84)123456789
                    </span>
                  </p>
                  <p className="-mx-2 flex items-start">
                    <span className="mx-2 text-2xl text-blue-500 dark:text-blue-400">
                      <BiEnvelope />
                    </span>
                    <span className="mx-2 w-72 truncate text-gray-700 dark:text-gray-400">
                      acb@example.com
                    </span>
                  </p>
                </div>

                {/* Social media */}
                <div className="mt-6 md:mt-8">
                  <h3 className="font-semibold text-gray-600 dark:text-gray-300">
                    Follow us
                  </h3>

                  <div className="-mx-1.5 mt-4 flex ">
                    <a
                      className="mx-3 transform text-gray-400 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                      href="#"
                    >
                      <span className="text-2xl">
                        <BsTwitter />
                      </span>
                    </a>
                    <a
                      className="mx-3 transform text-gray-400 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                      href="#"
                    >
                      <span className="text-2xl">
                        <BsFacebook />
                      </span>
                    </a>
                    <a
                      className="mx-3 transform text-gray-400 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                      href="#"
                    >
                      <span className="text-2xl">
                        <BsInstagram />
                      </span>
                    </a>
                    <a
                      className="mx-3 transform text-gray-400 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                      href="#"
                    >
                      <span className="text-2xl">
                        <BsGithub />
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:mx-6 lg:w-1/2">
                <div className="mx-auto w-full overflow-hidden rounded-lg bg-white px-8 py-10 shadow-lg  dark:bg-gray-900 lg:max-w-xl">
                  <h1 className="text-lg font-medium text-gray-700 dark:text-white">
                    What do you want to ask
                  </h1>

                  <form className="mt-6">
                    <div className="flex-1">
                      <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Nguyen Viet Anh"
                        className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                      />
                    </div>

                    <div className="mt-6 flex-1">
                      <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                        Email address
                      </label>
                      <input
                        type="email"
                        placeholder="anhn@example.com"
                        className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                      />
                    </div>

                    <div className="mt-6 w-full">
                      <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                        Message
                      </label>
                      <textarea
                        className="mt-2 block h-20 w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400 md:h-32"
                        placeholder="Message"
                      ></textarea>
                    </div>

                    <button className="mt-6 w-full transform rounded-md bg-blue-500 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      get in touch
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white dark:border-none dark:bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <a className="flex items-center font-bold lg:text-4xl" href="/">
              <img src="/logo.svg" alt="" className="me-3 w-10" />
              <span className="hidden self-center whitespace-nowrap text-2xl font-bold dark:text-white sm:inline">
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
    </>
  );
}
