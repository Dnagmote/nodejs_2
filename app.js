const express = require("express");
const app = express();
const PORT = 9000;
const indexRoute = require("./routes/index");

app.use(express.json());
require("./helper/mongoose");
indexRoute.initialize(app);

app.listen(PORT, () => {
    console.log(`Sever listning on port ${PORT}`);
});
