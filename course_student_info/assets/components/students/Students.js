getStudents();

function getStudents() {
    var perPage = parseInt(document.getElementById("pageElements").value);
    $table = $("#tableMain");
    var items;
    var filtertext = $('#searchId').val();

    $.getJSON("http://localhost:8080/api/getStudents", function (data) {
        var output = '';
        $.each(data, function (key, value) {
            console.log(value);
            output += "<tr class='resultRowClass filterTableMatch'>"
            output += "<td class='studentIdColumn'>" + value[0] + "</td>"
            output += "<td class='studentFirstNameColumn cursor-pointer'>" + value[1] + "</td>"
            output += "<td class='studentLastNameColumn'>" + value[2] + "</td>"
            output += "<td class='studentAgeColumn'>" + value[3] + "</td>"
            output += "<td class='studentPhoneColumn'>" + value[4] + "</td>"
            output += "<td class='studentMailColumn'>" + value[5] + "</td>"
            output += "<td class='deleteColumnclass'><button class=\"btn deleteStudentButton\">delete</button></td>"
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

            $('.deleteStudentButton').click(function () {
                $('#deleteStudentOk').unbind();
                $('#deleteStudentCancel').unbind();
                var studentId = $(this).closest('tr')[0].getElementsByClassName("studentIdColumn")[0].innerHTML;
                var studentFirstName = $(this).closest('tr')[0].getElementsByClassName("studentFirstNameColumn")[0].innerHTML;
                var studentLastName = $(this).closest('tr')[0].getElementsByClassName("studentLastNameColumn")[0].innerHTML;

                $("#deleteStudentText").text("Delete student " + studentId + " " + studentFirstName + " " + studentLastName + "?");

                $('#deleteStudentModal').show();
                $('#deleteStudentOk').click(function () {
                    var url = "http://localhost:8080/api/deleteStudent/" + studentId;
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
                            console.log("Success delete student");
                        },
                        error: function (errMsg) {
                            console.log("Error delete student");
                        }
                    });
                    $('#deleteStudentModal').hide();
                    $.ajax({
                        url: "assets/components/students/Students.html"
                    }).done(function (out) {
                        $("#content").empty().append(out);
                        $.ajax({
                            url: "assets/components/students/Students.js"
                        }).done
                    });
                });

                $('#deleteStudentCancel').click(function () {
                    $('#deleteStudentModal').hide();
                });
            });

            $('.studentFirstNameColumn').click(function () {
                var studentId2 = $(this).closest('tr')[0].getElementsByClassName("studentIdColumn")[0].innerHTML;
                var studentFirstName2 = $(this).closest('tr')[0].getElementsByClassName("studentFirstNameColumn")[0].innerHTML;
                var studentLastName2 = $(this).closest('tr')[0].getElementsByClassName("studentLastNameColumn")[0].innerHTML;
                var studentName2 = studentFirstName2+studentLastName2;
                $("#allStudentsInfo").hide();
                $.ajax({
                    url: "assets/components/singleStudent/SingleStudent.html"
                }).done(function (data) {
                    $("#singleStudentInfo").empty().append(data);
                    $.ajax({
                        url: "assets/components/singleStudent/SingleStudent.js"
                    }).done(function () {
                        getSingleStudent(studentId2, studentName2);
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
            var studentFirstName = value.getElementsByClassName("studentFirstnameColumn")[0].innerHTML;
            var studentLastName = value.getElementsByClassName("studentLastNameColumn")[0].innerHTML;
            var studentAge = value.getElementsByClassName("studentAgeColumn")[0].innerHTML;
            var studentPhone = value.getElementsByClassName("studentPhoneColumn")[0].innerHTML;
            var studentMail = value.getElementsByClassName("studentMailColumn")[0].innerHTML;
            if (studentFirstName.search(regexp) != -1 || studentLastName.search(regexp) != -1 || studentAge.search(regexp) != -1 ||
                studentPhone.search(regexp) != -1 || studentMail.search(regexp) != -1) {
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

    $('#addStudent').click(function () {
        $('#addStudentModal').show();
        $('#addStudentOk').unbind();
        $('#addStudentCancel').unbind();
        $('#addStudentOk').click(function () {
            var studentFirstNameField = $("#studentFirstNameField").val();
            var studentLastNameField = $("#studentLastNameField").val();
            var studentAgeField = $("#studentAgeField").val();
            var studentPhoneField = $("#studentPhoneField").val();
            var studentMailField = $("#studentMailField").val();
            var url = "http://localhost:8080/api/addStudent"
            var ajaxbody = "{\"firstName\":\"" + studentFirstNameField + "\",\"lastName\":\"" + studentLastNameField + "\",\"age\":" + studentAgeField +
                ",\"phone\":\"" + studentPhoneField + "\",\"mail\":\"" + studentMailField + "\"}";
            console.log(ajaxbody);
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
                    console.log("Success adding student");
                },
                error: function (errMsg) {
                    console.log("Error adding student");
                }
            });

            $("#studentFirstNameField").val('');
            $("#studentLastNameField").val('');
            $("#studentAgeField").val('');
            $("#studentPhoneField").val('');
            $("#studentMailField").val('');
            $('#addStudentModal').hide();
            $.ajax({
                url: "assets/components/students/Students.html"
            }).done(function (out) {
                $("#content").empty().append(out);
                $.ajax({
                    url: "assets/components/students/Students.js"
                }).done
            });
        });

        $('#addStudentCancel').click(function () {
            $("#studentFirstNameField").val('');
            $("#studentLastNameField").val('');
            $("#studentAgeField").val('');
            $("#studentPhoneField").val('');
            $("#studentMailField").val('');
            $('#addStudentModal').hide();
        });

    });
}