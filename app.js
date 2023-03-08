const express = require("express");
require("dotenv").config();
const axios = require("axios");
const app = express();
app.use(express.json());

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/new", async (req, res) => {
  try {
    const u = req.body.u;
    const q = req.body.q;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer the following question based on the information in the provided URL:\n\n${u}\n\n${q}: `,
      max_tokens: 1500,
      temperature: 0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      // stop: ["\n"],
    });
    console.log(response.data);
    return res.status(200).json({
      status: response.status,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.response,
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
