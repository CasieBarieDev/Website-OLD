const modal = document.getElementById("uc-preview-modal");
const img = document.getElementById("uc-preview");
img.onclick = function(){modal.style.display = "block";}
function ucClose() {modal.style.display = "none";}