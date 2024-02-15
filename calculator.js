// Dark Mode
let toggleBtn = document.querySelector(".toggle-button");
let body = document.querySelector("body");
var icon = document.createElement("i");
icon.className = "fa-solid fa-moon fa-2x text-dark";
toggleBtn.append(icon);

toggleBtn.onclick = () => {
  body.classList.toggle("dark");
  if (body.classList == "dark") {
    icon.className = "fa-solid fa-sun fa-2x text-white";
  } else {
    icon.className = "fa-solid fa-moon fa-2x text-dark";
  }
};

//   Bootstrap 4 tooltip
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

//
const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = input;
    } else if (value == "=") {
      let result = eval(input);
      display_output.innerHTML = result;
    } else if (value == "parentheses") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      display_input.innerHTML = input;
    } else {
      input += value;
      display_input.innerHTML = input;
    }
  });
}
