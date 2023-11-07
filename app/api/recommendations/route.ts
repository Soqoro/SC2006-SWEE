import weaviate, { WeaviateClient, ApiKey } from "weaviate-ts-client";
import { NextResponse } from "next/server";

type NearTextType = {
  concepts: [string] | [];
  certainty?: number;
  moveAwayFrom?: object;
};

/* eslint-disable */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;
    console.log("This is the query: ", query);
    const weaviateClusterUrl = process.env.WEAVIATE_CLUSTER_URL?.replace(
      "https://",
      "",
    );

    const client: WeaviateClient = weaviate.client({
      scheme: "https",
      host:
        weaviateClusterUrl ||
        "zxzyqcyksbw7ozpm5yowa.c0.us-west2.gcp.weaviate.cloud",
      apiKey: new ApiKey(
        process.env.WEAVIATE_API_KEY || "n6mdfI32xrXF3DH76i8Pwc2IajzLZop2igb6",
      ), //READONLY API Key, ensure the environment variable is an Admin key to support writing
      headers: {
        "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY!,
      },
    });

    let nearText: NearTextType = {
      concepts: [],
    };

    nearText.certainty = 0.6;

    nearText.concepts = query;

    const recData = await client.graphql
      .get()
      .withClassName("Book")
      .withFields(
        "title isbn10 isbn13 categories thumbnail description num_pages average_rating published_year authors",
      )
      .withNearText(nearText)
      .withLimit(20)
      .do();

    return NextResponse.json(recData);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
