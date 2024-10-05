function getPromiseArray(arr) {
    return arr.map(element => {
        return new Promise((resolve, reject) => {
            if (Number.isInteger(element) && element > 0) {
                setTimeout(() => {
                    resolve(element); // Resolve the promise after the specified time
                }, element);
            } else {
                reject(new Error(`${element} is not a positive integer`)); // Reject the promise with an error
            }
        });
    });
}

// Testing the function
let promises1 = getPromiseArray([10, 30, 5, 20, 'a']);

Promise.all(promises1)
    .then(a => console.log(`all: ${a}`))
    .catch(e => console.log(`all: ${e.message}`)); // -> all: a is not a positive integer

Promise.any(promises1)
    .then(a => console.log(`any: ${a}`))
    .catch(e => console.log(`any: ${e.message}`)); // -> all: a is not a positive integer
