import Head from "next/head";
import { createClient } from "../../services/prismicio";

export default function postPage(props: any) {
  if (!post) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className="container">
        <div className="posts">
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
          </a>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient();

  const document = await client.getAllByType("post");
  console.log(document);

  return {
    props: document,
  };
}
