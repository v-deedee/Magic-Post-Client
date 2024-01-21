import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Form, redirect, useActionData } from "react-router-dom";
import { ROLE, stringToRole } from "../../models/User";
import { login } from "../../services/api";
import { setToken } from "../../services/token";
import logo from "/logo.svg";

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
        return redirect("/storage-employee/pts-transactions");
      case ROLE.POSTOFFICE_EMPLOYEE:
        return redirect("/post-office-employee/ctp-transactions");
      default:
        return "hey dev! Kiểm tra lại role";
    }
  } catch (err) {
    return "Wrong username or password";
  }
}

export async function loader({ params }) {
  return "load success";
}

export default function LoginPage() {
  const actionData: string = useActionData() as string;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className={`flex h-screen bg-[url('/src/assets/images/login-background.jpg')] align-middle dark:bg-zinc-700`}
    >
      <div className="m-auto w-96 rounded-lg border-gray-500 bg-white/90 p-5 shadow-lg dark:border-4 dark:bg-zinc-800">
        <a href="/" className="my-10 flex justify-center">
          <img src={logo} className="mr-2 h-10 w-10" alt="logo" />
          <span className="self-center whitespace-nowrap text-3xl font-bold text-[#319684] dark:text-white">
            MagicPost
          </span>
        </a>
        <p className="mb-3 font-bold text-red-600 dark:text-red-400">
          {actionData}
        </p>
        <Form className="flex max-w-md flex-col gap-4" method="post">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Username" />
            </div>
            <TextInput
              id="email2"
              type="text"
              required
              shadow
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Password" />
            </div>
            <TextInput
              id="password2"
              type={showPassword ? "text" : "password"}
              required
              shadow
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="showPassword"
              className="hover:cursor-pointer"
              onChange={() => setShowPassword(!showPassword)}
            />
            <Label htmlFor="showPassword" className="hover:cursor-pointer">
              Show password
            </Label>
          </div>

          <Button className="mb-10 mt-5" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </main>
  );
}
