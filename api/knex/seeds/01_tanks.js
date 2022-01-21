const fetch = require('cross-fetch');

const apiUrl =
  "https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=b9d068409f8fc9b5f173a9ea17c5cc9e&language=en&tier=8&nation=poland&fields=short_name%2C+name%2C+tank_id%2C+tier";
const apiFetch = async () => {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex("tanks")
    .del()
    .then(async function () {
      const res = await apiFetch();
      const meta = res.meta;
      let tanks = Object.values(res.data);

      for (let i = 0; i < tanks.length; i++) {
        const o = tanks[i];
        delete Object.assign(o, { wot_tank_id: o.tank_id }).tank_id;
      }

      console.log("meta", meta);
      console.log("tanks", tanks);

      return knex("tanks").insert(tanks);
    });
};
