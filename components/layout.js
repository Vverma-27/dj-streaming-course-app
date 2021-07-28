import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/style/Layout.module.css";
import Footer from "./footer";
import Showcase from "./showcase";
import Header from "./header";
const Layout = ({ title, keywords, children, description }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <section className={styles.container}>{children}</section>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "DJ Events | Find the Hottest Dj Events",
  keywords: "DJ,music,Party",
  description: "This app helps people find the hottest dj events.",
};

export default Layout;
