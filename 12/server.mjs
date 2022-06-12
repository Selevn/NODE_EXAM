import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
  if (req.method === "POST") {
    req.setEncoding("latin1");

    let rawData = "";
    req.on("data", (chunk) => {
      rawData += chunk;
    });

    req.on("end", async () => {
      const [boundary, contentDisposition, _contentType, _, ...data] =
        rawData.split("\r\n");
      const filename = contentDisposition.match(/filename="(.*)"/)[1];

      const content = data.join("\r\n").replace(`${boundary}--`, "").trim();
      await fs.writeFile(filename, content, "latin1");

      res.end(filename);
      return;
    });

    res.end("uploaded");
    return;
  }

  res.statusCode = 404;
  res.end("not found");
});

server.listen(8080, () => {
  console.log("listening on port 8080");
});
