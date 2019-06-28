module.exports = {
  client: {
    service: {
      name: "Weteeit",
      //url: "http://localhost:3000/graphql",
      localSchema: "./schema.json",
      includes: ["src/**/*.{ts,tsx,graphql}"]
    }
  }
};
