import { Auth, Quote } from "../components";

const Signup = () => {
  return (
    <>
      <div>
        <div className="flex flex-col md:grid md:grid-cols-2 ">
          <div>
            <Auth />
          </div>
          <Quote />
        </div>
      </div>
    </>
  );
};

export default Signup;
