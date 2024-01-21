import { useState } from "react";
import { Breadcrumb, Button, Label, Select, TextInput } from "flowbite-react";
import {
  HiHome,
  HiAdjustments,
  HiCloudDownload,
  HiSearch,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function EstimatedFreight() {
  const [cost, setCost] = useState(0);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <Breadcrumb
          aria-label="Solid background breadcrumb example"
          className="container mx-auto px-5 py-3 dark:bg-gray-800"
        >
          <Breadcrumb.Item href="/" icon={HiHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Estimate Cost</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Navigation */}
      <div className="container mx-auto mt-8 flex-col px-5">
        <div className="mb-3 sm:flex">
          <Link to={"/customer/postage-tracking"} className="grow">
            <Button
              color="gray"
              className="w-full rounded-bl-none rounded-br-none sm:rounded-bl-lg sm:rounded-br-none sm:rounded-tr-none"
            >
              <div className="flex items-center">
                <HiSearch className="mr-2 mt-0.5 h-4 w-4" />
                Track shipment
              </div>
            </Button>
          </Link>
          <Link to={"#"} className="grow">
            <Button className="w-full rounded-none">
              <div className="flex items-center">
                <HiAdjustments className="mr-2 mt-0.5 h-4 w-4" />
                Estimate Cost
              </div>
            </Button>
          </Link>
          <Link to={"/customer/nearest-post-office"} className="grow">
            <Button
              color="gray"
              className="w-full rounded-tl-none rounded-tr-none sm:rounded-bl-none sm:rounded-tl-none sm:rounded-tr-lg"
            >
              <div className="flex items-center">
                <HiCloudDownload className="mr-2 mt-0.5 h-4 w-4" />
                Find Post
              </div>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-3 gap-10 rounded-lg border p-10">
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="from" value="From" />
            </div>
            <Select id="from" required>
              <option>An Giang</option>
              <option>Bà Rịa - Vũng Tàu</option>
              <option>Bắc Giang</option>
              <option>Bắc Kạn</option>
              <option>Bạc Liêu</option>
              <option>Bắc Ninh</option>
              <option>Bến Tre</option>
              <option>Bình Định</option>
              <option>Bình Dương</option>
              <option>Bình Phước</option>
              <option>Bình Thuận</option>
              <option>Cà Mau</option>
              <option>Cần Thơ</option>
              <option>Cao Bằng</option>
              <option>Đà Nẵng</option>
              <option>Đắk Lắk</option>
              <option>Đắk Nông</option>
              <option>Điện Biên</option>
              <option>Đồng Nai</option>
              <option>Đồng Tháp</option>
              <option>Gia Lai</option>
              <option>Hà Giang</option>
              <option>Hà Nam</option>
              <option>Hà Nội</option>
              <option>Hà Tĩnh</option>
              <option>Hải Dương</option>
              <option>Hải Phòng</option>
              <option>Hậu Giang</option>
              <option>Hòa Bình</option>
              <option>Hưng Yên</option>
              <option>Khánh Hòa</option>
              <option>Kiên Giang</option>
              <option>Kon Tum</option>
              <option>Lai Châu</option>
              <option>Lâm Đồng</option>
              <option>Lạng Sơn</option>
              <option>Lào Cai</option>
              <option>Long An</option>
              <option>Nam Định</option>
              <option>Nghệ An</option>
              <option>Ninh Bình</option>
              <option>Ninh Thuận</option>
              <option>Phú Thọ</option>
              <option>Phú Yên</option>
              <option>Quảng Bình</option>
              <option>Quảng Nam</option>
              <option>Quảng Ngãi</option>
              <option>Quảng Ninh</option>
              <option>Quảng Trị</option>
              <option>Sóc Trăng</option>
              <option>Sơn La</option>
              <option>Tây Ninh</option>
              <option>Thái Bình</option>
              <option>Thái Nguyên</option>
              <option>Thanh Hóa</option>
              <option>Thừa Thiên Huế</option>
              <option>Tiền Giang</option>
              <option>TP Hồ Chí Minh</option>
              <option>Trà Vinh</option>
              <option>Tuyên Quang</option>
              <option>Vĩnh Long</option>
              <option>Vĩnh Phúc</option>
              <option>Yên Bái</option>
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="to" value="To" />
            </div>
            <Select id="to" required>
              <option>An Giang</option>
              <option>Bà Rịa - Vũng Tàu</option>
              <option>Bắc Giang</option>
              <option>Bắc Kạn</option>
              <option>Bạc Liêu</option>
              <option>Bắc Ninh</option>
              <option>Bến Tre</option>
              <option>Bình Định</option>
              <option>Bình Dương</option>
              <option>Bình Phước</option>
              <option>Bình Thuận</option>
              <option>Cà Mau</option>
              <option>Cần Thơ</option>
              <option>Cao Bằng</option>
              <option>Đà Nẵng</option>
              <option>Đắk Lắk</option>
              <option>Đắk Nông</option>
              <option>Điện Biên</option>
              <option>Đồng Nai</option>
              <option>Đồng Tháp</option>
              <option>Gia Lai</option>
              <option>Hà Giang</option>
              <option>Hà Nam</option>
              <option>Hà Nội</option>
              <option>Hà Tĩnh</option>
              <option>Hải Dương</option>
              <option>Hải Phòng</option>
              <option>Hậu Giang</option>
              <option>Hòa Bình</option>
              <option>Hưng Yên</option>
              <option>Khánh Hòa</option>
              <option>Kiên Giang</option>
              <option>Kon Tum</option>
              <option>Lai Châu</option>
              <option>Lâm Đồng</option>
              <option>Lạng Sơn</option>
              <option>Lào Cai</option>
              <option>Long An</option>
              <option>Nam Định</option>
              <option>Nghệ An</option>
              <option>Ninh Bình</option>
              <option>Ninh Thuận</option>
              <option>Phú Thọ</option>
              <option>Phú Yên</option>
              <option>Quảng Bình</option>
              <option>Quảng Nam</option>
              <option>Quảng Ngãi</option>
              <option>Quảng Ninh</option>
              <option>Quảng Trị</option>
              <option>Sóc Trăng</option>
              <option>Sơn La</option>
              <option>Tây Ninh</option>
              <option>Thái Bình</option>
              <option>Thái Nguyên</option>
              <option>Thanh Hóa</option>
              <option>Thừa Thiên Huế</option>
              <option>Tiền Giang</option>
              <option>TP Hồ Chí Minh</option>
              <option>Trà Vinh</option>
              <option>Tuyên Quang</option>
              <option>Vĩnh Long</option>
              <option>Vĩnh Phúc</option>
              <option>Yên Bái</option>
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="weight"
                value="Weight (kg)"
                className="text-black"
              />
            </div>
            <TextInput id="weight" type="text" required />
          </div>
          <div className=" flex items-center">
            <Button
              className="bg-green-500"
              onClick={() => {
                setCost(Math.floor(Math.random() * 16) + 15);
              }}
            >
              Estimate
            </Button>

            {(() => {
              if (cost != 0) {
                return <p className="ml-4">{cost}.000 VND</p>;
              }
              return <></>;
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
