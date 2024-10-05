function getRandomSet(m, n, allowDuplicates, sort) {
    const result = allowDuplicates ? [] : new Set();

    while (result.length < m) {
        const randomNum = Math.floor(Math.random() * (n + 1));
        if (allowDuplicates) {
            result.push(randomNum);
        } else {
            result.add(randomNum);
        }
    }

    // Convert Set to array if duplicates are not allowed
    const finalArray = allowDuplicates ? result : Array.from(result);

    // Sort the array if required
    if (sort) {
        finalArray.sort((a, b) => a - b);
    }

    return finalArray;
}

// Test Cases
console.log(getRandomSet(10, 20, false, false)); // No duplicates, unsorted
console.log(getRandomSet(10, 20, false, true));  // No duplicates, sorted
console.log(getRandomSet(10, 20, true, false));   // Duplicates allowed, unsorted
console.log(getRandomSet(10, 20, true, true));    // Duplicates allowed, sorted
