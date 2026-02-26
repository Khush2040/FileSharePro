import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.model.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "your-google-client-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret",
            callbackURL: "http://localhost:5000/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user with same email exists
                const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
                if (email) {
                    user = await User.findOne({ email });
                    if (user) {
                        user.googleId = profile.id;
                        await user.save();
                        return done(null, user);
                    }
                }

                // If not, create new user
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: email || `${profile.id}@google.oauth`,
                    // no password required since we changed the schema
                });

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;
