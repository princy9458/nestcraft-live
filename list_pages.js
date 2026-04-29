const { MongoClient } = require("mongodb");

const MONGODB_URI = "mongodb+srv://deepakr_db_user:4oYOhDfezDMn2jCN@kalpcluster.mr8bacs.mongodb.net/";

async function listPages() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db("kalp_tenant_furni");
    const pages = await db.collection("pages").find({}).toArray();
    console.log("Pages in DB:", pages.map(p => ({ title: p.title, slug: p.slug })));
  } catch (error) {
    console.error("Error listing pages:", error);
  } finally {
    await client.close();
  }
}

listPages();
