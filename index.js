let step = 0;

const forms = {
  0: "personal_data",
  1: "plan",
  2: "addons",
  3: "summary",
};

display(step);

const plans = {
  arcade: {
    monthly: 9,
    yearly: 90,
  },
  advanced: {
    monthly: 12,
    yearly: 120,
  },
  pro: {
    monthly: 15,
    yearly: 150,
  },
};

const formData = {
  plan: {
    type: "arcade",
    price: 9,
    duration: "monthly",
  },
  addons: [],
};

const selectedAddons = new Set();
selectedAddons.add(document.querySelectorAll(".horizontal-box")[0]);
console.log("selected addon", selectedAddons);

function display(index) {
  console.log("fro start", index);
  let buttons = document.getElementsByClassName("btn");
  let steps = document.getElementsByClassName("step");

  if (index >= 0 && index <= steps.length - 1) {
    // for forms
    steps[index].style.display = "block";

    if (index >= 0 && index <= steps.length - 2) {
      // for sidebar
      buttons[index].style.backgroundColor = "hsl(206, 94%, 87%)";
      buttons[index].style.border = "none";
      buttons[index].style.color = "hsl(213, 96%, 18%)";
    }
  }

  if (index == 0 || index == steps.length - 1)
    document.getElementById("back").style.display = "none";
  else document.getElementById("back").style.display = "inline-block";

  if (index == steps.length - 2) {
    document.getElementById("next").innerHTML = "Confirm";
    document.getElementById("next").style.backgroundColor =
      "hsl(243, 100%, 62%)";
  } else {
    document.getElementById("next").innerHTML = "Next Step";
    document.getElementById("next").style.backgroundColor =
      "hsl(213, 96%, 18%)";
  }

  if (index == steps.length - 1)
    document.getElementById("next").style.display = "none";
  else document.getElementById("next").style.display = "inline-block";

  if (forms[index] == "summary") showSummaryData();
}

function hide(index) {
  let buttons = document.getElementsByClassName("btn");
  let steps = document.getElementsByClassName("step");

  steps[index].style.display = "none";

  buttons[index].style.backgroundColor = "transparent";
  buttons[index].style.border = ".2rem solid hsl(0, 0%, 100%)";
  buttons[index].style.color = "hsl(0, 0%, 100%)";
}

function handleClick(count) {
  event.preventDefault();
  if (count > 0) {
    if (!validateForm()) return false;
  }
  saveData(step);
  hide(step);
  step += count;
  display(step);
}

function validateForm() {
  let x = document.getElementsByClassName("step")[step];
  let inputs = x.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      document.getElementsByClassName("error-msg")[i].style.display =
        "inline-block";
      document.getElementsByTagName("input")[i].style.border =
        ".2rem solid hsl(354, 84%, 57%)";
      return false;
    }
  }
  return true;
}

function removeErrorMsg(target) {
  target.style.border = "1px solid grey";
  const parent = target.parentElement;
  parent
    .getElementsByClassName("required")[0]
    .getElementsByTagName("p")[0].style.display = "none";
}

function fetchValue(element) {
  const par = element.parentElement;
  for (let i = 0; i < par.children.length; i++) {
    par.children[i].classList.remove("main-box-selected");
  }
  element.classList.add("main-box-selected");
  const h = element.getElementsByTagName("h1");
  const type = h[0].textContent;

  formData.plan.type = type.toLowerCase();
  formData.plan.price = plans[formData.plan.type][formData.plan.duration];
}

function addAddon(element) {
  if (!selectedAddons.has(element)) selectedAddons.add(element);
  else selectedAddons.delete(element);
  element.classList.toggle("horizontal-box-selected");
  element
    .getElementsByClassName("addons-check")[0]
    .classList.toggle("checklist");
}

function toggle(element) {
  const free = document.getElementsByClassName("free");
  const pricesPlan = document.getElementsByClassName("plan-price");
  const prices = [
    { mo: 9, yr: 90 },
    { mo: 12, yr: 120 },
    { mo: 15, yr: 150 },
  ];
  const planDurations = document.getElementsByClassName("plan-duration");

  if (element.checked == true) {
    formData.plan.duration = "yearly";
    formData.plan.price = plans[formData.plan.type][formData.plan.duration];
    document.getElementById("yearly").style.color = "hsl(213, 96%, 18%)";
    document.getElementById("monthly").style.color = "gray";
    for (let i = 0; i < free.length; i++) {
      free[i].style.display = "inline-block";
      planDurations[i].innerHTML = "yr";
      pricesPlan[i].innerHTML = prices[i].yr;
    }
  } else {
    formData.plan.duration = "monthly";
    formData.plan.price = plans[formData.plan.type][formData.plan.duration];
    document.getElementById("yearly").style.color = "gray";
    document.getElementById("monthly").style.color = "hsl(213, 96%, 18%)";
    document.getElementsByClassName("plan-duration").innerHTML = "mo";
    for (let i = 0; i < free.length; i++) {
      free[i].style.display = "none";
      planDurations[i].innerHTML = "mo";
      pricesPlan[i].innerHTML = prices[i].mo;
    }
  }
}

function saveAddons() {
  formData.addons.length = 0;
  for (const ele of selectedAddons) {
    let name = ele
      .getElementsByClassName("addons-text")[0]
      .getElementsByTagName("h1")[0].innerHTML;
    let price = ele
      .getElementsByClassName("addons-price")[0]
      .getElementsByTagName("span")[0].innerHTML;
    let duration = ele
      .getElementsByClassName("addons-price")[0]
      .getElementsByTagName("span")[1].innerHTML;
    formData.addons.push({ name, price, duration });
  }
}

function changePlan() {
  let summaryIndex = Object.keys(forms).find(key => forms[key] === 'summary');
  let planIndex = Object.keys(forms).find(key => forms[key] === 'plan')
  hide(summaryIndex)
  step = parseInt(planIndex)
  console.log("back ", step);
  display(planIndex)
}

function showSummaryData() {
  let html = "";
  let total = 0;
  total+=parseInt(formData.plan.price)
  html += `<div class="summary-plan">
        <div class="summary-plan-name">
          <h1>${
            formData.plan.type.charAt(0).toUpperCase() +
            formData.plan.type.slice(1)
          } (${
    formData.plan.duration.charAt(0).toUpperCase() +
    formData.plan.duration.slice(1)
  })</h1>
          <h3 onclick="changePlan()">Change</h3>
        </div>
        <div class="summary-plan-price">
          <h1>$<span>${formData.plan.price}</span>/${
    formData.plan.duration == "monthly" ? "mo" : "yr"
  }</h1>
        </div>
      </div>
      <hr>`;
  formData.addons.map((addon) => {
  total+=parseInt(addon.price)
    html += `<div class="summary-addons"><div class="summary-addons-name">
<h3>${addon.name}</h3>
</div>
<div class="summary-addons-price">
<h3>+$<span>${addon.price}</span>/${
      formData.plan.duration == "monthly" ? "mo" : "yr"
    }</h3>
</div></div>`;
  });
  // html += "";

  document.getElementById("summary-details").innerHTML = html;

  let totalHtml = `<div class="total-plan">
  <h3>Total (per ${
    formData.plan.duration == "monthly" ? "month" : "year"
  })</h3>
</div>
<div class="total-price">
  <h1>+$<span>${total}</span>/${
    formData.plan.duration == "monthly" ? "mo" : "yr"
  }</h1>
</div>`

document.getElementById('summary-total').innerHTML = totalHtml
}

function saveData(step) {
  const which = forms[step];
  switch (which) {
    case "personal_data":
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      formData.personal_data = { name, email, mobile };
      break;
    case "addons":
      saveAddons();
      break;
    case "summary":
      break;
    default:
      break;
  }
}
