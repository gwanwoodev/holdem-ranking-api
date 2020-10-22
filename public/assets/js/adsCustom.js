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
});