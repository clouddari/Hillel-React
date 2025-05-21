import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const cardText = [
  { id: 1, title: "HEART", content: "Backend says, ❤️ ❤️❤️ won today!" },
  { id: 2, title: "PAW", content: "Backend says, 🐾🐾🐾won today!" },
  { id: 3, title: "SPIDER", content: "Backend says,🕷🕷🕷🕷  won today!" },
  { id: 4, title: "ALIEN", content: "Backend says, 👽 👽👽 won today!" },
];

app.get("/api/data", (req, res) => {
  const winner = req.query.winner;
  const result = cardText.find((c) => c.title === winner);
  res.json({ cardText: result ? [result] : [] });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
console.log("Running CORRECT file");