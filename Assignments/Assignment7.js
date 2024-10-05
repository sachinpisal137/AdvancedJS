// Base function to simulate sending an email
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

    addCourse(course, level) {
        this.courses.push({ course, level });
    }

    removeCourse(course) {
        this.courses = this.courses.filter(c => c.course !== course);
    }

    editCourse(course, level) {
        const courseObj = this.courses.find(c => c.course === course);
        if (courseObj) {
            courseObj.level = level;
        } else {
            this.addCourse(course, level);
        }
    }

    sendMessage(to, message) {
        sendEmail(this, to, message);
        to.messages.push({ from: this.email, message });
    }

    showMessagesHistory() {
        this.messages.forEach(msg => {
            console.log(`${msg.from} -> ${this.email}: ${msg.message}`);
        });
    }
}

// ExtendedUser class with fullName getter/setter and static match method
class ExtendedUser extends User {
    get fullName() {
        return `${this.name} ${this.surname}`;
    }

    set fullName(fullName) {
        const [name, surname] = fullName.split(' ');
        this.name = name;
        this.surname = surname;
    }

    static match(teacher, student, courseName = null) {
        if (courseName) {
            const studentCourse = student.courses.find(c => c.course === courseName);
            const teacherCourse = teacher.courses.find(c => c.course === courseName);

            if (studentCourse && teacherCourse && teacherCourse.level >= studentCourse.level) {
                return { course: courseName, level: studentCourse.level };
            }
            return undefined;
        } else {
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

// Tutoring class to manage students and teachers
class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    // Add a new student
    addStudent(name, surname, email) {
        const student = new Student({ name, surname, email });
        this.students.push(student);
    }

    // Add a new teacher
    addTeacher(name, surname, email) {
        const teacher = new Teacher({ name, surname, email });
        this.teachers.push(teacher);
    }

    // Get a student by name and surname
    getStudentByName(name, surname) {
        return this.students.find(s => s.name === name && s.surname === surname);
    }

    // Get a teacher by name and surname
    getTeacherByName(name, surname) {
        return this.teachers.find(t => t.name === name && t.surname === surname);
    }

    // Get a list of students that a teacher can tutor
    getStudentsForTeacher(teacher) {
        return this.students.filter(student => {
            const matches = ExtendedUser.match(teacher, student);
            return matches.length > 0;
        });
    }

    // Get a list of teachers that can tutor a student
    getTeacherForStudent(student) {
        return this.teachers.filter(teacher => {
            const matches = ExtendedUser.match(teacher, student);
            return matches.length > 0;
        });
    }
}

// Testing the Tutoring system
let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife', 'rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');

let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);

let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);

let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);

console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...}
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...}

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> undefined
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...}
