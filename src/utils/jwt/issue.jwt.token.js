const { sign } = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

// private access token key
const pathToAccessTokenPrivateKey = path.join(
  __dirname,
  "../../..",
  "AccessTokenPrivateKey.pem"
);
const ACCESS_TOKEN_PRIVATE_KEY = fs.readFileSync(
  pathToAccessTokenPrivateKey,
  "utf-8"
);

class IssueAccessToken {
    /**
     *@static
     *@property {string} ACCESS_PRIV_KEY - private key for access token
     */
    static ACCESS_TOKEN_PRIVATE_KEY = ACCESS_TOKEN_PRIVATE_KEY;
  
    /**
     *@static
     *@method issueToken - issueToken method - method to generate token
     *@param {Types.ObjectId} userId - user id for payload
     *@param {string} privKey - private key to sign the token
     *@param {string} expiresIn - token expiration time
     *@returns {string} - signed token
     */
    // is this a correct way to issue the token
    static async issueToken(userId, privKey, expiresIn) {
      const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
      };
  
      return sign(payload, privKey, { expiresIn: expiresIn, algorithm: "RS256" });
    }
  
    /**
     *@static
     *@async
     *@description issue new Access Token with expiration of 50s.
     *@param {Types.ObjectId} userId - user id for payload
     *@param {Types.String} expiresIn - expiresIn for expiration timing, default 1 year
     *@returns {string} - signed access token
     */
    static async issueAccessToken(userId,expiresIn="1y") {
      return this.issueToken(userId, this.ACCESS_TOKEN_PRIVATE_KEY, expiresIn);
    }
  }

  module.exports = IssueAccessToken