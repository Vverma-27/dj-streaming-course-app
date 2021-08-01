import { FaUser } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import Layout from "@/components/layout";
import style from "@/style/AuthForm.module.css";
const Login = () => {
  const { logInUser: logIn, error } = useContext(AuthContext);
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  useEffect(() => {
    toast.error(error);
  }, [error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Fill In the Required fields");
      return;
    }
    logIn({ email, password });

    //
  };
  return (
    <Layout title="Login Page">
      <section className={style.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </section>
          {/* <section>
          <label htmlFor="name">Enter Your Name</label>
          <input type="text" name="name" id="name" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </section> */}
          <section>
            <label htmlFor="password">Enter Your Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </section>
          {/* <section>
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" name="cpassword" id="cpassword" />
        </section> */}
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>
          Don't have an account? <Link href="/account/register">Register</Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
