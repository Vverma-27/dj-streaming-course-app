import { FaUser } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/layout";
import { AuthContext } from "@/context/AuthContext";
import style from "@/style/AuthForm.module.css";
const Register = () => {
  const { error, registerUser: register } = useContext(AuthContext);
  const [email, setEmail] = useState(""),
    [username, setUsername] = useState(""),
    [passwordConfirm, setPasswordConfirm] = useState(""),
    [password, setPassword] = useState("");
  useEffect(() => {
    toast.error(error);
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("passwords do not match");
      return;
    } else if (!password || !username || !email) {
      toast.error("fill in all the fields");
      return;
    }
    register({ email, username, password });
  };
  return (
    <Layout title="Register Page">
      <section className={style.auth}>
        <h1>
          <FaUser /> Register
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
          <section>
            <label htmlFor="userName">Enter Your User Name</label>
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </section>
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
          <section>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
          </section>
          <input type="submit" value="Register" className="btn" />
        </form>
        <p>
          Already have an account? <Link href="/account/login">Login</Link>
        </p>
      </section>
    </Layout>
  );
};

export default Register;
