import { connect } from "react-redux";
import { Component } from "react";
import { Form, Link } from "react-router-dom";
import { Navbar, Carousel, TextInput, Button } from "flowbite-react";
import { HiArrowCircleRight } from "react-icons/hi";
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

export interface IHomePageProps extends IReduxState, IReduxAction {}

export interface IHomePageState {}

class HomePage extends Component<IHomePageProps, IHomePageState> {
  state: IHomePageState = {};

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

        <div className="flex items-center justify-around" >
          <Form className="max-w-md" action="/customer/postage-tracking" method="get">
            <TextInput
              type="text"
              placeholder="Định vị bưu gửi"
              name="id"
              required
            />
            <Button type="submit">Định vị bưu gửi</Button>
          </Form>
          <div className="flex">
            <Button>Tìm bưu cục</Button>
            <Button>Ước tính phí</Button>
          </div>
        </div>

        <article className="prose lg:prose-xl">
          <h1>Dịch vụ</h1>
          <p>
            Công ty chúng tôi cung cấp dịch vụ chuyển phát nhanh, an toàn và
            đáng tin cậy. Chúng tôi cam kết giao hàng đúng hẹn và đảm bảo hàng
            hóa của bạn được bảo vệ tốt nhất trong suốt quá trình vận chuyển.
          </p>
          <p>
            Với đội ngũ nhân viên chuyên nghiệp, tận tâm và giàu kinh nghiệm,
            chúng tôi tự tin là đối tác lý tưởng cho mọi nhu cầu vận chuyển của
            bạn. Dù bạn cần gửi hàng hóa trong nước hay quốc tế, chúng tôi đều
            có thể đáp ứng.
          </p>
          <p>
            Chúng tôi cũng cung cấp dịch vụ theo dõi hàng hóa trực tuyến, giúp
            bạn luôn biết được vị trí của hàng hóa mình gửi. Hãy tin tưởng và
            lựa chọn dịch vụ của chúng tôi, chúng tôi sẽ không làm bạn thất
            vọng.
          </p>
        </article>

        <article className="prose lg:prose-xl">
          <h1>Tin tức</h1>
          <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item active title="Khuyến mãi" icon={HiUserCircle}>
              Đây là các tin liên quan tới khuyến mãi
            </Tabs.Item>
            <Tabs.Item title="Tin hoạt động" icon={MdDashboard}>
              Đây là các tin liên quan tới hoạt động
            </Tabs.Item>
            <Tabs.Item title="Thông tin hữu ích" icon={HiAdjustments}>
              Đây là các thông tin hữu ích
            </Tabs.Item>
          </Tabs>
        </article>

        <div>
          <h1>Các số liệu</h1>
          <div className="flex items-center justify-between">
            <div>
              <p>1000</p> <br />
              <p>Điểm giao dịch</p>
            </div>
            <div>
              <p>1000000</p> <br />
              <p>Đơn hàng được chuyển</p>
            </div>
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

export default connect(mstp, mdtp)(HomePage);
