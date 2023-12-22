import { connect } from "react-redux";
import { Component } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import EmployeeHeader from "./EmployeeHeader";
import EmployeeSidebar from "./EmployeeSidebar";
import { Outlet } from "react-router-dom";

export interface IEmployeePageProps extends IReduxState, IReduxAction {}

export interface IEmployeePageState {}

class EmployeePage extends Component<IEmployeePageProps, IEmployeePageState> {
  state: IEmployeePageState = {};

  render() {
    return (
      <>
        <EmployeeHeader />
        <div className="flex overflow-hidden bg-gray-50 pt-16 dark:bg-gray-900">
          <EmployeeSidebar />
          <div className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-72">
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </>
    );
  }
}

interface IReduxState {}

const mstp = (state: RootState, {}): IReduxState => {
  return {};
};

interface IReduxAction {}

const mdtp = (dispatch: Dispatch, {}): IReduxAction => {
  return {};
};

export default connect(mstp, mdtp)(EmployeePage);
