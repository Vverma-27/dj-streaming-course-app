import Link from "next/link";
import styles from "@/style/Header.module.css";
import Search from "./search";
const Header = () => {
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
          <li>
            <Link href="/events/add">
              <a>Add Event</a>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Header;
