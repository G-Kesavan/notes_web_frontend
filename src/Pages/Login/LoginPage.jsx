import Navbar from "../../Components/Navbar/Navbar";
import Password from "../../Components/Input/Password";
import { Link, useNavigate } from "react-router-dom";
import { validEmail } from "../../utils/helper";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/user/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An Unexpected error occurred. pleace try again");
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="relative z-0 flex justify-center bg-blue-50 items-center h-[90vh] w-full ">
        <div className="relative flex items-center bg-blue-100 rounded-2xl px-6 py-8 border border-blue-200/5 shadow-2xl  after:bg-conic-animated ">
          <form
            className="relative z-10 flex flex-col gap-3"
            onSubmit={handleLogin}
          >
            <h2 className="flex w-full items-center justify-center font-bold text-blue-900 text-xl">
              Login
            </h2>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="input—box text-blue-900 border-[1px] p-2 rounded-sm border-blue-900 outline-none"
            />
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-700">{error}</p>}
            <button
              type="submit"
              className="btn—primary cursor-pointer hover:shadow-md shadow-blue-700 border-[1px] rounded-sm p-1 bg-blue-300 border-blue-900"
            >
              Login
            </button>
            <p className=" text-center text-blue-950">
              Not registered yet? &nbsp;
              <Link to="/signup" className="text-blue-700">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default loginPage;
