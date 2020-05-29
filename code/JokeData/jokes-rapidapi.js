// gets 50 jokes from this API and saves to a JSON file: https://rapidapi.com/KegenGuyll/api/dad-jokes/endpoints
const fs = require('fs');
const fetch = require('node-fetch');

const url = 'https://dad-jokes.p.rapidapi.com/random/jokes';

async function getRandomJoke() {
  const response = await fetch(url, {
    headers: {
      'x-rapidapi-host': 'dad-jokes.p.rapidapi.com',
      'x-rapidapi-key': '9f195dab6bmshf5576a743ff63e0p1756c1jsnb96cca4f9138',
      'useQueryString': true
    }
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.log(response.status, await response.text());
  }
}

async function get50Jokes() {
  const jokes = {};
  for (let i = 0; i < 50; i++) {
    const joke = await getRandomJoke();
    if (joke) {
      console.log('got', joke.id);
      jokes[joke.id] = joke;
    } else {
      break;
    }
  }
  const all = Object.keys(jokes).map(id => {
    const joke = jokes[id];
    return `${joke.setup} ${joke.punchline}`
  }).join('\n');
  fs.writeFileSync('./jokes-rapidapi.txt', all, 'utf-8');
}

get50Jokes();