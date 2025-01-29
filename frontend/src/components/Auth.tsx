import { Link } from "react-router-dom";
import LableInput from "./LabledInput";
import { useState } from "react";
import Btn from "./Btn";
import TextArea from "./TextArea";

function Auth({ type }: { type: "signup" | "signin" }) {
  const [nameIn, setNameIn] = useState("");
  const [emailIn, setEmailIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [bio, setBio] = useState("");
  const submitHandler: () => void = () => {
    const data = {
      name: nameIn,
      email: emailIn,
      password: passwordIn,
      bio: bio,
    };
    console.log("data: -", data);
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
                  setNameIn(e.target.value)
                }
                value={nameIn}
              />

              <LableInput
                label={"Email"}
                placeholder={"Enter Your Email"}
                onChange={(e: { target: { value: string } }) =>
                  setEmailIn(e.target.value)
                }
                value={emailIn}
              />

              <LableInput
                inputType="password"
                label={"Password"}
                placeholder={"Enter Your Password"}
                onChange={(e: { target: { value: string } }) =>
                  setPasswordIn(e.target.value)
                }
                value={passwordIn}
              />

              <TextArea
                onChange={(e: { target: { value: string } }) =>
                  setBio(e.target.value)
                }
                value={bio}
              />
              <div className="pt-4">
                <Btn btnName={type} submitHandler={submitHandler} />
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
                  setEmailIn(e.target.value)
                }
                value={emailIn}
              />

              <LableInput
                inputType="password"
                label={"Password"}
                placeholder={"Enter Your Password"}
                onChange={(e: { target: { value: string } }) =>
                  setPasswordIn(e.target.value)
                }
                value={passwordIn}
              />
              <div className="pt-4">
                <Btn btnName={type} submitHandler={submitHandler} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
