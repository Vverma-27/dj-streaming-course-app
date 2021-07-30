import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout";
import config from "@/config/index";
import styles from "@/style/Form.module.css";
import Modal from "@/components/modal";
import ImageUpload from "@/components/imageUpload";

const EditPage = ({ event }) => {
  const [values, setValues] = useState({
    name: event.name,
    description: event.description,
    venue: event.venue,
    address: event.address,
    date: event.date.split("T")[0],
    time: event.time,
    performers: event.performers,
  });
  const [show, setShow] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    (event.image && event.image.formats.thumbnail.url) || null
  );
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
      const res = await config.put(`/events/${event.id}`, values, headers);
      router.push(`/events/${res.data.slug}`);
    } catch (e) {
      toast.error(e);
    }
  };
  const handleUpload = async () => {
    const { data } = await config.get(`/events/${event.id}`);
    setImagePreview(data.image.formats.thumbnail.url);
    setShow(false);
  };
  const handleInputChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title="Edit DJ Event">
      <Link href="/">
        <a>{"<"} Go back</a>
      </Link>
      <h1>Edit Event</h1>
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
        <input type="submit" value="Edit Event" className="btn" />
      </form>
      <h2>Image Preview</h2>
      {(imagePreview && (
        <Image src={imagePreview} height={100} width={170} />
      )) || (
        <section>
          <h3>No Image Uploaded</h3>
        </section>
      )}
      <section>
        <button className="btn-secondary" onClick={() => setShow(true)}>
          <FaImage /> Upload Image
        </button>
        <Modal show={show} onClose={() => setShow(false)}>
          <ImageUpload event={event} onUpload={handleUpload} />
        </Modal>
      </section>
    </Layout>
  );
};

export default EditPage;

export async function getServerSideProps({ params: { id } }) {
  const response = await config.get(`/events/${id}`);
  const event = response.data;
  return {
    props: {
      event,
    },
  };
}
