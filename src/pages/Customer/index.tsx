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
        <Navbar fluid rounded>
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
              Đăng nhập
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>

        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="..."
            />
          </Carousel>
        </div>
        <div className="flex border-2 border-solid border-sky-500">
          <Button.Group className="flex-col">
            <Button color="gray">
              <Link to={"postage-tracking"}>
                <HiUserCircle className="mr-3 h-4 w-4" />
                ĐỊNH VỊ BƯU GỬI
              </Link>
            </Button>
            <Button color="gray">
              <Link to={"estimated-freight"}>
                <HiAdjustments className="mr-3 h-4 w-4" />
                ƯỚC TÍNH CƯỚC PHÍ
              </Link>
            </Button>
            <Button color="gray">
              <Link to={"nearest-post-office"}>
                <HiCloudDownload className="mr-3 h-4 w-4" />
                BƯU CỤC GẦN NHẤT
              </Link>
            </Button>
          </Button.Group>

          <div>
            <Outlet />
          </div>
        </div>

        <Footer container>
          <div className="w-full">
            <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
              <div>
                <Footer.Brand
                  href="https://flowbite.com"
                  src="https://flowbite.com/docs/images/logo.svg"
                  alt="Flowbite Logo"
                  name="Flowbite"
                />
              </div>
              <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                  <Footer.Title title="about" />
                  <Footer.LinkGroup col>
                    <Footer.Link href="#">Flowbite</Footer.Link>
                    <Footer.Link href="#">Tailwind CSS</Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title title="Follow us" />
                  <Footer.LinkGroup col>
                    <Footer.Link href="#">Github</Footer.Link>
                    <Footer.Link href="#">Discord</Footer.Link>
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
