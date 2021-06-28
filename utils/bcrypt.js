const { hash, compare } = require("bcryptjs");

exports.hash = (str) => {
  return hash(str, 10);
};

exports.compare = (str, hash) => {
  return compare(str, hash);
};
