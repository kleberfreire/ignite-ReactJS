import Head from "next/head";
import { createClient, linkResolver } from "../../services/prismicio";
import * as prismicHelpers from "@prismicio/helpers";

import { RichText } from "prismic-dom";

import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAT: string;
};

interface IPostsProps {
  posts: Post[];
}

export default function Posts({ posts }: IPostsProps) {
  if (!posts) {
    return null;
  }
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <a href="#" key={post.slug}>
              <time>{post.updatedAT}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient();

  const response = await client.getAllByType("post");

  const posts = response.map((post: any) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.Title),
      excerpt:
        post.data.Content.find(
          (content: any) =>
            content.type === "paragraph" && content.text.length > 0
        )?.text ?? "",
      updatedAT: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts: posts,
    },
  };
}
