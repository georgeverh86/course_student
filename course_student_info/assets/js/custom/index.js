var $app = $("#application");

$.ajax({
    url: "assets/components/menu/menu.html"
}).done(function (data) {
    $app.empty().append(data);
    $("#studentsId").on("click", function () {
        $.ajax({
            url: "assets/components/students/Students.html"
        }).done(function (out) {
            $("#content").empty().append(out);
            $.ajax({
                url: "assets/components/students/Students.js"
            }).done
        });
    });

    $("#coursesId").on("click", function () {
        $.ajax({
            url: "assets/components/courses/Courses.html"
        }).done(function (out) {
            $("#content").empty().append(out);
            $.ajax({
                url: "assets/components/courses/Courses.js"
            }).done
        });
    });
});

