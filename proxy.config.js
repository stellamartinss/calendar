const PROXY_CONFIG = [
  {
    context: ["/reminder"],
    target: "http://localhost:3000",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
