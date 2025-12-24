const express = require("express");
const { nanoid } = require("nanoid");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

const urlDatabase = {};

const BASE_URL = "http://localhost:3000";

app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  const shortId = nanoid(6);
  urlDatabase[shortId] = longUrl;

  res.json({
    shortUrl: `${BASE_URL}/${shortId}`,
  });
});

app.get("/:shortId", (req, res) => {
  const originalUrl = urlDatabase[req.params.shortId];

  if (!originalUrl) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(originalUrl);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


