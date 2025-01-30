import { Link, useNavigate } from "react-router-dom";
import LableInput from "./LabledInput";
import { useState } from "react";
import Btn from "./Btn";
import TextArea from "./TextArea";
import { SignInInput, SignUpInput } from "@shreyashchandra/medium-blog-common";
import { signupUserFun, signinUserFun } from "../utils/api.utils";

function Auth({ type }: { type: "signup" | "signin" }) {
  const [signInInput, setSignInInput] = useState<SignInInput>({
    email: "",
    password: "",
  });
  const [signUpInput, setSignUpInput] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const navigate = useNavigate();

  const submitHandlerSignup = async () => {
    try {
      const res = (await signupUserFun(signUpInput)) as {
        status: number;
        data: { jwt: string };
      };

      if (res.status === 200) {
        localStorage.setItem("token", res?.data.jwt);
        navigate("/dashboard");
      } else {
        alert("Something went wrong in signup");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in signup");
    }
  };

  const submitHandlerSignin: () => void = async () => {
    try {
      const res = (await signinUserFun(signInInput)) as {
        status: number;
        data: { jwt: string };
      };
      if (res.status === 200) {
        localStorage.setItem("token", res?.data.jwt);
        navigate("/dashboard");
      } else {
        alert("Something went wrong in signup");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in signin");
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold text-gray-700">
          {type === "signup" ? "Create an account" : "Login Into Your Account"}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {type === "signup" && (
            <>
              Already have an account?{" "}
              <Link to="/signin" className="underline font-semibold">
                Signin
              </Link>
            </>
          )}
          {type === "signin" && (
            <>
              Don't have an account?{" "}
              <Link to="/signup" className="underline font-semibold">
                Signup
              </Link>
            </>
          )}
        </p>
        {type === "signup" && (
          <>
            <div className="p-4 mt-7 flex flex-col gap-3 w-full">
              <LableInput
                label={"Full Name"}
                placeholder={"Enter Your Name"}
                onChange={(e: { target: { value: string } }) =>
                  setSignUpInput({ ...signUpInput, name: e.target.value })
                }
                value={signUpInput.name || ""}
              />

              <LableInput
                label={"Email"}
                placeholder={"Enter Your Email"}
                onChange={(e: { target: { value: string } }) =>
                  setSignUpInput({ ...signUpInput, email: e.target.value })
                }
                value={signUpInput.email}
              />

              <LableInput
                inputType="password"
                label={"Password"}
                placeholder={"Enter Your Password"}
                onChange={(e: { target: { value: string } }) =>
                  setSignUpInput({ ...signUpInput, password: e.target.value })
                }
                value={signUpInput.password}
              />

              <TextArea
                onChange={(e: { target: { value: string } }) =>
                  setSignUpInput({ ...signUpInput, bio: e.target.value })
                }
                value={signUpInput.bio || ""}
              />
              <div className="pt-4">
                <Btn btnName={type} submitHandler={submitHandlerSignup} />
              </div>
            </div>
          </>
        )}
        {type === "signin" && (
          <>
            <div className="p-4 mt-7 flex flex-col gap-3 w-full">
              <LableInput
                label={"Email"}
                placeholder={"Enter Your Email"}
                onChange={(e: { target: { value: string } }) =>
                  setSignInInput({ ...signInInput, email: e.target.value })
                }
                value={signInInput.email}
              />

              <LableInput
                inputType="password"
                label={"Password"}
                placeholder={"Enter Your Password"}
                onChange={(e: { target: { value: string } }) =>
                  setSignInInput({ ...signInInput, password: e.target.value })
                }
                value={signInInput.password}
              />
              <div className="pt-4">
                <Btn btnName={type} submitHandler={submitHandlerSignin} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
