class MyIterable {
    constructor() {
        this.elements = new Set(); // Using Set to avoid duplicates automatically
    }

    // Add an element to the iterable, ignoring duplicates
    add(value) {
        this.elements.add(value);
    }

    // Check if an element exists in the iterable
    has(value) {
        return this.elements.has(value);
    }

    // Delete an element from the iterable
    del(value) {
        this.elements.delete(value);
    }

    // Get the number of elements in the iterable
    get length() {
        return this.elements.size;
    }

    // Custom iterator to make the object iterable
    *[Symbol.iterator]() {
        for (let value of this.elements) {
            yield value; // Use generator to return elements one by one
        }
    }
}

// Testing the MyIterable class
let iterable = new MyIterable();
iterable.add(2);
iterable.add(5);
iterable.add(3);
iterable.add(2); // Duplicate, will be ignored
iterable.del(3); // Deleting element 3

console.log(iterable.length); // -> 2
console.log(iterable.has(2)); // -> true
console.log(iterable.has(3)); // -> false
console.log(...iterable); // -> 2 5
