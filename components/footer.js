import Link from "next/link";
import styles from "@/style/Footer.module.css";
const Footer = () => {
  return (
    <section className={styles.footer}>
      <p>Copyright &copy;</p>
      <Link href="about">About us</Link>
    </section>
  );
};

export default Footer;
