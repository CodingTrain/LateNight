const fetch = require('node-fetch');
const fs = require('fs');

async function getJokes() {
  let options = {
    headers: {
      'accept': 'application/json'
    }
  };

  let allJokes = [];
  for (let i = 1; i <= 21; i++) {
    let url = 'https://icanhazdadjoke.com/search';
    url += `?limit=30&page=${i}`;
    let response = await fetch(url, options);
    let json = await response.json();

    let jokes = json.results;
    for (let n = 0; n < 1; n++) {
      jokes.forEach(joke => {
        let j = joke.joke.replace('\r\n', '');
        allJokes.push(joke.joke);
      });
    }
  }
  fs.writeFileSync('jokes-icanhazdad.txt', allJokes.join('\n'), 'utf-8');
}

getJokes();