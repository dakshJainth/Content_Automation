const http = require("http");
const net = require("net");
const fs = require("fs");
const path = require("path");

const preferredPort = Number(process.env.PORT || 5173);
const root = path.join(__dirname, "dist");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function createStaticServer(port) {
  return http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://localhost:${port}`);
  const cleanPath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, "");
  const filePath = path.normalize(path.join(root, cleanPath || "index.html"));
  const safePath = filePath.startsWith(root) ? filePath : path.join(root, "index.html");
  const finalPath = fs.existsSync(safePath) && fs.statSync(safePath).isFile()
    ? safePath
    : path.join(root, "index.html");

  fs.readFile(finalPath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(finalPath)] || "application/octet-stream"
    });
    response.end(data);
  });
  });
}

function findOpenPort(port, attemptsLeft = 10) {
  return new Promise((resolve, reject) => {
    const tester = net.createServer();
    tester.once("error", (error) => {
      tester.close();
    if (error.code === "EADDRINUSE" && attemptsLeft > 0) {
      const nextPort = port + 1;
      console.log(`Port ${port} is busy, trying ${nextPort}...`);
        findOpenPort(nextPort, attemptsLeft - 1).then(resolve, reject);
      return;
    }

      reject(error);
    });

    tester.once("listening", () => {
      tester.close(() => resolve(port));
  });
    tester.listen(port, "0.0.0.0");
  });
}

findOpenPort(preferredPort)
  .then((port) => {
    const server = createStaticServer(port);
    server.listen(port, "0.0.0.0", () => {
      console.log(`ViralFlow AI is running at http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
