import { connect } from "react-redux";
import { Component } from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";

export interface IEstimatedFreightProps extends IReduxState, IReduxAction {}

export interface IEstimatedFreightState {}

class EstimatedFreight extends Component<
  IEstimatedFreightProps,
  IEstimatedFreightState
> {
  state: IEstimatedFreightState = {};

  render() {
    return (
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="from" value="Gửi từ" />
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
        <div className="mb-2 block">
          <Label htmlFor="to" value="Gửi từ" />
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
        <div className="mb-2 block">
          <Label htmlFor="weight" value="Khối lượng(kg)" className="text-black"/>
        </div>
        <TextInput id = "weight" type="text" required />
        <Button>Tra cứu</Button>
      </div>
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

export default connect(mstp, mdtp)(EstimatedFreight);
