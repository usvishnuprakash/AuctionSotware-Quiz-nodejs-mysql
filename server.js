const express = require("express");
const app = express();
// MIDDLE WARESnpm i --save-dev prettier eslint-config-prettier eslint-plugin-prettier
app.use(
  require("cors")({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router constants
const apiRoutes = require("./routes/api.routes");
const userRoutes = require("./routes/users.routes");
app.use("/api", apiRoutes);
app.use("/users", userRoutes);

app.use("*", (req, res) => {
  res.json({ message: "Welcome to vishnuprakash nodejs application." });
});

// Global Error handler
app.use((err, req, res, next) => {
  try {
    console.error(err.stack);

    res.status(500).send({ error: err });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
