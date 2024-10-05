// User Class
class User {
    constructor({ name, surname, email, role }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.courses = [];
        this.messagesHistory = [];
    }

    addCourse(course, level) {
        this.courses.push({ course, level });
    }

    removeCourse(course) {
        this.courses = this.courses.filter(c => c.course !== course);
    }

    editCourse(course, level) {
        const courseToEdit = this.courses.find(c => c.course === course);
        if (courseToEdit) {
            courseToEdit.level = level;
        }
    }

    sendMessage(to, message) {
        this.messagesHistory.push({ from: this.email, to: to.email, message });
        // Simulate sending email
        sendEmail(this.email, to.email, message);
    }

    showMessagesHistory() {
        this.messagesHistory.forEach(msg => {
            console.log(`${msg.from} -> ${msg.to}: ${msg.message}`);
        });
    }
}

// ExtendedUser Class
class ExtendedUser extends User {
    get fullName() {
        return `${this.name} ${this.surname}`;
    }

    set fullName(value) {
        const [name, surname] = value.split(' ');
        this.name = name;
        this.surname = surname;
    }

    static match(teacher, student, course) {
        const matches = [];

        for (const studentCourse of student.courses) {
            const teacherCourse = teacher.courses.find(tc => tc.course === studentCourse.course && tc.level >= studentCourse.level);
            if (teacherCourse) {
                matches.push({ course: studentCourse.course, level: studentCourse.level });
            }
        }

        if (course) {
            const specificMatch = matches.find(match => match.course === course);
            return specificMatch || undefined;
        }

        return matches;
    }
}

// Teacher Class
class Teacher extends ExtendedUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'teacher' });
    }
}

// Student Class
class Student extends ExtendedUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'student' });
    }
}

// Tutoring Class
class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    addStudent(name, surname, email) {
        const student = new Student({ name, surname, email });
        this.students.push(student);
    }

    addTeacher(name, surname, email) {
        const teacher = new Teacher({ name, surname, email });
        this.teachers.push(teacher);
    }

    getStudentByName(name, surname) {
        return this.students.find(student => student.name === name && student.surname === surname);
    }

    getTeacherByName(name, surname) {
        return this.teachers.find(teacher => teacher.name === name && teacher.surname === surname);
    }

    getStudentsForTeacher(teacher) {
        return this.students.filter(student => {
            return student.courses.some(sc => teacher.courses.some(tc => tc.course === sc.course && tc.level >= sc.level));
        });
    }

    getTeacherForStudent(student) {
        return this.teachers.filter(teacher => {
            return teacher.courses.some(tc => student.courses.some(sc => sc.course === tc.course && tc.level >= sc.level));
        });
    }
}

// ExtendedTutoring Class
class ExtendedTutoring extends Tutoring {
    sendMessages(from, to, message) {
        for (let recipient of to) {
            if (recipient instanceof User) {
                from.sendMessage(recipient, message);
            }
        }
    }
}

// Simulated Email Sending Function
function sendEmail(from, to, message) {
    // Simulate sending an email
    console.log(`Email sent from ${from} to ${to}: ${message}`);
}

// Test the Implementation
let tutoring = new ExtendedTutoring();
tutoring.addStudent('Rafael', 'Fife', 'rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');

let to = [];
to.push(tutoring.getStudentByName('Rafael', 'Fife'));
to.push(tutoring.getStudentByName('Kelly', 'Estes'));

tutoring.sendMessages(tutoring.getTeacherByName('Paula', 'Thompkins'), to, 'test message');

for (let user of to) {
    user.showMessagesHistory();
}
// Expected Output:
// PaulaThompkins@jourrapide.com -> rfife@rhyta.com: test message
// PaulaThompkins@jourrapide.com -> k_estes@dayrep.com: test message
