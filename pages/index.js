import Link from "next/link";
import Layout from "@/components/layout";
import config from "@/config/index";
import EventList from "@/components/eventList";
const HomePage = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events lined up</h3>}
      {<EventList events={events} />}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">See All Events</a>
        </Link>
      )}
    </Layout>
  );
};

export default HomePage;

export async function getStaticProps() {
  const response = await config.get("/api/events");
  return {
    props: {
      events: response.data.slice(0, 3),
      revalidate: 1,
    },
  };
}
