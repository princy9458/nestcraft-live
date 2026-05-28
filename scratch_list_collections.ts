
import { connectTenantDB } from "./lib/db";

async function listCollections() {
  try {
    const db = await connectTenantDB();
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
  } catch (error) {
    console.error("Error listing collections:", error);
  } finally {
    process.exit();
  }
}

listCollections();
