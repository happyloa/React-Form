const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://Aaron:Baby0225@testingcluster1.bsde6bk.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (error) => console.error("連接數據庫時出錯", error));
db.once("open", () => console.log("成功連接到數據庫"));

const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
  textContent: String,
  imageUrl: String,
});

const DataModel = mongoose.model("Data", DataSchema);

app.post("/api/submit", async (req, res) => {
  const { name, email, textContent, imageUrl } = req.body;

  try {
    const data = new DataModel({ name, email, textContent, imageUrl });
    await data.save();
    res.status(200).json({ message: "數據已成功提交至數據庫" });
  } catch (error) {
    console.error("保存數據時出錯", error);
    res.status(500).json({ message: "保存數據時出錯" });
  }
});

app.listen(port, () => {
  console.log(`Express服務器正在監聽端口 ${port}`);
});
