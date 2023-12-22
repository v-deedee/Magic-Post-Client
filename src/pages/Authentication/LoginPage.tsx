import { connect } from "react-redux";
import { Component } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Form, Link } from "react-router-dom";
import { login } from "../../services/api";

export async function action({ request, params }) {
  const formData = await request.formData()
  const loginData = Object.fromEntries(formData)
  const abc = await login(loginData)
  return abc;
}

export async function loader({ params }) {
  console.log("loader!");
  return "load success";
}

export interface ILoginPageProps extends IReduxState, IReduxAction {}

export interface ILoginPageState {}

class LoginPage extends Component<ILoginPageProps, ILoginPageState> {
  state: ILoginPageState = {};

  render() {
    return (
      <div className="bg-white dark:bg-gray-800">
        <Form className="flex max-w-md flex-col gap-4" method="post">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput id="email2" type="text" required shadow name="username" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput id="password2" type="password" required shadow name="password" />
          </div>

          <Button
            type="submit"
          >
            Login
          </Button>
        </Form>
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

export default connect(mstp, mdtp)(LoginPage);
