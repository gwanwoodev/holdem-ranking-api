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
    let userAddButton = document.querySelector(".userAddButton");
    let userTableBody = document.querySelector("tbody");
    userAddButton.addEventListener("click", (event) => {
        let tr = document.createElement("tr");
        let rankTd = document.createElement("td");
        let flagTd = document.createElement("td");
        let flagDiv = document.createElement("div");
        let rankInput = document.createElement("input");
        let nameTd = document.createElement("td");
        let nameInput = document.createElement("input");

        let totalMoneyTd = document.createElement("td");
        let totalMoneyInput = document.createElement("input");
        let saveTd = document.createElement("td");
        let saveButton = document.createElement("button");

        flagDiv.classList.add("flag");

        saveButton.classList.add("btn", "btn-success", "btn-sm", "userSaveButton");
        saveButton.innerText= "저장";
        flagDiv.appendChild(rankInput);
        flagTd.appendChild(flagDiv);
        rankTd.appendChild(flagDiv);
        nameTd.appendChild(nameInput);
        totalMoneyTd.appendChild(totalMoneyInput);
        saveTd.appendChild(saveButton);

        tr.appendChild(flagTd);
        tr.appendChild(rankTd);
        tr.appendChild(nameTd);
        tr.appendChild(totalMoneyTd);
        tr.appendChild(saveTd);

        userTableBody.appendChild(tr);


        
    });
});