
       /*     setTimeout(function () {
                if (sessionStorage.visited == undefined) {
                    var jsondata = [{
                        "numberofAdults": "2",
                        "noOfChildren": "0",
                        "childrenages": "0,0"
                }];
                    $("#roomarray").val('' + JSON.stringify(jsondata) + '');
                    $("#selectRooms").val(room_adult_child);
                     alert("hhhhhhhh");
                   
                } 
                else {
                    $("#roomarray").val(JSON.stringify(read_cookie('roomsdataforpopup')));
                    var roomTotal = read_cookie('roomsTotal');
                    $("#selectRooms").val(roomTotal);
                    
                }
            }, 500)
*/
            function showOptions(thisVal) {
                var optselected = $(thisVal).find("option:selected").val();
                $('#row1').show();
                /*f(optselected=="Select More Rooms") {*/
                $('#myModal').modal('toggle');

                roomsdata(thisVal);
                /*}*/
            }
            /* code to show add more room code */


            function roomsdata(thisVal) {
                var roomdataobj = read_cookie('roomsdataforpopup'); //for second modify search data should already be present in popup.	
                var jsondata = $("#" + thisVal.id).next('input').val();
                var jsondata = JSON.parse(jsondata);
                var selectednoOfChild = 0,
                    adultSelection = 0,
                    ages = 0,
                    j = 1,
                    m = 1,
                    checkform = $(thisVal).parents('.hotelSearchform').attr('id'),
                    roomData = [];
                // Done
                if (jsondata != "") {
                    $(".textboxes").html('');
                    for (var i = 1; i <= jsondata.length; i++) {
                        if (i < 9) {
                           $(".textboxes").append("<div class='row rowdata trvlrInfoDv'><div class='col-md-12 col-xs-12 p-0'><div class='room_1 roomHdr '><div class='roomName' id='rowdata'><label></label></div><div class=' btn-remove roomico ' onclick='remove_room(this);' id='btnEdit1_" + i + "' ><span class='editForm '><i class='fas fa-times'></i></span></div><span class='roomico' onclick='edit_room(this);' id='btnEdit_" + i + "' class='toggleBtn' ><a href='javascript:void(0);' class='editForm'><i class='fas fa-pencil-alt'></i></a></span></div></div><div class='traveller-div  col-md-12 col-xs-12 p-0' id='row" + i + "'> <div class=' form-group travlrFld'><label class='e_label'>" + txt_adult + " " +
                        "</label><select onchange='select_adults(this);' class='numberofAdults  form-control show-menu-arrow' ><option selected='selected'>1</option>" +
                        "<option>2</option>" +
                        "<option>3</option>" + "<option>4</option>" + "<option>5</option>" + "<option>6</option>" +
                        "</select><span class='arrow_icon'></span></div>" +
                        "<div class='travlrFld'><div class=''><label class='e_label'>" + txt_child + " </label><select class='dropdownchild  form-control show-menu-arrow' onchange='select_child(this);'><option>0</option><option>1</option>" +
                        "<option>2</option>" +
                        "<option>3</option>" +
                        "</select><span class='arrow_icon'></span></div></div><div class='childages '></div></div></div>");
                        }

                        m = 0;
                        $(".textboxes .rowdata").each(function () {
                            m++;
                            if (m == 9) {
                                //alert("Wait only 5 rooms can be selected");
                                return false;
                            } else {
                                //$(this).attr("id","row"+m);
                                $(this).find('.numberofAdults').attr("id", "numberofAdults" + m);
                                $(this).find('.dropdownchild').attr("id", "noOfChilds" + m);
                                $(this).find('.childages').attr("id", "childages" + m);
                                $(this).find("#rowdata").find("label").text(room_txt + m);
                            }
                        });
                    }
                    $("select.numberofAdults").each(function () {
                        for (var i = 1; i <= jsondata.length; i++) {
                            $('#numberofAdults' + i).val(jsondata[i - 1]["numberofAdults"]);

                            $('#noOfChilds' + i).val(jsondata[i - 1]["noOfChildren"]);

                        }
                    });
                    $("select.dropdownchild").each(function () {
                        var childRowId = $(this).attr("id");
                        childRowId = childRowId.split("noOfChilds")[1];
                        var childCnt = $(".dropdownofages").length;
                        var currentInd = $('option:selected', $("#noOfChilds" + childRowId)).index();
                        var childOptLen = $("#noOfChilds" + childRowId).find("option").length;

                        if (currentInd < childOptLen) {
                            for (var k = 0; k < currentInd; k++) {
                                if ($("#childages" + childRowId).find("#pick" + k).length > 0) {
                                    if (currentInd < childCnt) {
                                        $("#childages" + childRowId).find("#pick" + (currentInd - 1)).parent().nextAll(".childagecont").remove();
                                    }
                                } else {
                                    $("#childages" + childRowId).append('<div class="childagecont travlrFld form-group" style="width:30%; float:left;"><label class="e_label">' + txt_child + ' ' + parseInt(k + 1) + '</label><select class = "dropdownofages  form-control show-menu-arrow ages' + k + childRowId + '" id="pick' + k + '" onchange="age_selected(this)"><option>0</option><option>1</option><option>2</option><option>3</option></select><span class="arrow_icon"></span></div>');

                                }
                            }
                            for (var a = 0; a <= childRowId; a++) {
                                demo(childRowId);
                            }
                        }

                    });

                    setTimeout(function () {
                        for (var i = 1; i <= jsondata.length; i++) {
                            if (jsondata[i - 1]["childrenages"] != undefined) {
                                var data = jsondata[i - 1]["childrenages"].split(",");
                                for (var j = 0; j < data.length; j++) {
                                    $("#childages" + i).find("#pick" + j).val(data[j]);

                                }
                            }
                        }
                    }, 1000);
                }
            }




            function bake_cookie(name, value) {
                var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
                document.cookie = cookie;
                sessionStorage.setItem('visited', '1');
            }

            function read_cookie(name) {
                var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
                result && (result = JSON.parse(result[1]));
                return result;
            }

            function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }
            // Done
            function add_rooms() {
                $(".traveller-div").slideUp();
                var i = $(".textboxes .rowdata").length + 1;
                console.log(i);
                if ($(".textboxes .rowdata").length < 8) {
                   $(".textboxes").append("<div class='row rowdata trvlrInfoDv'><div class='col-md-12 col-xs-12 p-0'><div class='room_1 roomHdr '><div class='roomName' id='rowdata'><label></label></div><div class=' btn-remove roomico ' onclick='remove_room(this);' id='btnEdit1_" + i + "' ><span class='editForm '><i class='fas fa-times'></i></span></div><span class='roomico' onclick='edit_room(this);' id='btnEdit_" + i + "' class='toggleBtn' ><a href='javascript:void(0);' class='editForm'><i class='fas fa-pencil-alt'></i></a></span></div></div><div class='traveller-div  col-md-12 col-xs-12 p-0' id='row" + i + "'> <div class=' form-group travlrFld'><label class='e_label'>" + txt_adult + " " +
                        "</label><select onchange='select_adults(this);' class='numberofAdults  form-control show-menu-arrow' ><option selected='selected'>1</option>" +
                        "<option>2</option>" +
                        "<option>3</option>" + "<option>4</option>" + "<option>5</option>" + "<option>6</option>" +
                        "</select><span class='arrow_icon'></span></div>" +
                        "<div class='travlrFld'><div class=''><label class='e_label'>" + txt_child + " </label><select class='dropdownchild  form-control show-menu-arrow' onchange='select_child(this);'><option>0</option><option>1</option>" +
                        "<option>2</option>" +
                        "<option>3</option>" +
                        "</select><span class='arrow_icon'></span></div></div><div class='childages '></div></div></div>");

                    $("#row" + i).slideDown();
                } else {
                    alert("Wait only 8 rooms can be selected");
                    return false;
                }


                var m = 0;
                $(".textboxes .rowdata").each(function () {
                    m++;
                    if ($(".textboxes .rowdata").length < 9) {
                        //$(this).attr("id","row"+m);
                        $(this).find('.numberofAdults').attr("id", "numberofAdults" + m)
                        $(this).find('.fa-minus').addClass("close" + m)
                        $(this).find('.dropdownchild').attr("id", "noOfChilds" + m);
                        $(this).find('.childages').attr("id", "childages" + m);
                        $(this).find("#rowdata").find("label").text(room_txt + m);
                    }
                });

            };

            function demo(k) {
                a = parseInt(k);
                $("select.dropdownofages").each(function (index) {
                    $('select.ages' + parseInt(index) + '' + a).find('option').remove().end();
                    for (i = 0; i <= 17; i++) {
                        $('select.ages' + parseInt(index) + a).append($('<option>', {
                            value: [i],
                            text: [i]
                        }));
                    };

                });
            };
            // Done
            function submit_rooms() {
                var emptyVal = 0,
                    roomData = [],
                    totalAdults = 0,
                    totalChildren = 0;
                $('.table').empty()
                $(".rowdata").each(function () {
                    if ($(this).find("select.numberofAdults").val() == 0) {
                        alert("Please select adults");
                        emptyVal = 1;
                        return false;
                    } else {
                        var x = {};
                        var childrenages = [];
                        var childages = "";
                        $(this).find("select.numberofAdults").each(function () {
                            x.numberofAdults = $(this).val();
                            totalAdults += parseInt($(this).val(), 10);
                        });
                        $(this).find("select.dropdownchild").each(function () {
                            x.noOfChildren = $(this).val();
                            totalChildren += parseInt($(this).val(), 10);
                        });
                        $(this).find("select.dropdownofages").each(function () {
                            childrenages.push($(this).val());
                            var s = childrenages.join(',');
                            x.childrenages = s;
                        });
                        roomData.push(x);
                        emptyVal = 0;
                    }
                });
                if (roomData["childrenages"] == undefined) {
                    $('.add-room-text').attr("xmlData", JSON.stringify(roomData));
                } else {
                    $('.add-room-text').attr("xmlData", JSON.stringify(roomData));
                }

                var end_string = roomData.length > 1 ? "(s)" : "";
                $('#selectRooms').val(roomData.length + room_txt + end_string + "," + totalAdults + txt_adult + end_string + "  " + totalChildren + txt_child);
                $(".roomCount").html(roomData.length);
                $(".adultCount").html(totalAdults);
                $(".childCount").html(totalChildren);
                $("#roomarray").val(JSON.stringify(roomData));
                bake_cookie("roomsdataforpopup", roomData);
                bake_cookie("roomsTotal", $("#selectRooms").val());
                $(".roomsInfo").show();
                $("[aria-label='Close']").trigger("click");
                flag_submit = true;

            }

            function remove_room(that) {
                var rowId = $(that).attr("id").split("_")[1];

                var j = 1;
                $("#row" + rowId).parents('.rowdata').remove();
                var m = 0;
                $(".textboxes .rowdata").each(function () {
                    m++;
                    if ($(".textboxes .rowdata").length < 9) {
                        $(this).find('.numberofAdults').attr("id", "numberofAdults" + m)
                        $(this).find('.fa-minus').addClass("close" + m)
                        $(this).find('.dropdownchild').attr("id", "noOfChilds" + m);
                        $(this).find('.childages').attr("id", "childages" + m);
                        $(this).find("#rowdata").find("label").text("Room " + m);
                    }
                });
            }

            function edit_room(e) {
                $(".traveller-div").slideUp();
                var id = '';
                if ($($("#row" + e.id.split("_")[1])).is(':visible')) {
                    $("#row" + e.id.split("_")[1]).slideUp();
                } else {

                    $("#row" + e.id.split("_")[1]).slideDown();
                }
                id = e.id.split("_")[1];
                //$("#row"+id).slideDown();
            }


            function select_adults(that) {
                var rowId = $(that).parents(".row").attr("id");
                rowId = rowId.split("row")[1];
                var id = rowId;
                $('.table').html("");
                if ($('#numberofAdults' + (id - 1)).val() == 0) {
                    alert("Please select upper adults first");
                    $('#numberofAdults' + id).val("0");
                    $('#numberofAdults' + id).closest(".btn-group").find(".btn").find(".filter-option").text("0");
                }
            }

            function select_child(that) {
                var childRowId = $(that).attr("id");
                childRowId = childRowId.split("noOfChilds")[1];
                var childCnt = $(".dropdownofages").length;
                var currentInd = $('option:selected', $("#noOfChilds" + childRowId)).index();
                var childOptLen = $("#noOfChilds" + childRowId).find("option").length;
                if (currentInd < childOptLen) {
                    for (var k = 0; k < currentInd; k++) {
                        if ($("#childages" + childRowId).find("#pick" + k).length > 0) {
                            if (currentInd < childCnt) {
                                $("#childages" + childRowId).find("#pick" + (currentInd - 1)).parent().nextAll(".childagecont").remove();

                            }
                        } else {
                            $("#childages" + childRowId).append('<div class="childagecont travlrFld form-group" style="width:30%; float:left;"><label class="e_label">' + txt_child + ' ' + parseInt(k + 1) + '</label><select class = "dropdownofages  form-control show-menu-arrow ages' + k + childRowId + '" id="pick' + k + '" onchange="age_selected(this)"><option>0</option><option>1</option><option>2</option><option>3</option></select><span class="arrow_icon"></span></div>');

                        }
                    }
                }
                if (currentInd == 0) {
                    $("#childages" + childRowId).find(".childagecont").remove();
                }
                demo(childRowId);
            }

            function age_selected(element) {
                $("#" + element.id).removeClass("ages" + element.id.split('pick').join(''));
            }


            $(function () {
                addRooms(1);
            });

            $(".travell_box").hide();
            $(".travell_input").click(function () {
                $(".travell_box").toggle();
            });

            function done_rooms() {
                $('.travell_box').slideUp();
            }

            $("#close_box,#submit").click(function () {
                $(".travell_box").hide();
            });
            $(function () {
                addRooms(1);
            });
            $(".traveller_textbox").click(function () {
                if (!$("#traveller_box").is(':visible')) {
                    $("#traveller_box").slideDown("fast");
                }
            });
            $(".traveller_textbox").click(function () {
                if (!$("#traveller_box").is(':visible')) {
                    $("#traveller_box").slideDown("fast");
                }
            });
            $(".custom_close").click(function () {
                $("#traveller_box").slideToggle("fast");
            });
// A $( document ).ready() block.
