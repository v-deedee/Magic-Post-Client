import { connect } from "react-redux";
import { Component } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

export interface IEmployeeSidebarProps extends IReduxState, IReduxAction {}

export interface IEmployeeSidebarState {}

class EmployeeSidebar extends Component<
  IEmployeeSidebarProps,
  IEmployeeSidebarState
> {
  state: IEmployeeSidebarState = {};

  render() {
    return (
      <div>
        <Sidebar className="fixed top-0 left-0 z-20 pt-16 w-64 h-full" aria-label="Default Sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
                Hàng chờ gửi
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiViewBoards}
              >
                Hàng chờ phát
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiInbox} label="3">
                Đơn hàng tới
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Xác nhận đơn hàng
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Tạo giao dịch
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiArrowSmRight}>
                Tao danh sách gửi lên
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiTable}>
                Tạo danh sách phát
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiChartPie}>
                Thống kê
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
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

export default connect(mstp, mdtp)(EmployeeSidebar);
