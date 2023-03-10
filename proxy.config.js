const PROXY_CONFIG = [
  {
    context: ["/reminder",],
    target: "http://localhost:3000",
    secure: false
  },
  {
    context: ["/data",],
    target: "https://api.openweathermap.org/data",
    secure: false
  },
];

module.exports = PROXY_CONFIG;
