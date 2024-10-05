// Base class for sending an email (simulated)
function sendEmail(from, to, message) {
    console.log(`${from.email} -> ${to.email}: ${message}`);
}

// User class definition
class User {
    constructor({ name, surname, email, role }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.courses = []; // To store course and level
        this.messages = []; // To store message history
    }

    // Add a course and level
    addCourse(course, level) {
        this.courses.push({ course, level });
    }

    // Remove a course
    removeCourse(course) {
        this.courses = this.courses.filter(c => c.course !== course);
    }

    // Edit a course level
    editCourse(course, level) {
        const courseObj = this.courses.find(c => c.course === course);
        if (courseObj) {
            courseObj.level = level;
        } else {
            // If the course does not exist, add it
            this.addCourse(course, level);
        }
    }

    // Send a message and store in history
    sendMessage(to, message) {
        sendEmail(this, to, message);
        to.messages.push({ from: this.email, message });
    }

    // Show message history
    showMessagesHistory() {
        this.messages.forEach(msg => {
            console.log(`${msg.from} -> ${this.email}: ${msg.message}`);
        });
    }
}

// ExtendedUser class with fullName getter/setter
class ExtendedUser extends User {
    // Getter for full name
    get fullName() {
        return `${this.name} ${this.surname}`;
    }

    // Setter for full name
    set fullName(fullName) {
        const [name, surname] = fullName.split(' ');
        this.name = name;
        this.surname = surname;
    }
}

// Teacher class that inherits from ExtendedUser
class Teacher extends ExtendedUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'teacher' });
    }
}

// Student class that inherits from ExtendedUser
class Student extends ExtendedUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'student' });
    }
}

// Testing the system
let student1 = new Student({ name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com' });
let student2 = new Student({ name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com' });
let teacher1 = new Teacher({ name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com' });

student1.addCourse('maths', 2);
teacher1.addCourse('biology', 3);
teacher1.editCourse('chemistry', 4);

console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 2 courses

// Modify student1's full name using the setter
student1.fullName = 'Rafael Fifer';
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses
