# React-Form

這是一個簡單的 React 範例，透過表單將資料傳送至 MongoDB Atlas。

## 如何安裝所需套件？

將檔案 clone 下來後，輸入：

    npm install

安裝需要的套件。
接著，輸入：

    npm start

在本地端啟動開發環境，預設的監聽端口是 3000，等到本地開發環境正式啟動後，可以在瀏覽器上輸入：

    http://localhost:3000

以在本地端預覽專案

## 如何啟動伺服器？

Express 伺服器的啟動檔案是專案內的 server.js，等到所有套件都安裝完成後，輸入：

    node src/server.js

來讓 Express 啟動監聽程序。

### 使用的第三方套件：

- [axios](https://github.com/axios/axios)
- [body-parser](https://github.com/expressjs/body-parser)
- [cors](https://expressjs.com/en/resources/middleware/cors.html)
- [dotenv](https://github.com/motdotla/dotenv)
- [express](https://expressjs.com/zh-tw/)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [mongoose](https://www.npmjs.com/package/mongoose)
