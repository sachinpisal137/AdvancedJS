function deepComp(obj1, obj2) {
    // Check if both objects are the same (strict equality)
    if (obj1 === obj2) return true;

    // If types don't match or either is not an object, return false
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if they have the same number of keys
    if (keys1.length !== keys2.length) return false;

    // Compare each key's value recursively
    for (let key of keys1) {
        if (!deepComp(obj1[key], obj2[key])) return false;
    }

    return true;
}

// Testing the function
let a = { x: [1, 2, 3, 4, 5], y: 0, z: { m: 'test', n: false } };
let b = { x: [1, 2, 3, 4, 5], y: 0, z: { m: 'test', n: false } };
let c = { x: [1, 2, 3, 4, 5, 6], y: 0, z: { m: 'test', n: false } };
let d = { x: [1, 2, 3, 4], y: 0, z: { m: 'test', n: false } };
let e = { x: [1, 2, 3, 4, 5], y: 0, z: { m: 'test', n: true } };
let f = { x: [1, 2, 3, 4, 5], y: -1, z: { m: 'test', n: false } };

console.log(deepComp(a, b)); // -> true
console.log(deepComp(a, c)); // -> false
console.log(deepComp(a, d)); // -> false
console.log(deepComp(a, e)); // -> false
console.log(deepComp(a, f)); // -> false
