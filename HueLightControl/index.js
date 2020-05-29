const v3 = require('node-hue-api').v3;
require('dotenv').config();
const LightState = v3.lightStates.LightState;

const USERNAME = process.env.USERNAME;
// The name of the light we wish to retrieve by name
const LIGHT_ID = 5;

turnLightOn();

async function delay(millis) {
  await new Promise(resolve => setTimeout(resolve, millis));
}

async function turnLightOn() {
  const searchResults = await v3.discovery.nupnpSearch();
  const host = searchResults[0].ipaddress;
  const api = await v3.api.createLocal(host).connect(USERNAME);

  for (let h = 0; h < 65535; h += 250) {
    await delay(100);
    const state = new LightState()
      .on()
      .hue(h)
      .saturation(100)
      .brightness(100);
    const result = await api.lights.setLightState(LIGHT_ID, state);
    console.log(`Light state change was successful? ${h}`);
  }
}