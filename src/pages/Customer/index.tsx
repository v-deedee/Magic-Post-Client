import { Link, Outlet } from "react-router-dom";
import { Button } from "flowbite-react";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
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

      {/* <Footer> */}
      <div className="mt-10 border-t">
        <div className="container mx-auto px-5 py-10">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand
                href="/"
                src="/logo.svg"
                alt="Logo"
                name="MagicPost"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:gap-6">
              <div>
                <Footer.Title title="about" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">MagicPost</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright by="DeeDee" year={2023} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon href="#" icon={BsGithub} />
              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </div>
      {/* </Footer> */}
    </div>
  );
}
