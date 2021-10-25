import { withIronSession } from "next-iron-session";

function handler(req, res, session) {
  req.session.destroy();
}

export default withIronSession(handler, {
  password: process.env.NEXT_IRON_SECRET,
  cookieName: process.env.NEXT_IRON_COOKIENAME,
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});