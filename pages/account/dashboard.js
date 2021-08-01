import { parseCookie } from "@/helpers/index";
import Layout from "@/components/layout";
import { strapi } from "@/config/index";
import EventList from "@/components/eventList";

const Dashboard = ({ events }) => {
  // console.log(events);
  return (
    <Layout title="Dashboard Page">
      <h1>Your Events</h1>
      {events.length === 0 && <h3>No Events lined up</h3>}
      {<EventList events={events} />}
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookie(req.headers.cookie);
  const { data: events } = await strapi.get("/events/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(events);
  return {
    props: {
      events,
    },
  };
};

export default Dashboard;
