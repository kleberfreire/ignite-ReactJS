import * as prismic from "@prismicio/client";

export const endpoint = "https://ignewskleber.prismic.io/api/v2";
export const repositoryName = prismic.getRepositoryName(endpoint);

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc: any) {
  if (doc.type === "Post") {
    return `post/${doc.uid}`;
  }
  return "/";
}

// This factory function allows smooth preview setup
export function createClient() {
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PERMANENT_TOKEN,
  });

  return client;
}
