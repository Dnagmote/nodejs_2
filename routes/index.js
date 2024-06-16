const userRoute = require("../services/user/user.routes");

const initialize = (app) => {
    app.use("/api/v1/user", userRoute);
};

module.exports = { initialize };
