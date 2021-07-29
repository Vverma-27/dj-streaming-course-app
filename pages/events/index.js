import Layout from "@/components/layout";
import config from "@/config/index";
import EventList from "@/components/eventList";
// import axios from "axios";
const MyEvents = ({ events }) => {
  console.log(events);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events lined up</h3>}
      {<EventList events={events} />}
    </Layout>
  );
};

export default MyEvents;

export async function getStaticProps() {
  const response = await config.get("/events?_sort=date:ASC");
  return {
    props: {
      events: response.data,
      revalidate: 1,
    },
  };
}
