import Layout from "@/components/layout";
import { strapi, PER_PAGE } from "@/config/index";
import EventList from "@/components/eventList";
import Pagination from "@/components/pagination";
const MyEvents = ({ events, total, page }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events lined up</h3>}
      {<EventList events={events} />}
      <Pagination total={total} page={+page} />
    </Layout>
  );
};

export default MyEvents;

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = (page - 1) * PER_PAGE;
  const { data: events } = await strapi.get(
    `/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const { data: total } = await strapi.get("/events/count");
  return {
    props: {
      events,
      total,
      page,
    },
  };
}
