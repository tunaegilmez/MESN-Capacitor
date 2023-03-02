const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

var bodyParser = require("body-parser");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

const userSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const User = mongoose.model("users", userSchema);

app.post("/user", async (req, res) => {
  const { name, surname } = req.body;

  if (!name || !surname) {
    return res.json({ message: "invalid values" });
  }

  const user = new User({ name, surname });
  await user.save();

  return res.json({ user });
});

app.get("/users", async (req, res) => {
  const users = await User.find().sort({ created_at: -1 }).exec();

  return res.json({ users });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello MESN!" });
});

app.listen(port, () => {
  console.log(`MESN app listening on port ${port}`);
});

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://mesn:pass@mesn.dqul1if.mongodb.net/name?retryWrites=true&w=majority"
  );
}
