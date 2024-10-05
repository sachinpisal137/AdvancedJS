class User {
    #firstName;
    #lastName;
    #email;

    constructor(firstName, lastName, email) {
        this.firstName = firstName; // Using the setter for validation
        this.lastName = lastName;   // Using the setter for validation
        this.email = email;         // Using the setter for validation
    }

    // Getter and Setter for firstName
    get firstName() {
        return this.#firstName;
    }

    set firstName(value) {
        if (!/^[A-Z][a-z]+$/.test(value)) {
            throw new Error('First name must start with an uppercase letter and consist of letters only.');
        }
        this.#firstName = value;
    }

    // Getter and Setter for lastName
    get lastName() {
        return this.#lastName;
    }

    set lastName(value) {
        if (!/^[A-Z][a-z]+$/.test(value)) {
            throw new Error('Last name must start with an uppercase letter and consist of letters only.');
        }
        this.#lastName = value;
    }

    // Getter and Setter for email
    get email() {
        return this.#email;
    }

    set email(value) {
        if (!/^[a-z]+(\.[a-z]+)*@[a-z]+(\.[a-z]+)*\.[a-z]+$/.test(value)) {
            throw new Error('Email must be in the correct format (e.g., abc.def@ghi.jk).');
        }
        this.#email = value;
    }
}

// Testing the User class
try {
    let user1 = new User('Aaaa', 'Bbbb', 'Aaaa@gmail.com');
    console.log(user1); // Should log the user object
    let user2 = new User('aaaa', 'Bbbb', 'Aaaa@gmail.com'); // Should throw an error
} catch (err) {
    console.log(err.message); // Output the error message
}

try {
    let user3 = new User('Aaaa', 'Bbbb', 'Aaaa@com'); // Should throw an error
} catch (err) {
    console.log(err.message); // Output the error message
}
