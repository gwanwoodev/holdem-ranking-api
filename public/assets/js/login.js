document.addEventListener("DOMContentLoaded", (evt) => {
  let passwdInput = document.querySelector(".password");
  let loginButton = document.querySelector(".loginButton");

  passwdInput.addEventListener("keypress", (evt) => {
    if (evt.keyCode === 13) {
      loginButton.click();
      evt.preventDefault();
    }
  });

  loginButton.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let response = await fetch("https://holdemranking.com/api/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ passwd: sha256(passwdInput.value) }),
    });

    let responseJson = await response.json();

    if (responseJson.msg === "success") {
      alert("로그인 성공");
      location.href = "/dash";
    } else {
      alert("로그인 실패");
    }
  });
});
