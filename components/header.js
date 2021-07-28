import Link from "next/link";
import styles from "@/style/Header.module.css";
const Header = () => {
  return (
    <section className={styles.header}>
      <section className={styles.logo}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </section>
      <nav>
        <ul>
          <li>
            <Link href="events">
              <a>Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Header;
