require("dotenv").config();
require("express-group-routes");
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const apiName = process.env.API_NAME || "laundromat";
const version = "1.0.0";  // กำหนดค่าเวอร์ชันของ API

app.group(`/${apiName}/`, (router) => {
    router.get("/", (req, res) => {
        res.json({ message: `RESTful API version ${version} For Test` });
    });
    router.use("/", require("./src/routes/branches.route"));
    router.use("/", require("./src/routes/machines.route"));
    router.use("/", require("./src/routes/lineNotifications.route"));
});

 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
