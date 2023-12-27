import { connect } from "react-redux";
import { Component } from "react";
import { Link, Outlet } from "react-router-dom";
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
        <Navbar fluid rounded-lg>
          <Navbar.Brand as={Link} to="/home">
            <img
              src="../../../public/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="MagicPost Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              MagicPost
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="/login" active>
              <p className="text-green-600">Login</p>
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>

        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            <img
              src="https://media.product.which.co.uk/prod/images/original/gm-35e787ad-d56d-454c-a6ae-a89925f19d30-post-office-banking-servicesnewsmain.jpeg"
              alt="..."
            />
            <img
              src="https://wallpapers.com/images/featured/post-office-g2g4895jkhi09e3r.jpg"
              alt="..."
            />
            <img src="https://wallpaper.dog/large/20390507.jpg" alt="..." />
          </Carousel>
        </div>
        <div className="flex-col mt-8 p-12">
          <Button.Group className="flex mb-3">
            <Button color="gray" className="grow">
              <Link to={"postage-tracking"} className="flex">
                <HiUserCircle className="mr-3 h-4 w-4" />
                Locate
              </Link>
            </Button>
            <Button color="gray" className="grow">
              <Link to={"estimated-freight"} className="flex">
                <HiAdjustments className="mr-3 h-4 w-4" />
                Estimate Cost
              </Link>
            </Button>
            <Button color="gray" className="grow">
              <Link to={"nearest-post-office"} className="flex">
                <HiCloudDownload className="mr-3 h-4 w-4" />
                Find Post
              </Link>
            </Button>
          </Button.Group>

          <div className="min-h-96">
            <Outlet />
          </div>
        </div>

        <Footer container>
          <div className="w-full">
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
