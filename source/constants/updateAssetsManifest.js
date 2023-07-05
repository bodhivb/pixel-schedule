const fs = require("fs");
const path = require("path");

const manifestPath = path.resolve(__dirname, "assetsManifest.ts");

// Update teachers assets manifest
try {
  console.log("Updating assets manifest...");

  const data = fs.readFileSync(manifestPath, "utf-8");

  // Find json object
  const jsonStart = data.indexOf("= {") + "= ".length;
  const jsonEnd = data.lastIndexOf("};") + "}".length;

  // Convert to valid json
  const badJson = data.substring(jsonStart, jsonEnd);
  const correctJson = badJson
    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
    .replace(/[\]}"'],\s+[\]}]/g, (match) => match.replace(",", ""))
    .replace(/[\]}"'],\s+[\]}]/g, (match) => match.replace(",", ""));

  const json = JSON.parse(correctJson);

  // Find teachers bundle
  for (let bundle of json.bundles) {
    if (bundle.name === "teachers") {
      // Clear old teachers assets
      bundle.assets = [];

      const files = fs.readdirSync(
        path.resolve(__dirname, "../../assets/teachers")
      );

      // Push new assets to bundle
      for (let file of files) {
        const name = file.split(".")[0];
        const srcs = "assets/teachers/" + file;

        bundle.assets.push({ name, srcs });
      }
    }
  }

  // Write new manifest
  const newData =
    data.substring(0, jsonStart) +
    JSON.stringify(json) +
    data.substring(jsonEnd);

  fs.writeFileSync(manifestPath, newData, "utf-8");

  // Log success
  console.log("Assets manifest is successfully updated!");
  console.log("Path: ", manifestPath);
  console.log("Please format it with Prettier.");
} catch (error) {
  console.log(error);
}
