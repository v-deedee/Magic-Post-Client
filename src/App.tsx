// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { useState } from "react";
import "./App.css";
import logo from "/logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  username: string;
  password: string;
  role: string;
}

function App() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    nav(`/${data.role.toLowerCase()}/dashboard`);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    // <>
    //   <div>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    // </>
    <main className="flex h-screen align-middle dark:bg-zinc-700">
      <div className="m-auto w-96 border-gray-500 bg-white p-5 shadow-lg dark:border-4 dark:bg-zinc-800">
        {/* <h1 className="my-5 p-2 text-center text-4xl font-bold text-rose-500 dark:text-rose-400 sm:p-3">
          Bookstore
        </h1> */}
        <div className="my-5 flex justify-center">
          <img src={logo} className="mr-2 h-10 w-10" alt="logo" />
          <span className="self-center whitespace-nowrap text-3xl font-bold text-[#319684] dark:text-white">
            MagicPost
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-7 p-3"
        >
          <label
            htmlFor="role-input"
            className="text-sm font-bold dark:text-white"
          >
            Role
            <select
              className={`block w-full border-2 border-solid border-gray-500 p-1.5 font-normal sm:p-2 ${
                errors.role && "border-red-500 outline-0 dark:border-red-400"
              } rounded dark:bg-neutral-100 dark:text-black dark:focus:outline-none`}
              id="role-input"
              {...register("role", { required: true })}
            >
              <option value="">Select role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </label>
          <label
            htmlFor="username"
            className="text-sm font-bold dark:text-white"
          >
            Username <span className="text-red-600 dark:text-red-400">(*)</span>
            <input
              className={`block w-full rounded border-2 border-solid border-gray-500 ${
                errors.username &&
                "border-red-500 outline-0 dark:border-red-400"
              } p-2 font-normal dark:bg-neutral-100 dark:text-black dark:focus:outline-none`}
              id="username"
              placeholder="Enter your username"
              {...register("username", { required: true })}
              // autoComplete="email"
            />
            {errors.username && (
              <p className="mt-1 text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </label>
          <label
            htmlFor="current-password"
            className="text-sm font-bold dark:text-white"
          >
            Password <span className="text-red-600 dark:text-red-400">(*)</span>
            <input
              className={`block w-full border-2 border-solid border-gray-500 p-2 font-normal ${
                errors.password &&
                "border-red-500 outline-0 dark:border-red-400"
              } rounded dark:bg-neutral-100 dark:text-black dark:focus:outline-none`}
              id="current-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
              // autoComplete="current-password"
            />
            {errors.password && (
              <p className="mt-1 text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </label>

          <label
            htmlFor="pw-toggle"
            className="flex w-fit gap-1 text-sm hover:cursor-pointer dark:text-white"
          >
            <input
              className="w-3.5 hover:cursor-pointer"
              type="checkbox"
              id="pw-toggle"
              // checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show password
          </label>
          <button
            type="submit"
            className="mb-8 w-full rounded border-none bg-red-400 px-4 py-2 text-center text-sm font-bold text-white hover:text-black hover:opacity-70 disabled:opacity-40 disabled:hover:text-white"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;

const roles = ["Boss", "Manager", "Employee"];
