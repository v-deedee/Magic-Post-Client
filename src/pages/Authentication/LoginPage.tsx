import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { login } from "../../services/api";
import { FC } from "react";
import { ROLE, User, createUser, stringToRole } from "../../models/User";
import { setToken } from "../../services/token";

export async function action({ request, params }) {
  const formData = await request.formData();
  const loginData = Object.fromEntries(formData);
  try {
    const data = await login(loginData);
    const token = data.data.data.token.replace("Bearer ", "");
    setToken(token);
    const role = stringToRole(data.data.data.payload.role);
    switch (role) {
      case ROLE.BOSS:
        return redirect("/boss/dashboard");
      case ROLE.STORAGE_MANAGER:
        return redirect("/manager/dashboard");
      case ROLE.POSTOFFICE_MANAGER:
        return redirect("/manager/dashboard");
      case ROLE.STORAGE_EMPLOYEE:
        return redirect("/employee");
      case ROLE.POSTOFFICE_EMPLOYEE:
        return redirect("/post-office-employee");
      default:
        return "hey dev! Kiểm tra lại role";
    }
  } catch (err) {
    return "Sai tài khoản hoặc mật khẩu";
  }
}

export async function loader({ params }) {
  return "load success";
}

interface ILoginPageProps {}

export const LoginPage: FC<ILoginPageProps> = (props) => {
  const actionData: string = useActionData() as string;

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
          <TextInput
            id="password2"
            type="password"
            required
            shadow
            name="password"
          />
        </div>

        <Button type="submit">Login</Button>
      </Form>
      <p>{actionData}</p>
    </div>
  );
};
