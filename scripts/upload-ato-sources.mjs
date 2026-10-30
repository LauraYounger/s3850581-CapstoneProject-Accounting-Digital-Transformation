import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sourceFolder = path.resolve("sources/ato");

async function main() {
  const vectorStore = await openai.vectorStores.create({
    name: "ATO Claim Checker Sources",
  });

  console.log("Vector store created:");
  console.log(vectorStore.id);

  const files = fs
    .readdirSync(sourceFolder)
    .filter((file) => file.endsWith(".md"))
    .sort();

  console.log(`Found ${files.length} source files.`);

  for (const filename of files) {
    const fullPath = path.join(sourceFolder, filename);

    const uploadedFile = await openai.files.create({
      file: fs.createReadStream(fullPath),
      purpose: "assistants",
    });

    await openai.vectorStores.files.create(vectorStore.id, {
      file_id: uploadedFile.id,
    });

    console.log(`Uploaded: ${filename}`);
  }

  console.log("\nDone.");
  console.log(`OPENAI_VECTOR_STORE_ID=${vectorStore.id}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});