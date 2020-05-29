const fetch = require('node-fetch');

module.exports = async (msg, args) => {
  if (!args.length) return;
  const prompt = args.join(' ');
  console.log(prompt);
  const r = Math.floor(Math.random() * 1000);
  const inputs = {
    "prompt": prompt,
    "max_characters": 1024,
    "top_p": 0.9,
    "seed": r
  };

  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Authorization": `Bearer ${process.env.RUNWAYTOKEN}`,
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(inputs)
  };

  const model_url = 'https://coding-train-dad-jokes-6b2472e0.hosted-models.runwayml.cloud/v1/query';
  const response = await fetch(model_url, options);
  const outputs = await response.json();
  await msg.channel.send(`${msg.author} ${outputs.generated_text}`);
};