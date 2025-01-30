import { Auth, Quote } from "../components";

const Signup = () => {
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div>
            <Auth type={"signup"} />
          </div>
          <div>
            <Quote />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
