const modal = document.getElementById("modal__container");
const overlay = document.getElementById("modal");
const openModalButtons = document.querySelectorAll(".modal__button");
const closeModalButton = document.getElementById("modal__close-btn");
const addButton = document.getElementById("modal__add-btn");
const checklist = document.getElementById("modal__checklist");
const newItemInput = document.getElementById("modal__add-item");
let currentChecklistKey;

// LoadsChecklist after clicking the image button
function loadChecklist(key) {
  // Receives data from local storage, if no data then empty array
  const items = JSON.parse(localStorage.getItem(key)) || [];
  while (checklist.firstChild) {
    checklist.removeChild(checklist.firstChild);
  }

  // the items from local storage are then added to the checklist
  items.forEach((item) => {
    addListItem(item.text, item.checked);
  });
}

// Saves current checklist to localStorage
function saveChecklist(key) {
  const items = Array.from(checklist.children).map((li) => ({
    text: li.querySelector("p").textContent,
    checked: li.querySelector("input").checked,
  }));
  localStorage.setItem(key, JSON.stringify(items));
}

// Adds new items to the checklist
function addListItem(text, checked = false) {
  // creates the new checklist item, whether through the token from loadChecklist or through adding an item
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;

  const checkText = document.createElement("p");
  checkText.textContent = text;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  // removes the li the button is connected to
  removeButton.addEventListener("click", () => {
    li.remove();
    saveChecklist(currentChecklistKey);
  });

  // saves whether the box is checked
  checkbox.addEventListener("change", () => saveChecklist(currentChecklistKey));

  li.append(checkbox, checkText, removeButton);
  checklist.append(li);
}

// Event listeners
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // pulls the checklist for the button using getAttribute
    currentChecklistKey = button.getAttribute("data-checklist");
    modal.classList.add("open");
    overlay.classList.add("open");
    loadChecklist(currentChecklistKey);
  });
});

closeModalButton.addEventListener("click", () => {
  modal.classList.remove("open");
  overlay.classList.remove("open");
  saveChecklist(currentChecklistKey);
});

addButton.addEventListener("click", () => {
  // This is how the to save new items to the checklist, it first gets the text from the input element and removes whitespace
  const text = newItemInput.value.trim();
  // If the user has typed text in the input box then after clicking the addButton it adds the new list with the text element and then erases the value for the input so user can add another
  if (text) {
    addListItem(text);
    newItemInput.value = "";
    saveChecklist(currentChecklistKey);
  }
});

// Initialize checklist on page load
loadChecklist(currentChecklistKey);
