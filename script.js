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

// command for calculate buttons
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
      display_input.innerHTML = cleanInput(input);
    } else if (value == "=") {
      let result = eval(prepareInput(input));
      display_output.innerHTML = CleanOutput(result);
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
      display_input.innerHTML = cleanInput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        display_input.innerHTML = cleanInput(input);
      }
    }
  });
}

// Fix some bugs
function cleanInput() {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = `<span class="operator">x</span>`;
    } else if (input_array[i] == "/") {
      input_array[i] = `<span class="operator">÷</span>`;
    } else if (input_array[i] == "+") {
      input_array[i] = `<span class="operator">+</span>`;
    } else if (input_array[i] == "-") {
      input_array[i] = `<span class="operator">-</span>`;
    } else if (input_array[i] == "(") {
      input_array[i] = `<span class="parentheses">(</span>`;
    } else if (input_array[i] == ")") {
      input_array[i] = `<span class="parentheses">)</span>`;
    } else if (input_array[i] == "%") {
      input_array[i] = `<span class="percent">%</span>`;
    }
  }
  return input_array.join("");
}

// for separate numbers
function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }

  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }
  return output_array.join("");
}

// for validate input ( not to use operators more than one)
function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];

  if (value == "." && last_input == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

// for tips like 80*10%
function prepareInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }
  return input_array.join("");
}
