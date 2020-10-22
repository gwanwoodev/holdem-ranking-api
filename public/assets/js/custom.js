document.addEventListener("DOMContentLoaded", () => {
    let linkbanner1 = document.querySelector(".linkbanner1");
    let linkbanner2 = document.querySelector(".linkbanner2");
    let linkbanner3 = document.querySelector(".linkbanner3");
    let linkbanner4 = document.querySelector(".linkbanner4");
    let linkbanner5 = document.querySelector(".linkbanner5");

    let target1 = document.querySelector(".target1");
    let target2 = document.querySelector(".target2");
    let target3 = document.querySelector(".target3");
    let target4 = document.querySelector(".target4");
    let target5 = document.querySelector(".target5");

    let file1 = document.querySelector(".file1");
    let file2 = document.querySelector(".file2");
    let file3 = document.querySelector(".file3");
    let file4 = document.querySelector(".file4");
    let file5 = document.querySelector(".file5");

    let locate1, locate2, locate3, locate4, locate5 = "";


    target1.addEventListener("click", (event) => {
        locate1 = prompt("연결할 링크를 입력해주세요. EX)http://www.naver.com");
        if(!locate1) {
            event.preventDefault();
            return;
        }
        setTimeout(function(){}, 1000);
        file1.click();
    });

    target2.addEventListener("click", (event) => {
        locate2 = prompt("연결할 링크를 입력해주세요. EX)http://www.naver.com");
        if(!locate2) {
            event.preventDefault();
            return;
        }
        setTimeout(function(){}, 1000);
        file2.click();
    });

    target3.addEventListener("click", (event) => {
        locate3 = prompt("연결할 링크를 입력해주세요. EX)http://www.naver.com");
        if(!locate3) {
            event.preventDefault();
            return;
        }
        setTimeout(function(){}, 1000);
        file3.click();
    });

    target4.addEventListener("click", (event) => {
        locate4 = prompt("연결할 링크를 입력해주세요. EX)http://www.naver.com");
        if(!locate4) {
            event.preventDefault();
            return;
        }
        setTimeout(function(){}, 1000);
        file4.click();
    });

    target5.addEventListener("click", (event) => {
        locate5 = prompt("연결할 링크를 입력해주세요. EX)http://www.naver.com");
        if(!locate5) {
            event.preventDefault();
            return;
        }
        setTimeout(function(){}, 1000);
        file5.click();
    });

    file1.addEventListener("change", (evt) => {
        let file = file1.files;
        if(file.length === 0) {
            return;
        }else {
            const reader = new FileReader();
            reader.onload = () => {
                linkbanner1.src = reader.result;
            }

            if(file[0]) {
                reader.readAsDataURL(file[0]);
                updateLinkBanner(1, locate1, file[0]);

            }else {
                preview.src = "";
            }
        }
    });

    file2.addEventListener("change", (evt) => {
        let file = file2.files;
        if(file.length === 0) {
            return;
        }else {
            const reader = new FileReader();
            reader.onload = () => {
                linkbanner2.src = reader.result;
            }

            if(file[0]) {
                reader.readAsDataURL(file[0]);
                updateLinkBanner(2, locate2, file[0]);
            }else {
                preview.src = "";
            }
        }
    });
    
    file3.addEventListener("change", (evt) => {
        let file = file3.files;
        if(file.length === 0) {
            return;
        }else {
            const reader = new FileReader();
            reader.onload = () => {
                linkbanner3.src = reader.result;
            }

            if(file[0]) {
                reader.readAsDataURL(file[0]);
                updateLinkBanner(3, locate3, file[0]);
            }else {
                preview.src = "";
            }
        }
    });
    
    file4.addEventListener("change", (evt) => {
        let file = file4.files;
        if(file.length === 0) {
            return;
        }else {
            const reader = new FileReader();
            reader.onload = () => {
                linkbanner4.src = reader.result;
            }

            if(file[0]) {
                reader.readAsDataURL(file[0]);
                updateLinkBanner(4, locate4, file[0]);
            }else {
                preview.src = "";
            }
        }
    });
    
    file5.addEventListener("change", (evt) => {
        let file = file5.files;
        if(file.length === 0) {
            return;
        }else {
            const reader = new FileReader();
            reader.onload = () => {
                linkbanner5.src = reader.result;
            }

            if(file[0]) {
                reader.readAsDataURL(file[0]);
                updateLinkBanner(5, locate5, file[0]);
            }else {
                preview.src = "";
            }
        }
    });

    const updateLinkBanner = async (target, locate, file) => {
        let formData = new FormData();
        formData.append("target", target);
        formData.append("locate", locate);
        formData.append("linkbanner", file);

        let response = await fetch("/api/links", {
            method: "POST",
            body: formData
        });
    }

    /* users */
    let userTableBody = document.querySelector("tbody");

    let userDeleteButtons = Array.from(document.querySelectorAll(".userDeleteButton"));
    userDeleteButtons.forEach(function(item) {
        item.addEventListener("click", async function() {

            if(confirm("삭제하시겠습니까?")) {
                deleteUser(item.value);
                item.parentElement.parentElement.remove();
            }
        })
    })

    const deleteUser = async (idx) => {
        let formData = new FormData();
        formData.append("idx", idx);
        let response = await fetch(`/api/user/${idx}?_method=DELETE`, {
            method: "POST",
            body: formData
        });
    }

    let userSearchButton = document.querySelector(".userSearchButton");
    userSearchButton.addEventListener("click", (evt) => {
        let userSearchInput = document.querySelector(".userSearchInput")
        if(!userSearchInput.value) {
            alert("이름을 입력해주세요");
            return;
        }
        searchUser(userSearchInput.value);
    })

    let customTable = document.querySelector(".customTable");

    const searchUser = async (value) => {

        let response = await fetch(`/api/search/${value}`);
        let responseJson = await response.json();
        userTableBody.remove();
        let newTableBody = document.querySelector(".newTableBody");
        if(newTableBody) newTableBody.remove();
        let newTable = document.createElement("tbody");
        newTable.classList.add("newTableBody");
        customTable.appendChild(newTable);
        
        for(let i=0; i<responseJson.data.length; i++) {
            insertNewUser(responseJson.data[i].idx, responseJson.data[i].rank, responseJson.data[i].name, responseJson.data[i].age, responseJson.data[i].totalMoney, newTable);
        }

        
    }

    const insertNewUser = (idx, rank, name, age, totalMoney, newTable) => {
        let tr = document.createElement("tr");
        let rankTd = document.createElement("td");
        let nameTd = document.createElement("td");
        let ageTd = document.createElement("td");
        let moneyTd = document.createElement("td");
        let updateBtnTd = document.createElement("td");
        let updateButton = document.createElement("button");
        let deleteBtnTd = document.createElement("td");
        let deleteButton = document.createElement("button");

        updateButton.classList.add("btn", "btn-primary", "btn-sm", "userImportButton");
        deleteButton.classList.add("btn", "btn-primary", "btn-sm", "userDeleteButton");

        updateButton.value = idx;
        deleteButton.value = idx;
        updateButton.innerText= "수정";
        deleteButton.innerText = "삭제";

        deleteButton.addEventListener("click", function(evt) {
            if(confirm("삭제하시겠습니까?")) {
                deleteUser(this.value);
                this.parentElement.parentElement.remove();
            }
        })

        updateButton.addEventListener("click", async function() {
            let res = await fetch(`http://localhost:4000/api/user/${this.value}`);
            let json = await res.json();
            let data = json.data;

            importUpdateForms(data.idx, data.name, data.rank, data.age, data.location, data.profile, data.records);            
        });

        updateBtnTd.appendChild(updateButton);
        deleteBtnTd.appendChild(deleteButton);

        rankTd.innerText = `${rank}st`;
        nameTd.innerText = name;
        ageTd.innerText = age;
        moneyTd.innerText = `${numberWithCommas(totalMoney)} KRW`;

        tr.appendChild(rankTd);
        tr.appendChild(nameTd);
        tr.appendChild(ageTd);
        tr.appendChild(moneyTd);
        tr.appendChild(updateBtnTd);
        tr.appendChild(deleteBtnTd);

        newTable.appendChild(tr);
        
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let recordButton = document.querySelector(".recordButton");
    recordButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        let recordWrapper = document.querySelector(".recordWrapper");
        let html = `
        <hr/>
        <div class="form-group label-floating is-empty">
            <label class="control-label">수상연도(EX: 2019)</label>
            <input type="text" class="form-control" name="year"/>
            <span class="material-input"></span>
        </div>
        <div class="form-group label-floating is-empty">
            <label class="control-label">대회이름(EX: 계룡 포커대회)</label>
            <input type="text" class="form-control" name="rally"/>
            <span class="material-input"></span>
        </div>
        <div class="form-group label-floating is-empty">
            <label class="control-label">순위(EX: 1)</label>
            <input type="text" class="form-control" name="record"/>
            <span class="material-input"></span>
        </div>
        <div class="form-group label-floating is-empty">
            <label class="control-label">상금(EX: 5000)</label>
            <input type="text" class="form-control" name="money"/>
            <span class="material-input"></span>
        </div>                                           
        `;

        $(".recordWrapper").append(html);
        // recordWrapper.innerHTML = recordWrapper.innerHTML + html;
    });

    let userAddButton = document.querySelector(".userAddButton");

    
    userAddButton.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let formData = new FormData();
        let userProfile = document.querySelector("#userForm input[name=profile]").files[0];
        let userName = document.querySelector("#userForm input[name=name]").value;
        let userRank = document.querySelector("#userForm input[name=rank]").value;
        let userAge = document.querySelector("#userForm input[name=age]").value;
        let userLocation = document.querySelector("#userForm input[name=location]").value;

        let years = Array.from(document.querySelectorAll(".recordWrapper input[name=year]"));
        let rallys = Array.from(document.querySelectorAll(".recordWrapper input[name=rally]"));
        let records = Array.from(document.querySelectorAll(".recordWrapper input[name=record"));
        let moneys = Array.from(document.querySelectorAll(".recordWrapper input[name=money]"));
        let userRecords = [];

        if(!userName || !userRank || !userAge || !userLocation || !userProfile) {
            alert("빈 정보를 입력해주세요.");
            return;
        }

        for(let i=0; i<years.length; i++) {
            if(!years[i].value || !rallys[i].value || !records[i].value || !moneys[i].value) {
                alert("빈 정보를 입력해주세요");
                return;
            }
            let userRecord = {
                year: Number(years[i].value),
                rally: rallys[i].value,
                record: Number(records[i].value),
                money: Number(moneys[i].value)
            };
            userRecords.push(userRecord);
        }

        formData.append("name", userName);
        formData.append("rank", userRank);
        formData.append("age", userAge);
        formData.append("location", userLocation);
        formData.append("profile", userProfile);
        formData.append("records", JSON.stringify(userRecords));

        let response = await fetch("http://localhost:4000/api/user", {
            method: "POST",
            body: formData
        });

        let responseJson = await response.json();

        if(responseJson.status === 200) {
            alert("유저 생성이 완료 되었습니다.");
            location.href ="/dash";
        }

    });

    let userImportButtons = Array.from(document.querySelectorAll(".userImportButton"));

    for(let i=0; i<userImportButtons.length; i++) {
        userImportButtons[i].addEventListener("click", async function() {
            let res = await fetch(`http://localhost:4000/api/user/${this.value}`);
            let json = await res.json();
            let data = json.data;

            importUpdateForms(data.idx, data.name, data.rank, data.age, data.location, data.profile, data.records);
        });
    }

    const importUpdateForms = (idx, name, rank, age, location, profile, records) => {
        let nameField = document.querySelector("#userUpdateForm input[name=name]");
        let rankField = document.querySelector("#userUpdateForm input[name=rank]");
        let ageField = document.querySelector("#userUpdateForm input[name=age]");
        let locationField = document.querySelector("#userUpdateForm input[name=location]");
        let imageField = document.querySelector("#userUpdateForm .updateImageField");
        let recordWrapper = document.querySelector("#userUpdateForm .recordWrapper");

        rankField.parentElement.classList.remove("is-empty");
        nameField.parentElement.classList.remove("is-empty");
        ageField.parentElement.classList.remove("is-empty");
        locationField.parentElement.classList.remove("is-empty");

        nameField.value = name;
        rankField.value = rank;
        ageField.value = age;
        locationField.value = location;
        imageField.src = profile;

        $("#userUpdateForm .recordWrapper").html("");


        for(let i=0; i<records.length; i++) {
            let html = `
            <hr/>
            <div class="form-group label-floating">
                <label class="control-label">수상연도(EX: 2019)</label>
                <input type="text" name="year" class="form-control" value='${records[i].year}'/>
                <span class="material-input"></span>
            </div>
            <div class="form-group label-floating">
                <label class="control-label">대회이름(EX: 계룡포커대회)</label>
                <input type="text" name="rally" class="form-control" value='${records[i].rally}'/>
                <span class="material-input"></span>
            </div>
            <div class="form-group label-floating">
                <label class="control-label">순위(EX: 1)</label>
                <input type="text" name="record" class="form-control" value='${records[i].record}'/>
                <span class="material-input"></span>
            </div>
            <div class="form-group label-floating">
                <label class="control-label">상금(EX: 5000)</label>
                <input type="text" name="money" class="form-control" value='${records[i].money}'/>
                <span class="material-input"></span>
            </div>                                    
            `;

            $("#userUpdateForm .recordWrapper").append(html);

        }

        document.querySelector(".userUpdateButton").value = idx;

    }

    let userUpdateButton = document.querySelector(".userUpdateButton");
    userUpdateButton.addEventListener("click", async function() {
        let formData = new FormData();
        let userProfile = document.querySelector("#userUpdateForm input[name=profile]").files[0];
        let userName = document.querySelector("#userUpdateForm input[name=name]").value;
        let userRank = document.querySelector("#userUpdateForm input[name=rank]").value;
        let userAge = document.querySelector("#userUpdateForm input[name=age]").value;
        let userLocation = document.querySelector("#userUpdateForm input[name=location]").value;
        let updateImageField = document.querySelector("#userUpdateForm .updateImageField").src;
        let parseImageSrc = updateImageField.split("http://localhost:4000/")[1];

        let years = Array.from(document.querySelectorAll("#userUpdateForm .recordWrapper input[name=year]"));
        let rallys = Array.from(document.querySelectorAll("#userUpdateForm .recordWrapper input[name=rally]"));
        let records = Array.from(document.querySelectorAll("#userUpdateForm .recordWrapper input[name=record"));
        let moneys = Array.from(document.querySelectorAll("#userUpdateForm .recordWrapper input[name=money]"));
        let userRecords = [];

        if(!userName || !userRank || !userAge || !userLocation) {
            alert("빈 정보를 입력해주세요.");
            return;
        }

        for(let i=0; i<years.length; i++) {
            if(!years[i].value || !rallys[i].value || !records[i].value || !moneys[i].value) {
                alert("빈 정보를 입력해주세요");
                return;
            }
            let userRecord = {
                year: Number(years[i].value),
                rally: rallys[i].value,
                record: Number(records[i].value),
                money: Number(moneys[i].value)
            };
            userRecords.push(userRecord);
        }

        if(!userProfile) {
            userProfile = `/${parseImageSrc}`;
        }

        formData.append("idx", this.value);
        formData.append("name", userName);
        formData.append("rank", userRank);
        formData.append("age", userAge);
        formData.append("location", userLocation);
        formData.append("profile", userProfile);
        formData.append("records", JSON.stringify(userRecords));

        let response = await fetch("http://localhost:4000/api/user?_method=PUT", {
            method: "POST",
            body: formData
        });

        let responseJson = await response.json();

        if(responseJson.status === 200) {
            alert("유저 업데이트가 완료 되었습니다.");
            location.href ="/dash";
        }
    })
});