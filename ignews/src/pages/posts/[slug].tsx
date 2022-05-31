import { GetServerSideProps } from "next";
import Head from "next/head";
import { createClient } from "../../services/prismicio";
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";

import styles from "./post.module.scss";

interface IPost {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAT: string;
  };
}

export default function Post({ post }: IPost) {
  console.log("----", post);
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAT}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  previewData,
}) => {
  //console.log("req -", req);
  // const session = await getSession({ req });

  // console.log("session -", session);
  const client = createClient({ previewData });

  const { slug } = params as any;

  const response = await client.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.Title),
    content: RichText.asHtml(response.data.Content),
    updatedAT: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
  };
};
