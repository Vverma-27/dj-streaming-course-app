const { strapi } = require("@/config/index");
const cookie = require("cookie");

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    try {
      const headers = { "Content-Type": "application/json" };
      const { data } = await strapi.post("/auth/local", {
        identifier,
        password,
        headers,
      });
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } catch ({ response: { data } }) {
      res
        .status(data.statusCode)
        .json({ error: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json(`${req.method} not supported`);
  }
};
