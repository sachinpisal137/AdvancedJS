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

// ExtendedUser class with fullName getter/setter and the match method
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

    // Static match method to compare courses between student and teacher
    static match(teacher, student, courseName = null) {
        if (courseName) {
            // If a specific course is provided, check for that course
            const studentCourse = student.courses.find(c => c.course === courseName);
            const teacherCourse = teacher.courses.find(c => c.course === courseName);

            if (studentCourse && teacherCourse && teacherCourse.level >= studentCourse.level) {
                return { course: courseName, level: studentCourse.level };
            }
            return undefined;
        } else {
            // If no course is provided, check all courses for matches
            let matches = [];
            for (let studentCourse of student.courses) {
                const teacherCourse = teacher.courses.find(c => c.course === studentCourse.course);
                if (teacherCourse && teacherCourse.level >= studentCourse.level) {
                    matches.push({ course: studentCourse.course, level: studentCourse.level });
                }
            }
            return matches;
        }
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

// Student 1 adds courses
student1.addCourse('maths', 2);
student1.addCourse('physics', 4);

// Teacher 1 adds courses
teacher1.addCourse('maths', 4);

// Matching student1 and teacher1
let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]

// Teacher lowers the level of 'maths'
teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []

// Teacher adds 'physics' course at level 4
teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}
