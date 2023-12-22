import { connect } from "react-redux";
import { Component } from "react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";

export interface IEmployeeHeaderProps extends IReduxState, IReduxAction {}

export interface IEmployeeHeaderState {}

class EmployeeHeader extends Component<
  IEmployeeHeaderProps,
  IEmployeeHeaderState
> {
  state: IEmployeeHeaderState = {};

  render() {
    return (
      <div>
        <Navbar className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700" fluid rounded>
          <Navbar.Brand href="https://flowbite-react.com">
            <img
              src="/public/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              MagicPost
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        </Navbar>
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

export default connect(mstp, mdtp)(EmployeeHeader);
