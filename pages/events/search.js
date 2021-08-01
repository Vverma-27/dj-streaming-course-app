import { stringify } from "qs";
import { useRouter } from "next/router";
import Link from "next/Link";
import Layout from "@/components/layout";
import { strapi } from "@/config/index";
import EventList from "@/components/eventList";
const SearchPage = ({ events }) => {
  const {
    query: { term },
  } = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/">
        <a>{"<"} Go back</a>
      </Link>
      <h1>Search Results for {term}</h1>
      {events.length === 0 && <h3>No Events lined up</h3>}
      {<EventList events={events} />}
    </Layout>
  );
};

export default SearchPage;

export async function getServerSideProps({ query: { term } }) {
  const query = stringify({
    _where: {
      _or: [
        { name_contains: term },
        { venue_contains: term },
        { performers_contains: term },
        { description_contains: term },
      ],
    },
  });
  const response = await strapi.get(`/events?${query}`);
  return {
    props: {
      events: response.data,
      revalidate: 1,
    },
  };
}
