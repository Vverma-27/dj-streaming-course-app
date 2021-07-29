import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/style/Search.module.css";
const Search = () => {
  const router = useRouter();
  const [queryTerm, setQueryTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${queryTerm}`);
    setQueryTerm("");
  };
  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setQueryTerm(e.target.value)}
        value={queryTerm}
        placeholder="Search Event"
      />
    </form>
  );
};

export default Search;
