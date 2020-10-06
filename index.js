const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const MongoClient = require('mongodb');
const MONGODB_URI = "mongodb://heroku_mzjb9p70:9sbllondsk2ira05luoonr095v@ds019688.mlab.com:19688/heroku_mzjb9p70";

express()
    .use(express.static(path.join(__dirname, "public")))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", (req, res) => res.render("pages/index"))
    .get("/db", async (req, res) => {
      try {
        const client = await MongoClient.connect(MONGODB_URI);
        const result = await client.db('heroku_mzjb9p70').collection('Information').find({}).toArray();
        const results = { results: result };
        res.render("pages/db", results);
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    })
    .get("/cool", (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
