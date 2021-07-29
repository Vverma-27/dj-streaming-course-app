const { events } = require("./data.json");

export default function handler(req, res) {
  const evt = events.filter((event) => event.slug === req.query.slug);
  res.setHeader("Allow", ["GET"]);
  if (req.method === "GET") res.status(200).json(evt);
  else res.status(405).json(`${req.method} not supported`);
}
