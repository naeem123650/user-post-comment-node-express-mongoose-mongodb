const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
