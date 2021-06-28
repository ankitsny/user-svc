const { sign, verify } = require("jsonwebtoken");

const SECRET = "SECRET_KEY_PLEASE_USE_SOME_PRIVATE_KEY";

exports.sign = (payload) => {
  return sign(payload, SECRET, {
    expiresIn: "15m", //Math.floor(Date.now() / 1000) + 60 * 60,
  });
};

exports.getClaims = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, SECRET, (err, claims) => {
      if (err) return resolve({ err });
      resolve({ claims });
    });
  });
};
