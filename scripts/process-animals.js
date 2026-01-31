const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scripts/output/animals.json', 'utf8'));

const processed = data.map(animal => {
  let name = animal.name;
  let status = animal.status;

  // Check for 'reserve' pattern (case insensitive)
  const reserveMatch = name.match(/\s*\(\s*reserve\s*\)\s*/i);
  if (reserveMatch) {
    name = name.replace(reserveMatch[0], '').trim();
    status = 'reserved';
  }

  // Check for 'parrainage uniquement' pattern (case insensitive)
  const parrainageMatch = name.match(/\s*\(\s*parrainage\s+uniquement\s*\)\s*/i);
  if (parrainageMatch) {
    name = name.replace(parrainageMatch[0], '').trim();
    status = 'sponsorship';
  }

  return {
    ...animal,
    name,
    status
  };
});

fs.writeFileSync('scripts/output/animals.json', JSON.stringify(processed, null, 2));

// Print the changes
console.log('Modified animals:');
processed.forEach((a, i) => {
  if (a.name !== data[i].name || a.status !== data[i].status) {
    console.log('  -', a.name, ':', a.status);
  }
});
