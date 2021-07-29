import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout";
import config from "@/config/index";
import styles from "@/style/Event.module.css";
const EventDetail = ({ event }) => {
  console.log(event);
  const eventDelete = () => {
    console.log("event Deleted");
  };
  return (
    <Layout>
      <section className={styles.event}>
        <section className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt />
              Edit Event
            </a>
          </Link>
          <a className={styles.delete} onClick={() => eventDelete()}>
            <FaTimes />
            Delete Event
          </a>
        </section>
        <span>
          {new Date(event.date).toLocaleDateString("hi")} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <Image
            src={event.image.formats.medium.url}
            height={700}
            width={1000}
          />
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>
        <Link href="/">
          <a>{"<"} Go back</a>
        </Link>
      </section>
    </Layout>
  );
};

export default EventDetail;

export async function getStaticPaths() {
  const response = await config.get("/events?_sort=date:ASC");
  const paths = response.data.map((event) => {
    return { params: { slug: event.slug } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const response = await config.get(`/events/`, { params: { slug } });
  return {
    props: {
      event: response.data[0],
    },
  };
}
