import fetch from 'node-fetch';

const realestate = "costalux";
const res = await fetch(`https://api.habigrid.com/api/public/properties?realestate=${realestate}`);

if (!res.ok) {
  console.error("Failed to fetch:", res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
console.log("Fetched properties:", data.map(p => p.id));