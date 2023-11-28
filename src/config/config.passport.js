const path = require('path');
const fs = require('fs');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Supervisior = require('../models/supervisior');

const pathToAccessTokenKey = path.join(__dirname, '../..', 'AccessTokenPublicKey.pem');
const AccessTokenPublicKey = fs.readFileSync(pathToAccessTokenKey, 'utf-8');

const passportStrategy = (usageName, KEY) => {
    passport.use(
        usageName,
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: KEY,
                algorithms: ['RS256'],
            },
            async (jwtPayload, done) => {
                try {
                    const user = await Supervisior.findOne({ _id: jwtPayload.sub });
                    
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
};

const passportConfig = () => {
    try {
        passportStrategy('jwt-access', AccessTokenPublicKey);
    } catch (error) {
        console.log(error.message);
    }

    passport.serializeUser((user, done) => {
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser((user, done) => {
        done(null, JSON.parse(user));
    });
};

module.exports = { passportConfig };
