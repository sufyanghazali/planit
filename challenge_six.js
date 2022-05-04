// Planit SDET Challenge 6:
const url = "https://petstore.swagger.io/v2/pet/findByStatus?status=available";

const set = await fetch(url)
    .then(res => res.json()) // fetch data and convert to json
    .then(data => {
        const names = data.map(pet => pet.name); // map names from all pet
        const set = new Set(names); // create set to get unique names
        return set;
    });


console.log(set.size);

