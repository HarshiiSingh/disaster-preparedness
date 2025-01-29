const modal = document.getElementById("modal__container");
const overlay = document.getElementById("modal");
const modalTitle = document.getElementById("modal__header");
const openModalButtons = document.querySelectorAll(".modal__button");
const closeModalButton = document.getElementById("modal__close-btn");
const addButton = document.getElementById("modal__add-btn");
const checklist = document.getElementById("modal__checklist");
const newItemInput = document.getElementById("modal__add-item");
let currentChecklistKey;

const initialChecklist = {
  "snowstorm-button": {
    title: "Snow Storm Checklist",
    items: [
      { text: "Warm clothing and blankets", checked: false },
      { text: "Food and bottled water", checked: false },
      { text: "Flashlights and extra batteries", checked: false },
      { text: "Ice melt, sand, or chains for traction", checked: false },
      { text: "Backup heating source", checked: false },
    ],
  },
  "hurricane-button": {
    title: "Hurricane Checklist",
    items: [
      { text: "Waterproof storage for important documents", checked: false },
      { text: "Battery packs for mobile devices", checked: false },
      {
        text: "Extra prescription medications and first aid kit",
        checked: false,
      },
      { text: "Evacuation plan with emergency contacts", checked: false },
      {
        text: "Sandbags or flood barriers for home protection",
        checked: false,
      },
    ],
  },
  "wildfire-button": {
    title: "WildFire Checklist",
    items: [
      { text: "N95 masks or respirators to filter smoke", checked: false },
      { text: "Fire-resistant clothing and goggles", checked: false },
      { text: "Emergency go-bag with essentials", checked: false },
      { text: "Garden hose, buckets, and fire extinguisher", checked: false },
      { text: "Battery-powered or solar phone charger", checked: false },
    ],
  },
  "earthquake-button": {
    title: "Earthquake Checklist",
    items: [
      { text: "Sturdy shoes and gloves", checked: false },
      { text: "Devices or tools to signal for help", checked: false },
      { text: "Heavy-duty plastic sheeting and duct tape", checked: false },
      { text: "Fire extinguisher for potential gas leaks", checked: false },
      { text: "Water purification tools or chemicals", checked: false },
    ],
  },
};

// LoadsChecklist after clicking the image button
function loadChecklist(key) {
  const checklistItems = initialChecklist[key];
  modalTitle.textContent = checklistItems.title;
  checklist.textContent = "";
  checklistItems.items.forEach((item) => {
    addListItem(item.text, item.checked);
  });
}

// Saves current checklist
function saveChecklist(key) {
  const items = Array.from(checklist.children).map((li) => ({
    text: li.querySelector("p").textContent,
    checked: li.querySelector("input").checked,
  }));

  initialChecklist[key].items = items;

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
    currentChecklistKey = button.getAttribute("id");
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
