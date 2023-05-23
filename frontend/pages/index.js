import Head from "next/head";
import { createClient } from "next-sanity";
export default function IndexPage({ pets }) {
  return (
    <>
      <Head>
        <title>Mis mascotas | NextJS</title>
      </Head>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>Lista de mascotas</h2>
        {pets.length > 0 && (
          <ul>
            {pets.map((pet) => (
              <li key={pet._id}>{pet?.name}</li>
            ))}
          </ul>
        )}
        {!pets.length > 0 && <p>No pets to show</p>}
        {/* {pets.length > 0 && (
          <div>
            <pre>{JSON.stringify(pets, null, 2)}</pre>
          </div>
        )} */}
        {!pets.length > 0 && (
          <div>
            <p>No se agregaron datos</p>
          </div>
        )}
      </main>
    </>
  );
}

const client = createClient({
  projectId: "3qo9t5hb",
  dataset: "production",
  apiVersion: "2023-02-15",
  useCdn: false,
});

export async function getStaticProps() {
  const pets = await client.fetch(`*[_type == "pet"]`);

  return {
    props: {
      pets,
    },
    revalidate: 10,
  };
}
