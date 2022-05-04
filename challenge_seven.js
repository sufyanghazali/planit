function csvToArray(str) {
    const arr = str.split("\n")
        .map(row => row.split(","));

    const headings = arr[0];

    // create array of objects to store row values using headings as keys
    const values = arr
        .filter((el, index) => index > 0)
        .map(row => {
            let obj = {}
            for (let i = 0; i < headings.length; i++) {
                obj[headings[i]] = row[i];
            }
            return obj;
        });

    return values;
}

function lookup(arr, heading, value) {
    let result;
    let found = false;
    let i = 0;

    while (!found && i < arr.length) {
        if (arr[i][heading] == value) {
            result = arr[i];
            found = true;
        }
        i++;
    }

    return result;
}

const form = document.querySelector("#form");
const input = document.querySelector("#csvFile");
const headingInput = document.querySelector("#headingInput");
const valueInput = document.querySelector("#valueInput");

let values = [];

form.addEventListener("submit", e => {
    e.preventDefault();
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = e => {
        const csvText = e.target.result;
        values = csvToArray(csvText);
        const result = lookup(values, headingInput.value, valueInput.value);

        if (result)
            console.log(result);
        else {
            console.log(`"${ headingInput.value }" of "${ valueInput.value }" not found.`);
        }
    }

    reader.readAsText(file);
});