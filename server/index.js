const http = require("http");
const { PORT = 8000 } = process.env; // Ambil port dari environment variable

const fs = require("fs");
const path = require("path");
const public = path.join(__dirname, "../public");

function getFile(fileName) {
  const filePath = path.join(public, fileName);
  return fs.readFileSync(filePath);
}

function onRequest(req, res) {
  switch (req.url) {
    case "/":
      res.writeHead(200);
      res.end(getFile("index.html"));
      break;
    case "/cars":
      res.writeHead(200);
      res.end(getFile("search.html"));
      break;
    default:
      let file = path.join(public, decodeURI(req.url));
      fs.readFile(file, function (err, data) {
        if (err) {
          console.log(err);
          res.writeHead(404);
          res.end("404 NOT FOUND");
          return;
        }
        if (path.extname(file) === ".svg") {
          res.setHeader("content-type", "image/svg+xml");
        }
        res.writeHead(200);
        res.end(data);
      });
      break;
  }
}

const server = http.createServer(onRequest);

// Jalankan server
server.listen(PORT, () => {
  console.log("Server sudah berjalan, silahkan buka localhost:%d", PORT);
});
