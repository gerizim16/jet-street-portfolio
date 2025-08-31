import { createClient } from "next-sanity";
import { QueryParams } from "sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export async function sanityFetch<const QueryString extends string>({
  params = {},
  query,
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  params?: QueryParams;
  query: QueryString;
  revalidate?: false | number;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    cache: "force-cache", // on next v14 it's force-cache by default, in v15 it has to be set explicitly
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}