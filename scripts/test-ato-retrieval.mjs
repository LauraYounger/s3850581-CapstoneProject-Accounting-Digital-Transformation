import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

if (!vectorStoreId) {
  throw new Error("OPENAI_VECTOR_STORE_ID is missing.");
}
const claim =
"I can claim up to $300 in work-related expenses without spending any money."; //Claim to test

const response = await openai.responses.create({
  model: "gpt-5.6",
  input: `
You are testing a tax claim checker prototype.

Use only the official ATO source material retrieved from the attached knowledge base.

Claim:
"${claim}"

Return:
Verdict: Supported | Not supported | Depends | Not covered
Explanation: one short sentence
Source: source title
Section: source section
URL: official source URL
Retrieval date: retrieval date from the source

If the retrieved source does not support an answer, return:

Verdict: Not covered
Explanation: Refer to an accountant.
`,
  tools: [
    {
      type: "file_search",
      vector_store_ids: [vectorStoreId],
      max_num_results: 5,
    },
  ],
  include: ["file_search_call.results"],
});

console.log("\nANSWER:\n");
console.log(response.output_text);

console.log("\nRETRIEVAL DETAILS:\n");
console.dir(response.output, {
  depth: null,
});