const open = document.getElementById("open");
const regras_container = document.getElementById("regras_container");
const close = document.getElementById("close");

open.addEventListener("click", () => {
    regras_container.style.display = "flex";
});

close.addEventListener("click", () => {
    regras_container.style.display = "none";
});i

function cavidade(){
    const base = document.getElementById("c1");
    const box =  document.createElement("div");
    const space = document.createTextNode(" ");

    box.appendChild(space);
    base.appendChild(box);
    base.appendChild(document.createTextNode("\n"));
}
