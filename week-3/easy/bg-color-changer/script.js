function changeBg(bgColor) {
  const page = document.querySelector("body");
  page.style.backgroundColor = bgColor;
}

function addColor() {
  const inputEl = document.querySelector(".color-input");
  const btnWrapper = document.querySelector(".btn-wrapper");

  const colorBtn = document.createElement("button");
  colorBtn.classList.add("color-btn");
  colorBtn.innerText = inputEl.value;
  colorBtn.addEventListener("click", function () {
    changeBg(inputEl.value);
  });

  btnWrapper.appendChild(colorBtn);
  changeBg(inputEl.value);
  inputEl.value = "";
}
