var i = 1, arr = [], phonearr = [], mailarr = [];
document.querySelector("#edit").style.visibility = "hidden";
document.querySelector("#add").style.visibility = "visible";
document.querySelector(".div2").style.visibility = "hidden";
function verif(event) {
    event.preventDefault();
    var fname = document.querySelector("#fname");
    var lname = document.querySelector("#lname");
    var mail = document.querySelector("#email");
    var num = document.querySelector("#mnum");
    if ((fname.value == '')) {
        fname.focus();
        fname.style.background = "red";
        document.querySelector('.error').innerHTML = "Please enter your first name ";
        // return false;
        fnameverify = false;
    }
    else {
        fname.style.background = "";
        document.querySelector('.error').innerHTML = "";
        fnameverify = true;
    }
    if ((lname.value == '')) {
        lname.focus();
        lname.style.background = "red";
        document.querySelector('.error').innerHTML = "'Please enter your last name ";
        // return false;
        lnameverify = false;
    }
    else {
        lname.style.background = "";
        document.querySelector('.error').innerHTML = "";
        lnameverify = true;
    }

    var regexmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/;
    if ((mail.value == "")) {
        mail.focus();
        mail.style.background = "red";
        document.querySelector('#alertMail').innerHTML = "Please enter your Email ";
        // return false;
        mailverify = false;
    }
    else if (!regexmail.test(mail.value)) {
        mail.focus();
        mail.style.background = "red";
        document.querySelector('#alertMail').innerHTML = "Email is not valid";
        // return false;
        mailverify = false;
    }
    else {
        mail.style.background = "";
        document.querySelector('#alertMail').innerHTML = "";
        if (mailarr.includes(mail.value)) {
            document.querySelector('#alertMail').innerHTML = "This address mail is already exists, please try another";
            mailverify = false;
        }
        else {
            document.querySelector('#alertMail').innerHTML = "";
            mailverify = true;
        }
    }
    var regexphone = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if ((num.value == "")) {
        num.focus();
        num.style.background = "red";
        document.querySelector('#alertNum').innerHTML = "Please enter your Phone number";
        // return false;
        phoneverify = false;
    }
    else if (!regexphone.test(num.value)) {
        num.focus();
        num.style.background = "red";
        document.querySelector('#alertNum').innerHTML = "phone num is not valid";
        // return false;
        phoneverify = false;
    }
    else {
        num.style.background = "";
        document.querySelector('#alertNum').innerHTML = "";
        if (phonearr.includes(num.value)) {
            document.querySelector('#alertNum').innerHTML = "This number is already exists, please try another";
            phoneverify = false;
        }
        else {
            document.querySelector('#alertNum').innerHTML = "";
            phoneverify = true;
        }
    }
    if (fnameverify && lnameverify && mailverify && phoneverify) {
        mailarr.push(mail.value);
        phonearr.push(num.value);
        document.querySelector(".div2").style.visibility = "visible";
        add(fname, lname, mail, num);
    }
}
function add(fname, lname, mail, num) {
    var tr = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cell4 = document.createElement("td");
    var cell5 = document.createElement("td");
    var cell6 = document.createElement("td");

    var cell7 = document.createElement("td");
    var cellText1 = document.createTextNode(i);
    var cellText2 = document.createTextNode(fname.value);
    var cellText3 = document.createTextNode(lname.value);
    var cellText4 = document.createTextNode(mail.value);
    var cellText5 = document.createTextNode(num.value);
    var cellText6 = document.createTextNode("Edit");
    var cellText7 = document.createTextNode("Delete");
    cell1.appendChild(cellText1);
    cell2.appendChild(cellText2);
    cell3.appendChild(cellText3);
    cell4.appendChild(cellText4);
    cell5.appendChild(cellText5);
    cell6.appendChild(cellText6);
    cell7.appendChild(cellText7);
    tr.appendChild(cell1);
    tr.appendChild(cell2);
    tr.appendChild(cell3);
    tr.appendChild(cell4);
    tr.appendChild(cell5);
    tr.appendChild(cell6);
    cell6.classList.add("edit");
    cell7.classList.add("delete");
    tr.appendChild(cell7);
    document.getElementById("tbl").appendChild(tr);
    i++;
    document.getElementById("myform").reset();

    document.querySelectorAll(".edit").forEach(element => {
        element.addEventListener('click', function () {
            var parent = this.parentNode;
            // console.log(parent);
            this.parentNode.classList.remove("active");
            this.parentNode.classList.add("active");
            fname.value = this.parentNode.childNodes[1].textContent;
            lname.value = this.parentNode.childNodes[2].textContent;
            mail.value = this.parentNode.childNodes[3].textContent;
            num.value = this.parentNode.childNodes[4].textContent;
            document.querySelector("#edit").style.visibility = "visible";
            document.querySelector("#add").style.visibility = "hidden";
            document.querySelector("#edit").addEventListener("click", function (event) {
                event.preventDefault();
                document.querySelector(".active").childNodes[1].textContent = fname.value;
                document.querySelector(".active").childNodes[2].textContent = lname.value;
                document.querySelector(".active").childNodes[3].textContent = mail.value;
                document.querySelector(".active").childNodes[4].textContent = num.value;
                parent.classList.remove("active");
                document.querySelector("#edit").style.visibility = "hidden";
                document.querySelector("#add").style.visibility = "visible";
                // document.getElementById("myform").reset();
            });

        });
    });
    document.querySelectorAll(".delete").forEach(el => {
        el.addEventListener('click', function () {
            var msgcon = confirm("you want to delete this?");
            if (msgcon) {
                var parent = this.parentNode;
                var tblbdy = parent.parentNode;
                var mailtodelete = parent.childNodes[3].textContent;
                var numtodelete = parent.childNodes[4].textContent;
                for (var index = 0; index < mailarr.length; index++) {
                    if (mailarr[index] == mailtodelete)
                        mailarr.splice(index, 1);
                }
                for (var index = 0; index < phonearr.length; index++) {
                    if (phonearr[index] == numtodelete)
                        phonearr.splice(index, 1);
                }
                parent.remove();
                console.log(tblbdy.childNodes[0].childNodes[0].textContent);
                console.log(tblbdy.childNodes.length);

                for (var k = 0, j = 1; k < tblbdy.childNodes.length; k++) {
                    tblbdy.childNodes[k].childNodes[0].textContent = j;
                    j++;
                }
                i = j;
            }
        });
    });

}


