import axios from "axios";
import { USER_API } from "../configs/api.config";
import { SignInInput, SignUpInput } from "@shreyashchandra/medium-blog-common";

export const signupUserFun = async (data: SignUpInput) => {
  try {
    const { name, email, password, bio } = data;
    const newObj = {
      name: name?.trim(),
      email: email?.trim(),
      password: password?.trim(),
      bio: bio?.trim(),
    };
    const response = await axios.post(`${USER_API}/signup`, newObj);

    return response;
  } catch (error) {
    return error;
  }
};

export const signinUserFun = async (data: SignInInput) => {
  try {
    const { email, password } = data;
    const newObj = {
      email: email?.trim(),
      password: password?.trim(),
    };
    const response = await axios.post(`${USER_API}/signin`, newObj);

    return response;
  } catch (error) {
    return error;
  }
};
