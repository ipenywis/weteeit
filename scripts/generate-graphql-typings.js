const { codegen } = require("@graphql-codegen/core");
const path = require("path");
const fs = require("fs");
const { plugin } = require("@graphql-codegen/typescript");

const outputFile = "../src/App/typings/graphql-types.d.ts";
const config = {
  // used by a plugin internally, although the 'typescript' plugin currently
  // returns the string output, rather than writing to a file
  filename: outputFile,
  schema: "http://localhost:3000/graphql",
  plugins: [
    {
      typescript: {}
    }
  ],
  pluginMap: {
    typescript: {
      plugin
    }
  }
};
//Generate Types
(async () => {
  const output = await codegen(config).catch(err => {
    console.error("Error: GraphQL Typescipt Typings Cannot be generated ", err);
  });
  if (output)
    fs.writeFile(path.join(__dirname, outputFile), output, () => {
      console.log(
        `GraphQL Typings Generated Successfully @ ${path.resolve(
          path.dirname(outputFile)
        )}`
      );
    });
})();
