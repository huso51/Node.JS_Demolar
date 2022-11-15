function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

function UI() {

}

UI.prototype.addCourseToList = function (course) {
    const list = document.getElementById('course-list');
    const html = `
        <tr>
            <td><img src="/img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;
    list.innerHTML += html;
}

UI.prototype.clearCourse = function () {
    document.getElementById('title').value = "";
    document.getElementById('instructor').value = "";
    document.getElementById('image').value = "";
}

UI.prototype.deleteCourse = function (element) {
    if (element.classList.contains('delete')) {
        element.parentElement.parentElement.remove();
    }
}
UI.prototype.showAlert = function (message, className) {
    let alert = `
        <div class="alert alert-${className}">
            ${message}
        </div>
    `;
    const row = document.querySelector('.row');
    row.insertAdjacentHTML('beforebegin', alert);
    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000);
}

document.getElementById('new-course').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    let course = new Course(title, instructor, image);
    let ui = new UI();

    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Formu eksiksiz bir şekilde tamamlayın!','warning');
    }
    else {
        ui.addCourseToList(course);
        ui.clearCourse();
        console.log(title + ' ' + instructor + ' ' + image);
        ui.showAlert('Kurs başarılı bir şekilde eklendi!','success');
    }
    e.preventDefault(); //sayfanın submit olmasını yani sayfanın yenilenmesini önlüyoruz. yani kesiyoruz.
});

document.getElementById('course-list').addEventListener('click', function (e) {
    let ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('Kurs silindi!','danger');
})