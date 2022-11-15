class Course {
    constructor(title, instructor, image) {
        this.id = Math.floor(Math.random() * 10000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

class Storage {
    static courses;
    static getCourses() {
        
        if (localStorage.getItem('courses') == null)
            courses = [];
        else
            courses = JSON.parse(localStorage.getItem('courses'));

            console.log(courses);
        return courses;
    }

    static displayCourses() {
        const courses = Storage.getCourses();
        var ui = new UI();
        courses.forEach(course => {
            ui.addCourseToList(course);
        });
    }

    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));

        const aaa = JSON.parse(localStorage.getItem('courses'));
        console.log(aaa);

        console.log('eklendi!');
    }

    static deleteCourse(element) {
        if (element.classList.contains('delete')) {
            const id = element.getAttribute('data-id');
            const courses = Storage.getCourses();
            courses.forEach((course, index) => {
                if (course.id === id) {
                    courses.splice(index, 1); //indexten itibaren bir tane sil
                }
            });
            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }
}

class UI {
    addCourseToList(course) {
        const list = document.getElementById('course-list');
        const html = `
            <tr>
                <td><img src="/img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" data-id="${course.id}" class="btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        `;
        list.innerHTML += html;
    }

    clearCourse() {
        document.getElementById('title').value = "";
        document.getElementById('instructor').value = "";
        document.getElementById('image').value = "";
    }

    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            return true;
        }
    }

    showAlert(message, className) {
        let alert = `
            <div class="alert alert-${className}">
                ${message}
            </div>
        `;
        const row = document.querySelector('.row');
        row.insertAdjacentHTML('beforebegin', alert);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

document.getElementById('course-list').addEventListener('click', function (e) {
    let ui = new UI();
    if (ui.deleteCourse(e.target)) {
        Storage.deleteCourse(e.target);
        ui.showAlert('Kurs silindi!', 'danger');
    }
});

document.getElementById('new-course').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    var course = new Course(title, instructor, image);
    var ui = new UI();

    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Formu eksiksiz bir şekilde tamamlayın!', 'warning');
    }
    else {
        ui.addCourseToList(course);
        Storage.addCourse(course);
        ui.clearCourse();
        console.log(title + ' ' + instructor + ' ' + image);
        ui.showAlert('Kurs başarılı bir şekilde eklendi!', 'success');
    }
    e.preventDefault(); //sayfanın submit olmasını yani sayfanın yenilenmesini önlüyoruz. yani kesiyoruz.
});

document.addEventListener('domcontentloaded', Storage.displayCourses);