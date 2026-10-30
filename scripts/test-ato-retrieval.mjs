import OpenAI from "openai";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const VECTOR_STORE_ID = process.env.OPENAI_VECTOR_STORE_ID;

if (!VECTOR_STORE_ID) {
  throw new Error(
    "OPENAI_VECTOR_STORE_ID is missing. Add it to your .env file before running this script."
  );
}

const LOG_DIR = path.resolve("logs");
const JSONL_LOG = path.join(LOG_DIR, "claim-checker-runs.jsonl");
const TEXT_LOG = path.join(LOG_DIR, "claim-checker-runs.txt");

fs.mkdirSync(LOG_DIR, { recursive: true });

function getTimestamp() {
  return new Date().toISOString();
}

function collectFileSearchResults(response) {
  const results = [];

  for (const item of response.output ?? []) {
    if (item?.type === "file_search_call" && Array.isArray(item.results)) {
      for (const result of item.results) {
        results.push({
          file_id: result.file_id ?? null,
          filename: result.filename ?? null,
          score: result.score ?? null,
          text: result.text ?? result.content ?? null,
          attributes: result.attributes ?? null,
        });
      }
    }
  }

  return results;
}

function appendRunLog(run) {
  fs.appendFileSync(
    JSONL_LOG,
    JSON.stringify(run) + "\n",
    "utf8"
  );

  const chunksText =
    run.retrieved_chunks.length > 0
      ? run.retrieved_chunks
          .map(
            (chunk, index) =>
              [
                `Chunk ${index + 1}`,
                `File: ${chunk.filename ?? "Unknown"}`,
                `File ID: ${chunk.file_id ?? "Unknown"}`,
                `Score: ${chunk.score ?? "N/A"}`,
                `Text: ${
                  typeof chunk.text === "string"
                    ? chunk.text
                    : JSON.stringify(chunk.text)
                }`,
                `Attributes: ${
                  chunk.attributes
                    ? JSON.stringify(chunk.attributes)
                    : "N/A"
                }`,
              ].join("\n")
          )
          .join("\n\n")
      : "No retrieved chunks were returned.";

  const textEntry = [
    "=".repeat(80),
    `Timestamp: ${run.timestamp}`,
    `Claim: ${run.claim}`,
    "",
    "Retrieved chunks:",
    chunksText,
    "",
    "Generated answer:",
    run.answer,
    "",
  ].join("\n");

  fs.appendFileSync(
    TEXT_LOG,
    textEntry + "\n",
    "utf8"
  );
}

async function runClaim(claim) {
  const timestamp = getTimestamp();

  const response = await client.responses.create({
    model: "gpt-5.6",

    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You are an Australian tax Claim Checker POC.\n\n" +
              "Use only evidence retrieved from the approved File Search vector store.\n" +
              "Do not rely on unsupported tax knowledge.\n\n" +
              "Return the answer in this format:\n" +
              "Verdict: Supported | Not supported | Depends | Not covered\n" +
              "Explanation: one short sentence\n" +
              "Source: official source title\n" +
              "Section: relevant section or heading\n" +
              "URL: official source URL\n" +
              "Retrieval date: source retrieval date\n\n" +
              "If the retrieved evidence does not support an answer, return:\n" +
              "Verdict: Not covered\n" +
              "Explanation: Refer to an accountant."
          },
        ],
      },

      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: claim,
          },
        ],
      },
    ],

    tools: [
      {
        type: "file_search",
        vector_store_ids: [VECTOR_STORE_ID],
        max_num_results: 5,
      },
    ],

    include: ["file_search_call.results"],
  });

  const retrievedChunks = collectFileSearchResults(response);
  const answer = response.output_text ?? "";

  const runRecord = {
    timestamp,
    claim,
    retrieved_chunks: retrievedChunks,
    answer,
    response_id: response.id ?? null,
  };

  appendRunLog(runRecord);

  console.log("\n--- Claim Checker Result ---\n");
  console.log(answer);

  console.log("\n--- Retrieved Chunks ---\n");

  if (retrievedChunks.length === 0) {
    console.log("No retrieved chunks returned.");
  } else {
    retrievedChunks.forEach((chunk, index) => {
      console.log(
        `\n[${index + 1}] ${chunk.filename ?? "Unknown file"}`
      );

      console.log(
        `Score: ${chunk.score ?? "N/A"}`
      );

      if (chunk.text) {
        console.log(
          typeof chunk.text === "string"
            ? chunk.text
            : JSON.stringify(chunk.text, null, 2)
        );
      }
    });
  }

  console.log("\nRun saved automatically:");
  console.log(`- ${JSONL_LOG}`);
  console.log(`- ${TEXT_LOG}`);
}

const claimFromArgs =
  process.argv.slice(2).join(" ").trim();

if (claimFromArgs) {
  await runClaim(claimFromArgs);
} else {
  const rl = readline.createInterface({
    input,
    output,
  });

  const claim = (
    await rl.question("Enter tax claim: ")
  ).trim();

  rl.close();

  if (!claim) {
    console.error("No claim entered.");
    process.exit(1);
  }

  await runClaim(claim);
}