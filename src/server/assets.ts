import fs from "fs";
import path from "path";

const indexHtml = fs.readFileSync(path.join(__dirname, "/index.html"), {
  encoding: "utf-8"
});
const files = fs.readdirSync(path.join(__dirname, "/static/js"));

const extract = (pattern: string, str: string) => {
  const matches = [];
  const re = new RegExp(pattern, "g");
  let match = re.exec(str);
  while (match !== null) {
    matches.push(match[1]);
    match = re.exec(str);
  }
  return matches;
};

const getRuntimeJs = (files: string[]) => {
  return files
    .filter(
      (file: string) => file.startsWith("runtime") && file.endsWith(".js")
    )
    .map(file => `/static/js/${file}`);
};

export const getAssets = () => {
  return {
    css: extract('<link href="(.+?)" rel="stylesheet">', indexHtml),
    js: [
      ...getRuntimeJs(files),
      ...extract('<script src="(.+?)"></script>', indexHtml)
    ]
  };
};
