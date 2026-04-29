const { MongoClient, ObjectId } = require("mongodb");

const MONGODB_URI = "mongodb+srv://deepakr_db_user:4oYOhDfezDMn2jCN@kalpcluster.mr8bacs.mongodb.net/";

async function createFaqPage() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db("kalp_tenant_furni");
    const pages = db.collection("pages");

    const faqPage = {
      title: "FAQ",
      slug: "faq",
      isPublished: true,
      metaTitle: "Frequently Asked Questions - NestCraft",
      metaDescription: "Find answers to your questions about our premium solid wood furniture, delivery in Jaipur, and customization options.",
      content: [
        {
          id: "faq-hero",
          type: "section",
          adminTitle: "Hero",
          layout: "grid-1",
          columns: [[
            {
              type: "heading",
              level: "h1",
              text: "How can we help?"
            },
            {
              type: "paragraph",
              text: "Find answers to common questions about our craftsmanship, delivery, and services."
            }
          ]]
        },
        {
          id: "faq-list",
          type: "section",
          adminTitle: "FAQ Items",
          layout: "grid-1",
          columns: [[
            {
              type: "features",
              items: [
                { title: 'Where is your furniture store located?', description: 'Our premium furniture showroom is located in Raja Park, Jaipur. You are always welcome to visit us, check the quality of our solid wood, and try out our furniture in person before buying.' },
                { title: 'Do you deliver furniture outside Jaipur?', description: 'Yes, absolutely! While our main store is in Jaipur, we safely deliver our home furniture all across Rajasthan. Whether you live in Jodhpur, Udaipur, or any other city, we will bring your order right to your doorstep.' },
                { title: 'Can I get customized furniture for my home?', description: 'Yes, we love making custom furniture! If you have a specific design, size, or color in mind, just let us know. We will create the perfect sofa, bed, or dining table that fits your home perfectly.' },
                { title: 'What type of wood do you use for your furniture?', description: 'We mainly use high-quality solid wood, like pure Sheesham and Teak. These woods are very strong, look beautiful, and are naturally perfect for Rajasthan\'s hot and dry climate.' },
                { title: 'Is it safe to buy heavy furniture online from your website?', description: 'Yes, it is 100% safe. We use strong, multi-layer packaging to pack every item. Our trusted delivery team handles heavy solid wood furniture with great care so it reaches your home without a single scratch.' },
                { title: 'How should I clean and take care of my solid wood furniture?', description: 'It is very simple. Just wipe your furniture regularly with a soft, dry cloth. To keep the wood looking new for years, try to keep it away from direct sunlight and avoid putting hot mugs directly on the wooden surface.' }
              ]
            }
          ]]
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await pages.updateOne(
      { slug: "faq" },
      { $set: faqPage },
      { upsert: true }
    );

    console.log("Successfully created/updated FAQ page in DB.");
  } catch (error) {
    console.error("Error creating FAQ page:", error);
  } finally {
    await client.close();
  }
}

createFaqPage();
