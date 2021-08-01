import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/style/Form.module.css";
import Link from "next/link";
import { strapi } from "@/config/index";
import Layout from "@/components/layout";
const AddEvent = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    performers: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some((value) => value === "");
    if (hasEmptyFields) {
      toast.error("Please fill in all the fields");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await strapi.post("/events", values, headers);
      router.push(`/events/${res.data.slug}`);
    } catch (e) {
      toast.error(e);
    }
  };
  const handleInputChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title="Add DJ Event">
      <Link href="/">
        <a>{"<"} Go back</a>
      </Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.grid}>
          <section>
            <label htmlFor="name">Enter name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </section>
          <section>
            <label htmlFor="venue">Enter venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </section>
          <section>
            <label htmlFor="address">Enter address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </section>
          <section>
            <label htmlFor="time">Enter time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </section>
          <section>
            <label htmlFor="date">Enter date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </section>
          <section>
            <label htmlFor="performers">Enter performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </section>
        </section>
        <section>
          <label htmlFor="decription">Enter description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </section>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export default AddEvent;
