const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const { query } = require("express");
require("dotenv").config();

// middleware.config
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8itgidz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const galleriesCategory = client
      .db("alumni-management-app")
      .collection("alumniGalleryCategories");

    const AllGalleryPhotos = client
      .db("alumni-management-app")
      .collection("allAlumniGalleryData");

    const AllEventsData = client.db("alumni-management-app").collection("AllEvents");
    const eventsCategory = client
      .db("alumni-management-app")
      .collection("allEventCategories");

    const AllAlumniData = client.db("alumni-management-app").collection("AllAlumniData");
    const AllUniversityName = client
      .db("alumni-management-app")
      .collection("AllUniversityName");
    const AllBatchesName = client
      .db("alumni-management-app")
      .collection("allBatchesName");

    const alumniNewsCollection = client
      .db("alumni-management-app")
      .collection("alumniNews");
    const alumniNewsCategories = client
      .db("alumni-management-app")
      .collection("alumniNewsCategories");

    const eventsCollection = client
      .db("alumni-management-app")
      .collection("alumniEvents");

    // news post
    app.post("/news", async (req, res) => {
      const news = req.body;
      console.log(news);
      const cursor = await alumniNewsCollection.insertOne(news);
      res.send(cursor);
    });
    // all news data
    app.get("/news", async (req, res) => {
      const query = {};
      const newsResult = await alumniNewsCollection.find(query).toArray();
      res.send(newsResult);
    });

    // all news Category data
    app.get("/alumniNewsCategories", async (req, res) => {
      const query = {};
      const cursor = alumniNewsCategories.find(query);
      const galleries = await cursor.toArray();
      res.send(galleries);
    });

    //single news get
    app.get("/news/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const singleNewsResult = await alumniNewsCollection.findOne(query);
      res.send(singleNewsResult);
    });

    // events post
    app.post("/alumniEvents", async (req, res) => {
      const events = req.body;
      const cursor = await eventsCollection.insertOne(events);
      res.send(cursor);
    });
    // events get
    app.get("/alumniEvents", async (req, res) => {
      const query = {};
      const eventResult = await eventsCollection.find(query).toArray();
      res.send(eventResult);
    });
    // single events get
    app.get("/alumniEvents/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const singleEventResult = await eventsCollection.findOne(query);
      res.send(singleEventResult);
    });

    //   replace "%20" with "-" for blank spaces
    app.get("/api/:query", (req, res) => {
      const query = req.params.query;
      const formattedQuery = query.replace(/%20/g, "-");
      // process the formatted query
      res.send(formattedQuery);
    });

    // api end points
    // all gallery Category data
    app.get("/galleryCategories", async (req, res) => {
      const query = {};
      const cursor = galleriesCategory.find(query);
      const galleries = await cursor.toArray();
      res.send(galleries);
    });

    // single gallery Category data
    app.get("/galleryCategories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const category = await galleriesCategory.findOne(query);
      res.send(category);
    });

    // all gallery data
    app.get("/galleries", async (req, res) => {
      const query = {};
      const cursor = AllGalleryPhotos.find(query);
      const gallery = await cursor.toArray();
      res.send(gallery);
    });

    // batch wise gallery Category data
    app.get("/galleries/batch/:batchNumber", async (req, res) => {
      const batchNumber = req.params.batchNumber;
      const query = { batchNumber: batchNumber };
      const cursor = AllGalleryPhotos.find(query);
      const galleries = await cursor.toArray();
      res.send(galleries);
    });

    // gallery based on featured photos
    app.get("/galleries/featured", async (req, res) => {
      const query = { "others_info.is_fatured": true };
      const cursor = AllGalleryPhotos.find(query);
      const featuredItems = await cursor.toArray();
      res.send(featuredItems);
    });

    // gallery based on trending photos
    app.get("/galleries/trending", async (req, res) => {
      const query = { "others_info.is_trending": true };
      const cursor = AllGalleryPhotos.find(query);
      const trendingItems = await cursor.toArray();
      res.send(trendingItems);
    });

    // CategoryWise gallery data
    app.get("/galleries/:id", async (req, res) => {
      const id = req.params.id;
      const query = { gallery_category_id: id };
      const cursor = AllGalleryPhotos.find(query);
      const gallery = await cursor.toArray();
      res.send(gallery);
    });

    //  Events api

    // all events data
    app.get("/events", async (req, res) => {
      const query = {};
      const cursor = AllEventsData.find(query).sort({ date: 1 });
      const gallery = await cursor.toArray();
      res.send(gallery);
    });

    // all event Category data
    app.get("/eventCategories", async (req, res) => {
      const query = {};
      const cursor = eventsCategory.find(query);
      const galleries = await cursor.toArray();
      res.send(galleries);
    });

    // CategoryWise event data
    app.get("/events/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category: id };
      const cursor = AllEventsData.find(query);
      const gallery = await cursor.toArray();
      res.send(gallery);
    });

    // single event data
    app.get("/events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const category = await AllEventsData.findOne(query);
      res.send(category);
    });

    //  Alumni data
    // AllAlumniData
    // AllUniversityName
    // AllBatchesName

    // All University Name data

    app.get("/all-university-name", async (req, res) => {
      const query = {};
      const newsResult = await AllUniversityName.find(query).toArray();
      res.send(newsResult);
    });

    // All Batches Name data
    app.get("/all-batches", async (req, res) => {
      const query = {};
      const cursor = AllBatchesName.find(query);
      const AllAlumni = await cursor.toArray();
      res.send(AllAlumni);
    });

    // all Alumni data
    app.get("/alumni", async (req, res) => {
      const query = {};
      const cursor = AllAlumniData.find(query);
      const AllAlumni = await cursor.toArray();
      res.send(AllAlumni);
    });

    // year wise batch data
    app.get("/alumni/batch/:year", async (req, res) => {
      const year = req.params.year;
      const query = { graduation_year: year };
      const cursor = AllAlumniData.find(query);
      const yearWiseBatchData = await cursor.toArray();
      res.send(yearWiseBatchData);
    });

    // single person data
    app.get("/alumni/:id", async (req, res) => {
      const alumniId = req.params.id;
      const query = { _id: new ObjectId(alumniId) };
      const personData = await AllAlumniData.findOne(query);
      res.send(personData);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hi From Alumni server");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
