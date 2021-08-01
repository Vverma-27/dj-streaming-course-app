import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import styles from "@/style/Header.module.css";
import Search from "./search";
import { AuthContext } from "@/context/AuthContext";
const Header = () => {
  const { user, logOutUser: logOut } = useContext(AuthContext);
  return (
    <section className={styles.header}>
      <section className={styles.logo}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </section>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {(user && (
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button className="btn-secondary btn-icon" onClick={logOut}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </>
          )) || (
            <li>
              <Link href="/account/login">
                <a className="btn-secondary btn-icon">
                  <FaSignInAlt />
                  Login
                </a>
              </Link>
            </li>
          )}
          {/* <li>
            <Link href="/account/register">
              <a>Register</a>
            </Link>
          </li> */}
        </ul>
      </nav>
    </section>
  );
};

export default Header;
