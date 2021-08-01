import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { authentication } from "@/config/index";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => isSignedIn(), []);

  const logInUser = async ({ email: identifier, password }) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const {
        data: { user },
      } = await authentication.post(
        "/login",
        { identifier, password },
        headers
      );
      setUser(user);
      router.push("/account/dashboard");
      // console.log(user);
    } catch ({
      response: {
        data: { error },
      },
    }) {
      setError(error);
      // console.log(error);
    }
  };
  //
  const registerUser = async (user1) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const {
        data: { user },
      } = await authentication.post("/register", user1, headers);
      setUser(user);
      router.push("/account/dashboard");
      // console.log(user);
    } catch ({
      response: {
        data: { error },
      },
    }) {
      setError(error);
      // console.log(error);
    }
  };
  const logOutUser = async () => {
    await authentication.post("/logout");
    // console.log(res.data);
    setUser(null);
    router.push("/");
  };
  const isSignedIn = async () => {
    try {
      const { data: user } = await authentication.get("/user");
      // console.log(res.data);
      setUser(user);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      // setError(message);
      // console.log(response);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, logInUser, logOutUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
