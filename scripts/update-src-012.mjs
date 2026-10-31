import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

if (!vectorStoreId) {
  throw new Error("OPENAI_VECTOR_STORE_ID is missing from your environment.");
}

const filename = "SRC-012.md";
const fullPath = path.resolve("sources/ato", filename);

async function main() {
  console.log(`Using existing vector store: ${vectorStoreId}`);

  // 1. List files already attached to the vector store
  const vectorFiles = await openai.vectorStores.files.list(vectorStoreId);

  // 2. Find the old SRC-012.md file
  let oldFileId = null;

  for (const vectorFile of vectorFiles.data) {
    const file = await openai.files.retrieve(vectorFile.id);

    if (file.filename === filename) {
      oldFileId = file.id;

      console.log(`Found old ${filename}: ${oldFileId}`);

     await openai.vectorStores.files.delete(
  vectorFile.id,
  {
    vector_store_id: vectorStoreId,
  }
);

      console.log(`Removed old ${filename} from vector store.`);

      break;
    }
  }

  if (!oldFileId) {
    console.log(`No existing ${filename} was found in the vector store.`);
  }

  // 3. Upload your edited SRC-012.md
  const uploadedFile = await openai.files.create({
    file: fs.createReadStream(fullPath),
    purpose: "assistants",
  });

  console.log(`Uploaded updated ${filename}`);
  console.log(`New file ID: ${uploadedFile.id}`);

  // 4. Attach the new file to the EXISTING vector store
  await openai.vectorStores.files.create(vectorStoreId, {
    file_id: uploadedFile.id,
  });

  console.log(`Added updated ${filename} to existing vector store.`);

  console.log("\nDone.");
  console.log(`Vector store unchanged: ${vectorStoreId}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});