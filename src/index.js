const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    console.log("Received a GET request");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
