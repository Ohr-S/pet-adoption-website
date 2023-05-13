const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());

app.use("/signup", require("./routes/signup").router);
app.use("/login", require("./routes/login").router);
app.use("/pet", require("./routes/pet").router);
app.use("/user", require("./routes/user").router);

app.listen(port, () => {
  console.log("server is running!");
});
