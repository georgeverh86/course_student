function getSingleStudent(id, studentName) {
    $("#singleStudentText").text(studentName);
    $("#addStudenttoCourse").click(function () {
        $("#addCourseToStudentOk").unbind();
        $("#addCourseToStudentCancel").unbind();
        $.getJSON("http://localhost:8080/api/getCourses", function (data) {
            var output = '';
            $.each(data, function (key, value) {
                output += '<option value="' + value[0] + '">' + value[1] + '</option>';
                console.log(output);
            });
            $('#selectCourses').html(output);
        })


        $("#addCourseToStudentModal").show();

        $("#addCourseToStudentOk").click(function () {
            var url = "http://localhost:8080/api/addCourseToStudent?studentId=" + id + "&courseId=" + $("#selectCourses").val();
            console.log(url);
            $.ajax({
                type: "POST",
                url: url,
                accepts: {
                    text: "application/json"
                },
                // The key needs to match your method's input parameter (case-sensitive).
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                success: function (data) {
                    console.log("Success adding course to student");
                },
                error: function (errMsg) {
                    console.log("Error adding course to student");
                }
            });
            $("#addCourseToStudentModal").hide();
            $.ajax({
                url: "assets/components/singleStudent/SingleStudent.html"
            }).done(function (data) {
                $("#singleStudentInfo").empty().append(data);
                $.ajax({
                    url: "assets/components/singleStudent/SingleStudent.js"
                }).done(function () {
                    getSingleStudent(id, studentName)
                })
            });
        })

        $("#addCourseToStudentCancel").click(function () {
            $("#addCourseToStudentModal").hide();
        })
    })

    $("#closeSingletudent").click(function () {
        $("#singleStudentInfo").empty();
        $("#allStudentsInfo").show();
    })

    $.getJSON("http://localhost:8080/api/getStudentDetail/" + id, function (data) {
        var output = '<div>Course List:</div>';
        var outputScoreId = '';
        var outputScoreDate = '';
        var outputScoreMark = '';
        var courseIdCheck;
        var courseId;
        var courseName;
        var courseStartDate;
        var courseEndDate;
        var scoreId;
        var scoreDate;
        var scoreMark;
        $("#singleStudentCourses").empty().append(output);
        output='';
        $.each(data, function (key, value) {
            courseId = value[0];
            if (data.length == 1) {
                if (courseId != null) {
                    courseIdCheck = value[0];
                    courseName = value[1];
                    courseStartDate = value[2];
                    courseEndDate = value[3];
                    scoreId = value[4];
                    scoreDate = value[5];
                    scoreMark = value[6];
                    console.log(scoreMark);
                    if (scoreMark == null) {
                        scoreMark = '';
                    }
                    output += "<div class='courseOnStudent cursor-pointer' name='" + courseId + "'>" + courseId + " " + courseName + " " + courseStartDate + " " + courseEndDate + "</div>";
                    output += "<button class='btn deleteCourseFromStudent' name='" + courseId + "'>Delete course</button>";
                    output += "<table class='table table-striped table-bordered table-hover'>";
                    outputScoreId += "<tr><td>" + scoreId + "</td></tr>";
                    outputScoreDate += "<tr><td>" + scoreDate + "</td></tr>";
                    outputScoreMark += "<tr><td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td></tr>";
                    output += outputScoreId + outputScoreDate + outputScoreMark + "</table>";
                    $("#singleStudentCourses").append(output);
                }
            } else {
            if (key === 0) {
                if (courseId != null) {
                    courseIdCheck = value[0];
                    courseName = value[1];
                    courseStartDate = value[2];
                    courseEndDate = value[3];
                    scoreId = value[4];
                    scoreDate = value[5];
                    scoreMark = value[6];
                    console.log(scoreMark);
                    if (scoreMark == null) {
                        scoreMark = '';
                    }
                    output += "<div class='courseOnStudent cursor-pointer' name='" + courseId + "'>" + courseId + " " + courseName + " " + courseStartDate + " " + courseEndDate + "</div>";
                    output += "<button class='btn deleteCourseFromStudent' name='" + courseId + "'>Delete course</button>";
                    output += "<table class='table table-striped table-bordered table-hover'>";
                    outputScoreId += "<tr><td>" + scoreId + "</td>";
                    outputScoreDate += "<tr><td>" + scoreDate + "</td>";
                    outputScoreMark += "<tr><td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td>";
                }
            } else {
                if (key != data.length - 1) {
                    if (courseId != courseIdCheck) {
                        outputScoreId += "</tr>";
                        outputScoreDate += "</tr>";
                        outputScoreMark += "</tr>";
                        output += outputScoreId + outputScoreDate + outputScoreMark + "</table>";
                        $("#singleStudentCourses").append(output);
                        courseIdCheck = value[0];
                        courseName = value[1];
                        courseStartDate = value[2];
                        courseEndDate = value[3];
                        scoreId = value[4];
                        scoreDate = value[5];
                        scoreMark = value[6];
                        if (scoreMark == null) {
                            scoreMark = '';
                        }
                        output = '';
                        output += "<div class='courseOnStudent cursor-pointer' name='" + courseId + "'>" + courseId + " " + courseName + " " + courseStartDate + " " + courseEndDate + "</div>";
                        output += "<button class='btn deleteCourseFromStudent' name='" + courseId + "'>Delete course</button>";
                        output += "<table class='table table-striped table-bordered table-hover'>";
                        outputScoreId = "<tr><td>" + scoreId + "</td>";
                        outputScoreDate = "<tr><td>" + scoreDate + "</td>";
                        outputScoreMark = "<tr><td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td>";
                    } else {
                        courseIdCheck = value[0];
                        scoreId = value[4];
                        scoreDate = value[5];
                        scoreMark = value[6];
                        if (scoreMark == null) {
                            scoreMark = '';
                        }
                        outputScoreId += "<td>" + scoreId + "</td>";
                        outputScoreDate += "<td>" + scoreDate + "</td>";
                        outputScoreMark += "<td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td>";
                    }
                } else {
                    if (courseId != courseIdCheck) {
                        outputScoreId += "</tr>";
                        outputScoreDate += "</tr>";
                        outputScoreMark += "</tr>";
                        output += outputScoreId + outputScoreDate + outputScoreMark + "</table>";
                        console.log(output);
                        $("#singleStudentCourses").append(output);
                        courseIdCheck = value[0];
                        courseName = value[1];
                        courseStartDate = value[2];
                        courseEndDate = value[3];
                        scoreId = value[4];
                        scoreDate = value[5];
                        scoreMark = value[6];
                        if (scoreMark == null) {
                            scoreMark = '';
                        }
                        output = '';
                        output += "<div class='courseOnStudent cursor-pointer' name='" + courseId + "'>" + courseId + " " + courseName + " " + courseStartDate + " " + courseEndDate + "</div>";
                        output += "<button class='btn deleteCourseFromStudent' name='" + courseId + "'>Delete course</button>";
                        output += "<table class='table table-striped table-bordered table-hover'>";
                        outputScoreId = "<tr><td>" + scoreId + "</td></tr>";
                        outputScoreDate = "<tr><td>" + scoreDate + "</td></tr>";
                        outputScoreMark = "<tr><td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td></tr>";
                        output += outputScoreId + outputScoreDate + outputScoreMark + "</table>";
                        $("#singleStudentCourses").append(output);
                    } else {
                        scoreId = value[4];
                        scoreDate = value[5];
                        scoreMark = value[6];
                        if (scoreMark == null) {
                            scoreMark = '';
                        }
                        outputScoreId += "<td>" + scoreId + "</td></tr>";
                        outputScoreDate += "<td>" + scoreDate + "</td></tr>";
                        outputScoreMark += "<td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td></tr>";
                        output += outputScoreId + outputScoreDate + outputScoreMark + "</table>";
                        $("#singleStudentCourses").append(output);
                    }


                }
            }
        }
        });

        $('.deleteCourseFromStudent').click(function () {
            var courseDeleteId = $(this).attr("name");
            console.log(courseDeleteId);

            $('#deleteCourseStudentOk').unbind();
            $('#deleteCourseStudentCancel').unbind();
            $("#deleteCourseStudentText").text("Delete course from student?");
            $('#deleteCourseStudentModal').show();

            $('#deleteCourseStudentOk').click(function () {
                var url = "http://localhost:8080/api/deleteScore?studentId=" + id + "&courseId=" + courseDeleteId;
                console.log(url);
                $.ajax({
                    type: "DELETE",
                    url: url,
                    accepts: {
                        text: "application/json"
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "text",
                    success: function (data) {
                        console.log("Success delete course from student");
                    },
                    error: function (errMsg) {
                        console.log("Error delete course from student");
                    }
                });
                $('#deleteCourseStudentModal').hide();
                $.ajax({
                    url: "assets/components/singleStudent/SingleStudent.html"
                }).done(function (data) {
                    $("#singleStudentInfo").empty().append(data);
                    $.ajax({
                        url: "assets/components/singleStudent/SingleStudent.js"
                    }).done(function () {
                        getSingleStudent(id, studentName)
                    })
                });
            })

            $('#deleteCourseStudentCancel').click(function () {
                $('#deleteCourseStudentModal').hide();
            })
        })

        $('.courseOnStudent').click(function () {
            var courseId2 = $(this).attr("name");
            var courseName2 = $(this).text();
            console.log(courseId2);
            console.log(courseName2);
            $.ajax({
                url: "assets/components/singleCourse/SingleCourse.html"
            }).done(function (data) {
                $("#singleStudentInfo").empty().append(data);
                $.ajax({
                    url: "assets/components/singleCourse/SingleCourse.js"
                }).done(function () {
                    getSingleCourse(courseId2, courseName2);
                })

            });

        })

        $('.setMarkClass').click(function () {
            $('#setMarkOk').unbind();
            $('#setMarkCancel').unbind();
            $('#setMarkModal').show();
            console.log($(this));
            console.log($(this)[0]);

            var setScoreId = $(this).attr("name");


            $('#setMarkOk').click(function () {
                var setMarkValue = $('#setMarkSelect').val();
                // var ajaxbody = "{\"id\":" + 15 + ",\"mark\":" + 5 + ",\"course\":{\"id\":"+1+"},\"student\":{\"id\":"+1+"}}";
                var url = "http://localhost:8080/api/setMark?scoreId="+setScoreId+"&mark="+setMarkValue;
                console.log(url);
                $.ajax({
                    type: "PUT",
                    url: url,
                    accepts: {
                        text: "application/json"
                    },
                    contentType: "application/json; charset=utf-8",
                    // data: ajaxbody,
                    dataType: "text",
                    success: function (data) {
                        console.log("Success set mark");
                    },
                    error: function (errMsg) {
                        console.log("Error set mark");
                    }
                });
                $('#setMarkModal').hide();
                $.ajax({
                    url: "assets/components/singleStudent/SingleStudent.html"
                }).done(function (data) {
                    $("#singleStudentInfo").empty().append(data);
                    $.ajax({
                        url: "assets/components/singleStudent/SingleStudent.js"
                    }).done(function () {
                        getSingleStudent(id, studentName)
                    })
                });

            })

            $('#setMarkCancel').click(function () {
                $('#setMarkModal').hide();
            })

        })



    })

}