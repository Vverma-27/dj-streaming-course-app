const { strapi } = require("@/config/index");
const cookie = require("cookie");

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      if (!req.headers.cookie) {
        res.status(403).json({ message: "Not Authorized" });
      }
      const { token } = cookie.parse(req.headers.cookie);
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const { data: user } = await strapi.get("/users/me", { headers });
      //   console.log(user);
      res.status(200).json({ user });
    } catch ({ response: { data } }) {
      //   console.log(data.message);
      res.status(data.statusCode).json({
        error: data.message,
      });
      //
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json(`${req.method} not supported`);
  }
};
