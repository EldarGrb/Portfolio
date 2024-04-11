const boxElements = document.getElementsByClassName("box");
const hiddenElements = document.getElementsByClassName("hidden-div");

for (let i = 0; i < boxElements.length; i++) {
  const box = boxElements[i];
  const hidden = hiddenElements[i];

  box.addEventListener("mouseenter", () => {
    console.log("Mouse entered box:", box);
    box.style.display = "none";
    hidden.style.display = "block";
  });
  hidden.addEventListener("mouseleave", () => {
    hidden.style.display = "none";
    box.style.display = "block";
  });
}
