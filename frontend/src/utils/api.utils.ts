import axios from "axios";
import { USER_API, BLOG_API } from "../configs/api.config";
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

export const userDetailsFun = async (token: string) => {
  try {
    const response = await axios.get(`${USER_API}/me`, {
      headers: { Authorization: `${token}` },
    });
    console.log(response.data.name);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const allBlogsFun = async () => {
  try {
    const reponse = await axios.get(`${BLOG_API}/all`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    });
    console.log(reponse.data);
    return reponse.data;
  } catch (error) {
    return error;
  }
};
