function getSingleCourse(id, courseName) {
    $("#singleCourseText").text(courseName);
    $("#addStudenttoCourse").click(function () {
        $("#addCourseToStudentOk").unbind();
        $("#addCourseToStudentCancel").unbind();
        $.getJSON("http://localhost:8080/api/getStudents", function (data) {
            var output = '';
            $.each(data, function (key, value) {
                output += "<option value='" + value[0] + "'>" + value[1] +" " + value[2]+ "</option>";
            });
            $('#selectStudents').html(output);
        })


        $("#addCourseToStudentModal").show();

        $("#addCourseToStudentOk").click(function () {
            var url = "http://localhost:8080/api/addCourseToStudent?studentId=" + $("#selectStudents").val() + "&courseId=" + id;
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
                    console.log("Success adding student to course");
                },
                error: function (errMsg) {
                    console.log("Error adding student to course");
                }
            });
            $("#addCourseToStudentModal").hide();
            $.ajax({
                url: "assets/components/singleCourse/SingleCourse.html"
            }).done(function (data) {
                $("#singleStudentInfo").empty().append(data);
                $.ajax({
                    url: "assets/components/singleCourse/SingleCourse.js"
                }).done(function () {
                    getSingleCourse(id, courseName)
                })
            });
        })

        $("#addCourseToStudentCancel").click(function () {
            $("#addCourseToStudentModal").hide();
        })
    })

    $("#closeSingleCourse").click(function () {
        $("#singleStudentInfo").empty();
        $("#allStudentsInfo").show();
    })

    $.getJSON("http://localhost:8080/api/getCourseDetail/" + id, function (data) {
        var output = '<div>Student List:</div>';
        var outputHeader = '';
        var outputBody = '';
        var appendHeader = true;
        var studentIdCheck;
        var studentId;
        var studentFirstName;
        var studentLastName;
        var scoreId;
        var scoreDate;
        var scoreMark;
        $("#singleCourseStudents").empty().append(output);
        output='';
        $.each(data, function (key, value) {
            studentId = value[0];
            if (data.length == 1) {
                if (studentId != null) {
                    studentIdCheck = value[0];
                    studentFirstName = value[1];
                    if (studentFirstName == null) {
                        studentFirstName = '';
                    }
                    studentLastName = value[2];
                    if (studentLastName == null) {
                        studentLastName = '';
                    }
                    scoreId = value[3];
                    scoreDate = value[4];
                    scoreMark = value[5];
                    console.log(scoreMark);
                    if (scoreMark == null) {
                        scoreMark = '';
                    }

                    output += "<table class='table table-striped table-bordered table-hover'>";
                    output += "<tr><td>Student</td><td>" + scoreDate + "</td><td>Delete</td></tr>";
                    output += "<tr><td class='studentOnCourse cursor-pointer' name='" + studentId + "'>" + studentFirstName + " " + studentLastName + "</td>";
                    output += "<td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td>";
                    output += "<td><button class='btn deleteCourseFromStudent' name='" + studentId + "'>Delete student</button></td></tr></table>";
                    $("#singleCourseStudents").append(output);
                }
            } else {
                if (key === 0) {
                    if (studentId != null) {
                        studentIdCheck = value[0];
                        studentFirstName = value[1];
                        if (studentFirstName == null) {
                            studentFirstName = '';
                        }
                        studentLastName = value[2];
                        if (studentLastName == null) {
                            studentLastName = '';
                        }
                        scoreId = value[3];
                        scoreDate = value[4];
                        scoreMark = value[5];
                        console.log(scoreMark);
                        if (scoreMark == null) {
                            scoreMark = '';
                        }
                        output += "<table class='table table-striped table-bordered table-hover'>";
                        outputHeader += "<tr><td>Student</td><td>" + scoreDate + "</td>";
                        outputBody += "<tr><td class='studentOnCourse cursor-pointer' name='" + studentId + "'>" + studentFirstName + " " + studentLastName + "</td>";
                        outputBody += "<td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td>";

                    }
                } else {
                    if (key != data.length - 1) {
                        if (studentId != studentIdCheck) {
                            if (appendHeader){
                                outputHeader += "</tr>";
                            }
                            appendHeader = false;
                            outputBody += "<td><button class='btn deleteCourseFromStudent' name='" + studentIdCheck + "'>Delete student</button></td></tr>";
                            studentIdCheck = value[0];
                            studentFirstName = value[1];
                            if (studentFirstName == null) {
                                studentFirstName = '';
                            }
                            studentLastName = value[2];
                            if (studentLastName == null) {
                                studentLastName = '';
                            }
                            scoreId = value[3];
                            scoreDate = value[4];
                            scoreMark = value[5];
                            console.log(scoreMark);
                            if (scoreMark == null) {
                                scoreMark = '';
                            }
                            outputBody += "<tr><td class='studentOnCourse cursor-pointer' name='" + studentId + "'>" + studentFirstName + " " + studentLastName + "</td>";
                            outputBody += "<td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td>";
                        } else {
                            studentIdCheck = value[0];
                            studentFirstName = value[1];
                            if (studentFirstName == null) {
                                studentFirstName = '';
                            }
                            studentLastName = value[2];
                            if (studentLastName == null) {
                                studentLastName = '';
                            }
                            scoreId = value[3];
                            scoreDate = value[4];
                            scoreMark = value[5];
                            if (scoreMark == null) {
                                scoreMark = '';
                            }
                            if (appendHeader){
                                outputHeader += "<td>" + scoreDate + "</td>";
                            }
                            outputBody += "<td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td>";
                        }
                    } else {
                        if (studentId != studentIdCheck) {
                            if (appendHeader){
                                outputHeader += "</tr>";
                            }
                            studentIdCheck = value[0];
                            studentFirstName = value[1];
                            if (studentFirstName == null) {
                                studentFirstName = '';
                            }
                            studentLastName = value[2];
                            if (studentLastName == null) {
                                studentLastName = '';
                            }
                            scoreId = value[3];
                            scoreDate = value[4];
                            scoreMark = value[5];
                            console.log(scoreMark);
                            if (scoreMark == null) {
                                scoreMark = '';
                            }
                            outputBody += "</tr><tr><td class='studentOnCourse cursor-pointer' name='" + studentId + "'>" + studentFirstName + " " + studentLastName + "</td>";
                            outputBody += "<td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td>";
                            outputBody += "<td><button class='btn deleteCourseFromStudent' name='" + studentIdCheck + "'>Delete student</button></td></tr></table>";
                            output += outputHeader + outputBody;
                            console.log(output);
                            $("#singleCourseStudents").append(output);
                        } else {
                            studentIdCheck = value[0];
                            studentFirstName = value[1];
                            if (studentFirstName == null) {
                                studentFirstName = '';
                            }
                            studentLastName = value[2];
                            if (studentLastName == null) {
                                studentLastName = '';
                            }
                            scoreId = value[3];
                            scoreDate = value[4];
                            scoreMark = value[5];
                            if (scoreMark == null) {
                                scoreMark = '';
                            }
                            if (appendHeader){
                                outputHeader += "<td>" + scoreDate + "</td></tr>";
                            }
                            outputBody += "<td class='setMarkClass cursor-pointer' name='" + scoreId + "'>" + scoreMark + "</td>";
                            outputBody += "<td><button class='btn deleteCourseFromStudent' name='" + studentIdCheck + "'>Delete student</button></td></tr></table>";
                            output += outputHeader + outputBody;
                            $("#singleCourseStudents").append(output);
                        }
                    }
                }
            }
        });

        $('.deleteCourseFromStudent').click(function () {
            var studentDeleteId = $(this).attr("name");
            console.log(studentDeleteId);

            $('#deleteCourseStudentOk').unbind();
            $('#deleteCourseStudentCancel').unbind();
            $("#deleteCourseStudentText").text("Delete course from student?");
            $('#deleteCourseStudentModal').show();

            $('#deleteCourseStudentOk').click(function () {
                var url = "http://localhost:8080/api/deleteScore?studentId=" + studentDeleteId + "&courseId=" + id;
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
                    url: "assets/components/singleCourse/SingleCourse.html"
                }).done(function (data) {
                    $("#singleStudentInfo").empty().append(data);
                    $.ajax({
                        url: "assets/components/singleCourse/SingleCourse.js"
                    }).done(function () {
                        getSingleCourse(id, courseName)
                    })
                });
            })

            $('#deleteCourseStudentCancel').click(function () {
                $('#deleteCourseStudentModal').hide();
            })
        })

        $('.studentOnCourse').click(function () {
            var studentId2 = $(this).attr("name");
            var studentName = $(this).text();
            console.log(studentId2);
            console.log(studentName);
            $.ajax({
                url: "assets/components/singleStudent/SingleStudent.html"
            }).done(function (data) {
                $("#singleStudentInfo").empty().append(data);
                $.ajax({
                    url: "assets/components/singleStudent/SingleStudent.js"
                }).done(function () {
                    getSingleStudent(studentId2, studentName)
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
                    url: "assets/components/singleCourse/SingleCourse.html"
                }).done(function (data) {
                    $("#singleStudentInfo").empty().append(data);
                    $.ajax({
                        url: "assets/components/singleCourse/SingleCourse.js"
                    }).done(function () {
                        getSingleCourse(id, courseName)
                    })
                });

            })

            $('#setMarkCancel').click(function () {
                $('#setMarkModal').hide();
            })

        })



    })

}