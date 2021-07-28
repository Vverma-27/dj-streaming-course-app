import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "@/components/layout";
import styles from "@/style/Unknown.module.css";
const PageNotFound = () => {
  return (
    <Layout title="Page Not Found">
      <section className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404!
        </h1>
        <h4>Page Not Found!</h4>
        <Link href="/">Back To Civilization!</Link>
      </section>
    </Layout>
  );
};

export default PageNotFound;
