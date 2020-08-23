# 餐廳清單
以Express & Node.js打造的餐廳列表,
串接驗證系統及第三方登入,提供用戶擁有自己的美食口袋名單

<img src="https://github.com/apple890493/restaurant-list-3.0/blob/master/3A1.JPG" width="350">

## 功能列表
- 可以以餐廳名稱搜尋
- 檢視餐廳詳細資訊包含類別、地址、電話、評分、圖片及 Google Map
- 點選"我的餐廳清單"返回首頁瀏覽全部餐廳資料
- 可以新增餐廳、編輯餐廳、刪除餐廳

## 種子資料
| Account     | 	Password |  
| ---------- | :----------- |
| user1@example.com     | 12345678   |
| user2@example.com     | 12345678   |

### 啟動方式
- 將專案clone到本地端
  `https://github.com/apple890493/restaurant-list-3.0.git`
- 進入專案
  `cd restaurant-list-3.0`
- 下載package
  `npm install`
- 啟動mongoose
  `npm run seed`
- 透過nodemon啟動專案
  `npm run dev`
- 最後在terminal可以看到 It's listening on localhost : 3000
  `開啟瀏覽器在網址列輸入localhost:3000`

### 開發環境及套件
- bcryptjs: 2.4.3
- body-parser: 1.19.0
- connect-flash: 0.1.1
- dotenv: 8.2.0
- express: 4.17.1
- express-handlebars: 5.0.0
- express-session: 1.17.1
- method-override: 3.0.0
- mongoose: 5.9.25
- multer: 1.4.2
- passport: 0.4.1
- passport-facebook: 3.0.0
- passport-local: 1.0.0
