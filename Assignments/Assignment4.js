// Function to simulate sending an email
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

// Testing the system
let student1 = new User({ name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com', role: 'student' });
let student2 = new User({ name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com', role: 'student' });
let teacher1 = new User({ name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com', role: 'teacher' });

student1.addCourse('maths', 2);
student1.addCourse('physics', 1);
student1.removeCourse('physics');

teacher1.addCourse('biology', 3);
teacher1.editCourse('biology', 4);

console.log(`${student1.name}: ${student1.courses.length} courses`); // -> Rafael: 1 courses
console.log(`${teacher1.name}: ${teacher1.courses.length} courses`); // -> Paula: 1 courses

teacher1.sendMessage(student1, 'test message');
teacher1.sendMessage(student1, 'another message');
student1.showMessagesHistory();
// -> rfife@rhyta.com -> rfife@rhyta.com: test message
// -> rfife@rhyta.com -> rfife@rhyta.com: another message
