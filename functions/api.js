const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

app.use(express.json());

let data = [
  {
    _id: "04764a7f-f5d8-4bf2-a286-28da92f36a22",
    username: "pepito",
    password: "$2b$10$FUnBxQHeAk6Y8zrpoGDgFeRkJBVCPR6wkLefjv/Q6j9NiUxbOjbUi",
  },
  {
    _id: "12323a-f5d8-4bf2-a286-28da92f36a22",
    username: "jaimito",
    password: "$2b$10$FUnBxQHeAk6Y8zrpoGDgFeRkJBVCPR6wkLefjv/Q6j9NiUxbOjbUi",
  },
  {
    _id: "45645f-f5d8-4bf2-a286-28da92f36a22",
    username: "mileisito",
    password: "$2b$10$FUnBxQHeAk6Y8zrpoGDgFeRkJBVCPR6wkLefjv/Q6j9NiUxbOjbUi",
  },
  {
    _id: "78987f-f5d8-4bf2-a286-28da92f36a22",
    username: "jorgito",
    password: "$2b$10$FUnBxQHeAk6Y8zrpoGDgFeRkJBVCPR6wkLefjv/Q6j9NiUxbOjbUi",
  },
];

router.get("/all", (req, res) => {
  res.status(200).json(data);
});

router.get("/", (req, res) => {
  res.send("App is running..");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const foundElement = data.find((element) => element._id === id);
  if (foundElement) {
    res.json(foundElement);
  } else {
    res.send("No existe el ID");
  }
});

router.post("/add", (req, res) => {
  if (req.body) {
    data.push(req.body);
    res.status(201).json(req.body);
  } else {
    res.status(400).send("No data to add");
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((element) => element._id === id);
  if (index !== -1) {
    data.splice(index, 1);
    res.status(200).send("Deleted");
  } else {
    res.status(404).send("No existe el ID");
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((element) => element._id === id);
  if (index !== -1) {
    data[index] = req.body;
    res.json(data[index]);
  } else {
    res.status(404).send("No existe el ID");
  }
});

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
