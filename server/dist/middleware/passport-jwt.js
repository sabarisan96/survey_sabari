import PassportJWT from 'passport-jwt';
import { devConfig } from '../env/development';
import User from '../user/user.model';
import passport from 'passport';

export const configureJWTStrategy = () => {

    var opts = {};
    opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = devConfig.secret;
    passport.use(new PassportJWT.Strategy(opts, (payload, done) => {
        User.findOne({ id: payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
};