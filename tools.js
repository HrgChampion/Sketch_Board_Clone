let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");


let pencilFlag = false;
let eraserFlag = false;
let optionsFlag = true;

optionsCont.addEventListener("click", () => {
  optionsFlag = !optionsFlag;
  if(optionsFlag) openTools();
  else closeTools();
  let iconElem = optionsCont.children[0];
});

function openTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex";

}

function closeTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display ="none";
    pencilToolCont.style.display="none";
    eraserToolCont.style.display="none";
}

pencil.addEventListener("click", () => {
    pencilFlag = !pencilFlag;
    if(pencilFlag) pencilToolCont.style.display="block";
    else pencilToolCont.style.display="none";
});

eraser.addEventListener("click", () => {
    eraserFlag = !eraserFlag;
    if(eraserFlag) eraserToolCont.style.display="flex";
    else eraserToolCont.style.display="none";
});

upload.addEventListener("click", () => {
    // Open File Explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", () => {
        let file =input.files[0];
        let url = URL.createObjectURL(file);
        let stickyTemplateHTML = `
            <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
            </div>
            <div class="note-cont">
             <img src="${url}"/>
            </div>
    `
    createSticky(url);  
})
});

function createSticky(stickyTemplateHTML){
        let stickyCont = document.createElement("div");
        stickyCont.innerHTML = stickyTemplateHTML;

    document.body.appendChild(stickyCont);
   let minimize = stickyCont.querySelector(".minimize");
   let remove = stickyCont.querySelector(".remove");
   noteActions(minimize, remove, stickyCont);
    stickyCont.onmousedown = function(e){
        dragAndDrop(stickyCont,e);
    }
    stickyCont.ondragstart = function(){
        return false;
    }   
}

sticky.addEventListener("click", () => {

    let stickyTemplateHTML = `
            <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
            </div>
            <div class="note-cont">
             <textarea spellcheck="false"></textarea>
            </div>
    `
    createSticky(stickyTemplateHTML);

});

function noteActions(minimize,remove,stickyCont){
remove.addEventListener("click", ()=>{
    stickyCont.remove();
})

minimize.addEventListener("click", ()=>{
    let noteCont = stickyCont.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if(display === "none"){
        noteCont.style.display ="block"
    }else{
        noteCont.style.display = "none"
    }
})
}

function dragAndDrop(element,event){
let shiftX = event.clientX - element.getBoundingClientRect().left;
let shiftY = event.clientY - element.getBoundingClientRect().top;
element.style.position = "absolute";
element.style.zIndex = 1000;

moveAt(event.pageX, event.pageY);

function moveAt(pageX, pageY){
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
}

function onMouseMove(event){
    moveAt(event.pageX, event.pageY);
}
document.addEventListener("mousemove", onMouseMove);

element.onmouseup = function(){
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
}

}