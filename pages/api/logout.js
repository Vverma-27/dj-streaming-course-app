const { strapi } = require("@/config/index");
const cookie = require("cookie");

export default async (req, res) => {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: new Date(0), // 1 week
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "deleted" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json(`${req.method} not supported`);
  }
};
