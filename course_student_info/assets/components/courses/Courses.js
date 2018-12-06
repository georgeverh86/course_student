var perPage = parseInt(document.getElementById("pageElements").value);
$table = $("#tableMain");
var items;
var filtertext = $('#searchId').val();

$.getJSON("http://localhost:8080/api/getCourses", function (data) {
    var output = '';
    $.each(data, function (key, value) {
        output += "<tr class='resultRowClass filterTableMatch'>"
        output += "<td class='courseIdColumn'>" + value[0] + "</td>"
        output += "<td class='courseNameColumn cursor-pointer'>" + value[1] + "</td>"
        output += "<td class='startDateColumn'>" + value[2] + "</td>"
        output += "<td class='endDateColumn'>" + value[3] + "</td>"
        output += "<td class='deleteColumnclass'><button class=\"btn deleteCourseButton\">delete</button></td>"
        output += "</tr>"
    })
    $('#tableBody').empty().append(output);
    $(document).ready(function () {
        $.tablesorter.addWidget({
            id: "zebraAll",
            format: function (table) {
                var $tr, row = -1,
                    odd;
                $("tr.filterTableMatch", table.tBodies[0]).each(function (i) {
                    $tr = $(this);
                    if (!$tr.hasClass(table.config.cssChildRow)) row++;
                    odd = (row % 2 == 0);
                    $tr.removeClass(
                        table.config.widgetZebra.css[odd ? 0 : 1]).addClass(
                        table.config.widgetZebra.css[odd ? 1 : 0])
                });
            }
        });
        $(function () {
            $table.tablesorter({
                widgets: ['zebraAll']
            });
            items = $("#tableMain tbody tr");
            numItems = items.length;
            $("#light-pagination").pagination({
                useAnchors: false,
                items: numItems,
                itemsOnPage: perPage,
                cssStyle: "light-theme",
                onPageClick: function (pageNumber) {
                    var showFrom = perPage * (pageNumber - 1);
                    var showTo = showFrom + perPage;
                    items.hide().slice(showFrom, showTo).show();
                },
                onInit: function () {
                    items.slice(perPage).hide();
                }
            });
        });

        $('.deleteCourseButton').click(function () {
            $('#deleteCourseOk').unbind();
            $('#deleteCourseCancel').unbind();
            var courseId = $(this).closest('tr')[0].getElementsByClassName("courseIdColumn")[0].innerHTML;
            var courseName = $(this).closest('tr')[0].getElementsByClassName("courseNameColumn")[0].innerHTML;
            var startDate = $(this).closest('tr')[0].getElementsByClassName("startDateColumn")[0].innerHTML;
            var endDate = $(this).closest('tr')[0].getElementsByClassName("endDateColumn")[0].innerHTML;

            $("#deleteCourseText").text("Delete course " + courseId + " " + courseName + " " + startDate + " " + endDate + "?");

            $('#deleteCourseModal').show();
            $('#deleteCourseOk').click(function () {
                var url = "http://localhost:8080/api/deleteCourse/" + courseId;
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
                        alert("Success delete course");
                    },
                    error: function (errMsg) {
                        alert("Error delete course");
                    }
                });
                $('#deleteCourseModal').hide();
                $.ajax({
                    url: "assets/components/courses/Courses.html"
                }).done(function (out) {
                    $("#content").empty().append(out);
                    $.ajax({
                        url: "assets/components/courses/Courses.js"
                    }).done
                });
            });

            $('#deleteCourseCancel').click(function () {
                $('#deleteCourseModal').hide();
            });
        });

        $('.courseNameColumn').click(function () {
            var courseId2 = $(this).closest('tr')[0].getElementsByClassName("courseIdColumn")[0].innerHTML;
            var courseNameColumn = $(this).closest('tr')[0].getElementsByClassName("courseNameColumn")[0].innerHTML;
            var startDateColumn = $(this).closest('tr')[0].getElementsByClassName("startDateColumn")[0].innerHTML;
            var endDateColumn = $(this).closest('tr')[0].getElementsByClassName("endDateColumn")[0].innerHTML;
            var courseName = courseNameColumn+" "+startDateColumn+" "+endDateColumn;
            $("#allStudentsInfo").hide();
            $.ajax({
                url: "assets/components/singleCourse/SingleCourse.html"
            }).done(function (data) {
                $("#singleStudentInfo").empty().append(data);
                $.ajax({
                    url: "assets/components/singleCourse/SingleCourse.js"
                }).done(function () {
                    getSingleCourse(courseId2, courseName)
                })
            });
        });
    });
});

$('#searchId').keyup(function () {
    filtertext = $('#searchId').val();
    var regexp = new RegExp(filtertext, 'i');
    var numberFilterRows = 0;

    $("#tableMain tbody tr").each(function (key, value) {
        var courseName = value.getElementsByClassName("courseNameColumn")[0].innerHTML;
        var startDate = value.getElementsByClassName("startDateColumn")[0].innerHTML;
        var endDate = value.getElementsByClassName("endDateColumn")[0].innerHTML;
        if (courseName.search(regexp) != -1 || startDate.search(regexp) != -1 || endDate.search(regexp) != -1) {
            $(this)[0].classList.add("filterTableMatch");
            if (numberFilterRows % 2 == 0) {
                $(this)[0].classList.remove("even");
                $(this)[0].classList.add("odd");
                numberFilterRows++;
            } else {
                $(this)[0].classList.remove("odd");
                $(this)[0].classList.add("even");
                numberFilterRows++;
            }
            $(this).show();
        } else {
            $(this)[0].classList.remove("filterTableMatch");
            $(this).hide();
        }
    });

    items = $("#tableMain tbody tr.filterTableMatch");
    numItems = items.length;
    // perPage = parseInt(document.getElementById("pageElements").value);
    $("#light-pagination").pagination({
        useAnchors: false,
        items: numItems,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        },
        onInit: function () {
            items.hide().slice(0, perPage).show();
        }
    });
});

$(document).on("sortEnd", function () {
    if (filtertext == '') {
        items = $("#tableMain tbody tr");
        numItems = items.length;
        var currentPageOld = $("#light-pagination").pagination('getCurrentPage');
        var startPage = perPage * (currentPageOld - 1);
        var endPage = startPage + perPage;
        $("#light-pagination").pagination({
            currentPage: currentPageOld,
            useAnchors: false,
            onInit: function () {
                items.hide().slice(startPage, endPage).show();
            },
            items: numItems,
            itemsOnPage: perPage,
            cssStyle: "light-theme",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            }
        });
    } else {
        items = $("#tableMain tbody tr.filterTableMatch");
        numItems = items.length;
        var currentPageOld = $("#light-pagination").pagination('getCurrentPage');
        var startPage = perPage * (currentPageOld - 1);
        var endPage = startPage + perPage;
        $("#light-pagination").pagination({
            currentPage: currentPageOld,
            useAnchors: false,
            onInit: function () {
                items.hide().slice(startPage, endPage).show();
            },
            items: numItems,
            itemsOnPage: perPage,
            cssStyle: "light-theme",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            }
        });
    }

});

document.getElementById("pageElements").onchange = function () {
    perPage = parseInt(document.getElementById("pageElements").value);
    if (filtertext == '') {
        items = $("#tableMain tbody tr");
        numItems = items.length;
        $("#light-pagination").pagination({
            useAnchors: false,
            items: numItems,
            itemsOnPage: perPage,
            cssStyle: "light-theme",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            },
            onInit: function () {
                items.hide().slice(0, perPage).show();
            }
        });
    } else {
        items = $("#tableMain tbody tr.filterTableMatch");
        numItems = items.length;
        $("#light-pagination").pagination({
            useAnchors: false,
            items: numItems,
            itemsOnPage: perPage,
            cssStyle: "light-theme",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            },
            onInit: function () {
                items.hide().slice(0, perPage).show();
            }
        });
    }
};

$('#addCourse').click(function () {
    $('#addCourseModal').show();
    $('#addCourseOk').unbind();
    $('#addCourseCancel').unbind();
    $('#addCourseOk').click(function () {
        var courseName = $("#courseNameField").val();
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var url = "http://localhost:8080/api/addCourse"
        var ajaxbody = "{\"name\":\"" + courseName + "\",\"startDate\":\"" + startDate + "\",\"endDate\":\"" + endDate +"\"}";
        $.ajax({
            type: "POST",
            url: url,
            accepts: {
                text: "application/json"
            },
            // The key needs to match your method's input parameter (case-sensitive).
            data: ajaxbody,
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            success: function (data) {
                alert("Success adding course");
            },
            error: function (errMsg) {
                alert("Error adding course");
            }
        });

        $("#courseName").val('');
        $("#startDate").val('');
        $("#endDate").val('');
        $('#addCourseModal').hide();
        $.ajax({
            url: "assets/components/courses/Courses.html"
        }).done(function (out) {
            $("#content").empty().append(out);
            $.ajax({
                url: "assets/components/courses/Courses.js"
            }).done
        });
    });

    $('#addCourseCancel').click(function () {
        $("#courseName").val('');
        $("#startDate").val('');
        $("#endDate").val('');
        $('#addCourseModal').hide();
    });

});