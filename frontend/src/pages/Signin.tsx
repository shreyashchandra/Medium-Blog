import { Auth, Quote } from "../components";

const Signin = () => {
  return (
    <>
      <>
        <div>
          <div className="flex flex-col md:grid md:grid-cols-2  ">
            <div>
              <Auth type={"signin"} />
            </div>
            <Quote />
          </div>
        </div>
      </>
    </>
  );
};

export default Signin;
