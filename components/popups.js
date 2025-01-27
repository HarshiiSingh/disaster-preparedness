const initialItems = [];

const btn = document.querySelectorAll(".popup__button");
const popups = document.querySelectorAll(".popup");
const overlay = document.getElementById("popup-overlay");
const closeBtn = document.querySelectorAll(".close-popup");

function openPopup(popupId) {
  document.getElementById(popupId).classList.add("active");
  overlay.classList.add("active");
}

function closePopups() {
  popups.forEach((popup) => popup.classList.remove("active"));
  overlay.classList.remove("active");
}

btn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const checklistId = "edit-" + this.id.replace("-button", "-checklist");
    openPopup(checklistId);
  });
});

closeBtn.forEach((btn) => {
  btn.addEventListener("click", closePopups);
});

overlay.addEventListener("click", closePopups);
