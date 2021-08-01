const { events } = require("./data.json");

export default function handler(req, res) {
  // res.setHeader("Allow", ["GET"]);
  if (req.method === "GET") res.status(200).json(events);
  else res.status(405).json(`${req.method} not supported`);
}
