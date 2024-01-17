import { Link, Outlet } from "react-router-dom";
import { Breadcrumb, Button } from "flowbite-react";
import { HiCloudDownload, HiHome } from "react-icons/hi";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
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
    <>
      {/* Header */}
      <div className="bg-home-bg bg-gray-800 bg-cover bg-right">
        <div className="container mx-auto w-full py-3">
          <div className="flex w-full items-center justify-between">
            <a
              className="flex items-center text-2xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl"
              href="/"
            >
              <img src="/logo.svg" alt="" className="me-3 w-10" />
              <span className="self-center whitespace-nowrap text-2xl font-bold text-white">
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

      {/* Breadcrumb */}
      <div className="bg-gray-50 px-5">
        <Breadcrumb
          aria-label="Solid background breadcrumb example"
          className="container mx-auto  py-3 dark:bg-gray-800"
        >
          <Breadcrumb.Item href="/" icon={HiHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Track shipment</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Main */}
      <div className="min-h-96 container mx-auto mt-8 flex-col">
        <h1 className="my-10 text-center text-3xl font-bold leading-tight md:text-left md:text-3xl">
          Shipment detail:
        </h1>
        <div className="mb-3 flex">
          <Link to={"postage-tracking"} className="grow">
            <Button className="w-full rounded-e-none">
              <div className="flex items-center">
                <HiUserCircle className="mr-2 mt-0.5 h-4 w-4" />
                Locate
              </div>
            </Button>
          </Link>
          <Link to={"estimated-freight"} className="grow">
            <Button color="gray" className="w-full rounded-none">
              <div className="flex items-center">
                <HiAdjustments className="mr-2 mt-0.5 h-4 w-4" />
                Estimate Cost
              </div>
            </Button>
          </Link>
          <Link to={"nearest-post-office"} className="grow">
            <Button color="gray" className="w-full rounded-s-none">
              <div className="flex items-center">
                <HiCloudDownload className="mr-2 mt-0.5 h-4 w-4" />
                Find Post
              </div>
            </Button>
          </Link>
        </div>

        <div className="min-h-96">
          <Outlet />
        </div>
      </div>

      {/* <Footer> */}
      <div className="mt-10 border-t">
        <div className="container mx-auto py-10">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand
                href="https://flowbite.com"
                src="../../../public/logo.svg"
                alt="Flowbite Logo"
                name="MagicPost"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
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
            <Footer.Copyright href="#" by="Flowbite™" year={2022} />
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
    </>
  );
}
