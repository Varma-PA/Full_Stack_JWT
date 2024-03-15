import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import "dotenv/config";

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    (req, access_token, refresh_token, profile, done) => {
      console.log("Successfully authenticated it");

      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export { passport };
