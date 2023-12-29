import { connect } from "react-redux";
import { Component } from "react";
import { Form, Link, Outlet } from "react-router-dom";
import {
  Navbar,
  Carousel,
  TextInput,
  Button,
  ButtonGroup,
} from "flowbite-react";
import { HiArrowCircleRight, HiCloudDownload } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export interface ICustomerProps extends IReduxState, IReduxAction {}

export interface ICustomerState {}

class Customer extends Component<ICustomerProps, ICustomerState> {
  state: ICustomerState = {};

  render() {
    return (
      <>
        <div className="bg-gray-800 bg-[url('/hero-bg.png')] bg-cover bg-right pb-14">
          <div className="container mx-auto w-full p-6">
            <div className="flex w-full items-center justify-between">
              <a
                className="flex items-center text-2xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl"
                href="/"
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
                {">"}Track shipment:
              </h1>
              {/* <p className="slide-in-bottom-subtitle mb-8 text-center text-base leading-normal text-white md:text-left md:text-2xl">
                Track shipment
              </p> */}
            </div>

            {/* <!--Right Col--> */}
            {/* <div className="w-full overflow-y-hidden py-6 xl:w-3/5">
              <img
                className="slide-in-bottom mx-auto w-5/6 lg:mr-0"
                src="/hero-img.svg"
              />
            </div> */}

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
        <div className="container mx-auto mt-8 flex-col p-12">
          <Button.Group className="mb-3 flex">
            <Button color="gray" className="grow">
              <Link to={"postage-tracking"} className="flex items-center">
                <HiUserCircle className="mr-2 mt-0.5 h-4 w-4" />
                Locate
              </Link>
            </Button>
            <Button color="gray" className="grow">
              <Link to={"estimated-freight"} className="flex items-center">
                <HiAdjustments className="mr-2 mt-0.5 h-4 w-4" />
                Estimate Cost
              </Link>
            </Button>
            <Button color="gray" className="grow">
              <Link to={"nearest-post-office"} className="flex items-center">
                <HiCloudDownload className="mr-2 mt-0.5 h-4 w-4" />
                Find Post
              </Link>
            </Button>
          </Button.Group>

          <div className="min-h-96">
            <Outlet />
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
}

interface IReduxState {}

const mstp = (state, {}): IReduxState => {
  return {};
};

interface IReduxAction {}

const mdtp = (dispatch, {}): IReduxAction => {
  return {};
};

export default connect(mstp, mdtp)(Customer);
