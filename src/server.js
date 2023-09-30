// 引入必要的套件
const express = require("express");
const mongoose = require("mongoose"); // 用於MongoDB的object modeling
const bodyParser = require("body-parser"); // 用於解析HTTP請求體的中介軟體
const dotenv = require("dotenv"); // 用於從.env檔案中載入環境變數

// 使用dotenv.config()來載入.env檔案中的環境變數
dotenv.config();

// 創建一個Express應用
const app = express();

// 定義服務器的監聽端口
const port = 5000;

// 使用body-parser中介軟體來解析json請求體
app.use(bodyParser.json());

// 使用mongoose.connect()來連接到MongoDB數據庫
mongoose.connect(
  process.env.MONGODB_URI, // 從環境變數中取得MongoDB的連接URI
  {
    useNewUrlParser: true, // 使用新的URL解析器，以避免老式URL解析器中的非推薦警告
    useUnifiedTopology: true, // 使用統一的新的拓扑結構，以避免警告
  }
);

// 創建與數據庫的連接物件
const db = mongoose.connection;

// 如果與MongoDB數據庫的連接發生錯誤，將錯誤打印到控制台
db.on("error", (error) => console.error("連接數據庫時出錯", error));

// 當成功連接到MongoDB數據庫時，打印成功消息到控制台
db.once("open", () => console.log("成功連接到數據庫"));

// 定義一個新的mongoose數據模型的結構（schema）
const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
  textContent: String,
  imageUrl: String,
});

// 創建一個mongoose數據模型，用於與MongoDB中的"react-form-data"集合互動
const DataModel = mongoose.model("react-form-data", DataSchema);

// 定義一個POST路由，用於接收客戶端提交的數據並保存到MongoDB
app.post("/api/submit", async (req, res) => {
  // 從請求體中提取數據
  const { name, email, textContent, imageUrl } = req.body;

  try {
    // 創建一個新的數據實例
    const data = new DataModel({ name, email, textContent, imageUrl });
    // 使用async/await保存該實例到MongoDB
    await data.save();
    // 保存成功時回傳200狀態碼和成功消息
    res.status(200).json({ message: "數據已成功提交至數據庫" });
  } catch (error) {
    // 發生錯誤時打印錯誤到控制台並回傳500狀態碼和錯誤消息
    console.error("保存數據時出錯", error);
    res.status(500).json({ message: "保存數據時出錯" });
  }
});

// 啟動Express服務器，並在給定的端口上開始監聽
app.listen(port, () => {
  console.log(`Express服務器正在監聽端口 ${port}`);
});
