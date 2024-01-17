import { Form, Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Footer } from "flowbite-react";
import { Card } from "flowbite-react";
import homeIcon from "./assets/images/home-icon.svg";
import serviceImg from "./assets/images/service.jpg";

import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export default function HomePage() {
  return (
    <>
      <div
        className={`bg-home-bg h-screen bg-gray-800 bg-cover bg-right pb-14`}
      >
        <div className="container mx-auto w-full p-6">
          <div className="flex w-full items-center justify-between">
            <a
              className="flex items-center text-2xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl"
              href="#"
            >
              <img src="/logo.svg" alt="" className="me-3 w-14" />
              <span className="self-center whitespace-nowrap text-4xl font-bold text-white">
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

        {/* <!--Main--> */}
        <div className="container mx-auto flex flex-col flex-wrap items-center px-6 md:flex-row">
          {/* <!--Left Col--> */}
          <div className="flex w-full flex-col justify-center overflow-y-hidden lg:items-start xl:w-2/5">
            <h1 className="slide-in-bottom-h1 my-4 text-center text-3xl font-bold leading-tight text-white md:text-left md:text-5xl">
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

            {/* <div className="flex">
                <Button className="mx-2 bg-green-500">
                  <Link to="/customer/nearest-post-office">Find Post</Link>
                </Button>
                <Button className="bg-green-500">
                  <Link to="/customer/estimated-freight">Estimate Cost</Link>
                </Button>
              </div> */}
          </div>

          {/* <!--Right Col--> */}
          <div className="w-full overflow-y-hidden py-6 xl:w-3/5">
            <img
              className="slide-in-bottom mx-auto w-5/6 lg:mr-0"
              src={homeIcon}
            />
          </div>

          {/* <!--Footer--> */}
          {/* <div className="fade-in w-full pb-6 pt-16 text-center text-sm md:text-left">
              <a
                className="text-gray-500 no-underline hover:no-underline"
                href="#"
              >
                &copy; App 2019
              </a>
            </div> */}
        </div>
      </div>

      <div className="container mx-auto mt-10">
        <div className="flex">
          <article className="prose lg:prose-xl">
            <h1>Services</h1>
            <p>
              Our company provides fast, secure, and reliable delivery services.
              We commit to delivering on time and ensuring the best protection
              for your goods throughout the transportation process.
            </p>
            <p>
              With a professional, dedicated, and experienced team, we are
              confident in being the ideal partner for all your transportation
              needs. Whether you need to send goods domestically or
              internationally, we can meet your requirements.
            </p>
            <p>
              We also offer online shipment tracking services, ensuring that you
              always know the location of your shipped goods. Trust and choose
              our services; we will not disappoint you.
            </p>
          </article>
          <img src={serviceImg} alt="" className="w-1/2" />
        </div>

        <article className="prose my-10 mt-20 lg:prose-xl">
          <h1>News</h1>
        </article>
        <Tabs
          aria-label="Default tabs"
          style="default"
          className="text-lg font-semibold"
        >
          <Tabs.Item active title="Promotions" icon={HiUserCircle}>
            These are the promotions-related news
          </Tabs.Item>
          <Tabs.Item title="Activity News" icon={MdDashboard}>
            These are the activity-related news
          </Tabs.Item>
          <Tabs.Item title="Useful Information" icon={HiAdjustments}>
            This is useful information
          </Tabs.Item>
        </Tabs>

        {/* <h1>Các số liệu</h1> */}
        <div className="item flex justify-center">
          <div className="flex w-1/3 items-center justify-between">
            <Card className="max-w-lg">
              <div className="flex flex-col items-center pb-10">
                <img
                  alt="Sample Image"
                  height="196"
                  src="https://static.vecteezy.com/system/resources/previews/029/924/625/non_2x/building-of-post-office-illustration-vector.jpg"
                  width="96"
                  className="mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  Transaction Point
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  128
                </span>
              </div>
            </Card>
            <Card className="max-w-lg">
              <div className="flex flex-col items-center pb-10">
                <img
                  alt="Sample Image"
                  height="196px"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/express-delivery-2706453-2258946.png?f=webp"
                  width="96px"
                  className="mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  Orders shipped
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  1844
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer>
        <div className="container mx-auto mt-10 h-96 border-t pt-10">
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
      </Footer>
    </>
  );
}
