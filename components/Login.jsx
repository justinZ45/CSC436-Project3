"use client";

import { loginUser } from "../utils/data";
import { useReducer } from "react";
import { useRouter } from "next/navigation";
import useUserMustBeLoggedIn from "../app/hooks/useUserMustBeLoggedIn";
import useUser from "../app/hooks/useUser";

const Login = () => {
  const { user } = useUser();
  useUserMustBeLoggedIn(user, "out", "/");
  const router = useRouter();

  console.log(user);

  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "password":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.value };
      case "response":
        return { ...state, response: action.value };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    password: "",
    response: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, response, loading } = state;

  const login = async (e) => {
    dispatch({ type: "loading", value: true });
    dispatch({ type: "response", value: null });
    e.preventDefault();

    const response = await loginUser(email, password);

    dispatch({ type: "response", value: response });
    dispatch({ type: "loading", value: false });
    if (!!response?.success) {
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    }
  };
  return (
    <div className="w-[390px] lg:w-[500px] mx-auto px-[46px]">
      {response && (
        <div
          className={`${
            response.success
              ? "bg-green-200 border-2 border-green-800 text-green-800"
              : "bg-red-200 border-2 border-red-800 text-red-800"
          } py-2 px-5 my-10 text-center`}
        >
          <span className="font-bold">
            {response.success
              ? `Success ${response.message}`
              : `Failure: ${response.error.message}`}
          </span>
        </div>
      )}
      <h2 className="my-10 h1 text-4xl text-center font-extrabold">Login</h2>
      <form className={loading ? "opacity-[10%] pointer-events-none" : ""}>
        {/* ["email", "name", "slug", "password", "response", "loading"] */}
        {Object.keys(initialState)
          .filter((k) => !["response", "loading"].includes(k))
          .map((key) => {
            let type = "text";
            if (key === "password") {
              type = "password";
            } else if (key === "email") {
              type = "email";
            }

            return (
              <p key={key} className="mb-5">
                <label className="h1 capitalize w-[75px] font-bold text-xl inline-block">
                  {key}*
                </label>
                <input
                  className="bg-gray-50 border-4 border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  name={key}
                  onChange={(e) => {
                    dispatch({ type: e.target.name, value: e.target.value });
                  }}
                  value={state[key]}
                  type={type}
                />
              </p>
            );
          })}
        <div className="flex justify-center my-10">
          <button
            type="button"
            className="inline-block rounded  bg-gray-700 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={login}
          >
            Submit
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default Login;
