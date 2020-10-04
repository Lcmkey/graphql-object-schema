const express = require("express");
const graphQLHTTP = require("express-graphql").graphqlHTTP;
const DataLoader = require("dataloader");
const axios = require("axios");

const schema = require("./schema");

const app = express();

const BASE_URL = "http://localhost:3000";
const getPersonByURL = async (relatobeURL) => {
  const result = await axios
    .get(`${BASE_URL}${relatobeURL}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return { statusCode: 400, msg: "Somthing Error" };
    });

  return result;
};

app.use(
  graphQLHTTP((res) => {
    const personLoader = new DataLoader((keys) => {
      console.log(keys);
      return Promise.all(keys.map((k) => getPersonByURL(k)));
    });

    const loaders = {
      person: personLoader,
    };

    return { context: { loaders }, schema, graphiql: true };
  }),
);

app.listen(4000);
