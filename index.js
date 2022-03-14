require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");

connectDB();

const app = express();

var cors = require('cors');
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API updated on 11 february 2022" });
});

app.use("/tests", testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
