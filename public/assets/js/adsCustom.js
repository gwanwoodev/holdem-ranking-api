document.addEventListener("DOMContentLoaded", (evt) => {
    let adsSearchButton = document.querySelector(".adsSearchButton");
    let searchTableBody = document.querySelector("tbody");
    let customTable = document.querySelector(".customTable");

    adsSearchButton.addEventListener("click", (evt) => {
        let adsSearchInput = document.querySelector(".adsSearchInput");
        if(!adsSearchInput.value) {
            alert("이름을 입력해주세요");
            return;
        }
        searchAds(adsSearchInput.value);
    });

    const searchAds = async (value) => {
        let response = await fetch(`/api/search/ads/${value}`);
        let responseJson = await response.json();
        searchTableBody.remove();
        let newTableBody = document.querySelector(".newTableBody");
        if(newTableBody) newTableBody.remove();
        let newTable = document.createElement("tbody");
        newTable.classList.add("newTableBody");
        customTable.appendChild(newTable);

        for(let i=0; i<responseJson.data.length; i++) {
            insertNewAds(responseJson.data[i].idx, responseJson.data[i].location, responseJson.data[i].name, responseJson.data[i].addr, responseJson.data[i].content, newTable);
        }
    }

    const insertNewAds = (idx, location, name, addr, content, newTable) => {
        let tr = document.createElement("tr");
        let locTd = document.createElement("td");
        let nameTd = document.createElement("td");
        let addrTd = document.createElement("td");
        let contentTd = document.createElement("td");
        let updateBtnTd = document.createElement("td");
        let updateButton = document.createElement("button");
        let deleteBtnTd = document.createElement("td");
        let deleteButton = document.createElement("button");

        updateButton.classList.add("btn", "btn-primary", "btn-sm", "adsImportButton");
        deleteButton.classList.add("btn", "btn-primary", "btn-sm", "adsDeleteButton");
        updateButton
        updateButton.value = idx;
        deleteButton.value = idx;
        updateButton.innerText = "수정";
        deleteButton.innerText = "삭제";

        updateBtnTd.appendChild(updateButton);
        deleteBtnTd.appendChild(deleteButton);

        deleteButton.setAttribute("location", location);

        deleteButton.addEventListener("click", function(evt) {
            if(confirm("삭제하시겠습니까?")) {
                deleteAds(this.value, this.getAttribute("location"));
                this.parentElement.parentElement.remove();
            }
        });

        updateButton.addEventListener("click", async function() {
            let res = await fetch(`http://localhost:4000/api/ads/ad/${this.value}`);
            let json = await res.json();
            let data = json.data;
            importUpdateForms(data.idx, data.name, data.location, data.addr, data.content, data.profile);
        });

        locTd.innerText = location;
        nameTd.innerText = name;
        addrTd.innerText = addr;
        contentTd.innerText = content;

        tr.appendChild(locTd);
        tr.appendChild(nameTd);
        tr.appendChild(addrTd);
        tr.appendChild(contentTd);
        tr.appendChild(updateBtnTd);
        tr.appendChild(deleteBtnTd);

        newTable.appendChild(tr);
    }

    let adsDeleteButtons = Array.from(document.querySelectorAll(".adsDeleteButton"));
    adsDeleteButtons.forEach(function(item) {
        item.addEventListener("click", async function() {
            if(confirm("삭제하시겠습니까?")) {
                deleteAds(item.value, item.getAttribute("location"));
                item.parentElement.parentElement.remove();
            }
        })

    });


    const deleteAds = async (idx, location) => {
        let formData = new FormData();
        formData.append("idx", idx);
        let response = await fetch(`/api/ads/${idx}?_method=DELETE`, {
            method: "POST",
            body: formData
        })
    }

    let adsImportButtons = Array.from(document.querySelectorAll(".adsImportButton"));
    for(let i=0; i<adsImportButtons.length; i++) {
        adsImportButtons[i].addEventListener("click", async function() {
            let res = await fetch(`http://localhost:4000/api/ads/ad/${this.value}`);
            let json = await res.json();
            let data = json.data;

            console.log(data);

            importUpdateForms(data.idx, data.name, data.location, data.addr, data.content, data.profile);
        })
    }

    const importUpdateForms = (idx, name, location, addr, content, profile) => {
        let nameField = document.querySelector("#adsUpdateForm input[name=name]");
        let locField = document.querySelector("#adsUpdateForm select[name=location]")
        let addrField = document.querySelector("#adsUpdateForm input[name=addr]");
        let contentField = document.querySelector("#adsUpdateForm input[name=content]");
        let imageField = document.querySelector("#adsUpdateForm .updateImageField");

        nameField.parentElement.classList.remove("is-empty");
        addrField.parentElement.classList.remove("is-empty");
        contentField.parentElement.classList.remove("is-empty");
        
        nameField.value = name;
        addrField.value = addr;
        contentField.value = content;
        locField.setAttribute("title", location);
        imageField.src = profile;

        document.querySelector(".adsUpdateButton").value = idx;
        
    }

    let adsUpdateButton = document.querySelector(".adsUpdateButton");
    adsUpdateButton.addEventListener("click", async function() {
        let formData = new FormData();
        let adsProfile = document.querySelector("#adsUpdateForm input[name=profile]").files[0];
        let imageField = document.querySelector("#adsUpdateForm .updateImageField").src;
        let nameField = document.querySelector("#adsUpdateForm input[name=name]").value;
        let locField = document.querySelector("#adsUpdateForm select[name=location]").value;
        let addrField = document.querySelector("#adsUpdateForm input[name=addr]").value;
        let contentField = document.querySelector("#adsUpdateForm input[name=content]").value;
        let parseImageSrc = imageField.split("http://localhost:4000/")[1];

        if(!nameField || !locField || !addrField || !contentField || !locField) {
            alert("빈 정보를 입력해주세요.");
            return;
        }

        if(!adsProfile) {
            adsProfile = `/${parseImageSrc}`;
        }


        formData.append("idx", adsUpdateButton.value);
        formData.append("profile", adsProfile);
        formData.append("name", nameField);
        formData.append("addr", addrField);
        formData.append("content", contentField);

        let response = await fetch(`http://localhost:4000/api/ads/${locField}?_method=PUT`, {
            method: "POST",
            body: formData
        });

        let responseJson = await response.json();

        if(responseJson.status === 200) {
            alert("광고 업데이트가 완료 되었습니다.");
            location.href ="/dash/ads";
        }
    });

    let adsAddButton = document.querySelector(".adsAddButton");

    adsAddButton.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let formData = new FormData();
        let adsProfile = document.querySelector("#adsForm input[name=profile]").files[0];
        let adsName = document.querySelector("#adsForm input[name=name]").value;
        let adsLoc = document.querySelector("#adsForm select[name=location]").value;
        let adsAddr = document.querySelector("#adsForm input[name=addr]").value;
        let adsContent = document.querySelector("#adsForm input[name=content]").value;

        if(!adsName || !adsLoc || !adsAddr || !adsContent) {
            alert("빈 정보를 입력해주세요.");
            return;
        }

        formData.append("name", adsName);
        formData.append("addr", adsAddr);
        formData.append("content", adsContent);
        formData.append("profile", adsProfile);

        let response = await fetch(`http://localhost:4000/api/ads/${adsLoc}`, {
            method: "POST",
            body: formData
        });

        let responseJson = await response.json();

        if(responseJson.status === 200) {
            alert("광고 등록이 완료 되었습니다.");
            location.href ="/dash/ads";
        }

    });
});