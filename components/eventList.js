import Link from "next/link";
import Image from "next/image";
import styles from "@/style/EventList.module.css";
const EventList = ({ events }) => {
  const renderedEvents = events.map((event) => {
    return (
      <section key={event.id} className={styles.event}>
        <section className={styles.img}>
          <Image
            src={
              (event.image && event.image.formats.thumbnail.url) ||
              "/images/event-default.png"
            }
            width={170}
            height={100}
          />
        </section>
        <section className={styles.info}>
          <span>
            {new Date(event.date).toLocaleDateString("hi")} at {event.time}
          </span>
          <h3>{event.name}</h3>
        </section>
        <section className="link">
          <Link href={`/events/${event.slug}`}>
            <a className="btn">Go To Event</a>
          </Link>
        </section>
      </section>
    );
  });
  return <section>{renderedEvents}</section>;
};

export default EventList;
