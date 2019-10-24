import HtmlElement from '../js/htmlElement.js';
import Template from '../js/template.js';

class Sidebar{
  constructor(){
    console.log("Sidebar Constructor");
    this.parentEle=null;
    this.dragElement=null;
    this.allChild=[];
    this.init();
  }
  init(){
    //Initilizing variable
    this.sidebar = document.querySelector('.sidebar-menu');
    this.menuOpt = document.querySelector('.draggable');
    this.dropzone = document.querySelector('.html-playground');
    this.parentEle = this.dropzone;
    //calling necessary function
    this.addDraggableProp();
    this.menuToggle();
    this.addEvent();
    this.preview();

    this.template = new Template();
  }
  //Adding Draggable Property in list items
  addDraggableProp(){
    let list = this.menuOpt.children;
    for(let i=0;i<list.length;i++){
      list[i].setAttribute('draggable',true);
    }
  }
  menuToggle(){
    let clickCount=0;
    let menuBtn = document.querySelector('.menu .menu-title');
    menuBtn.addEventListener('click',()=>{
    if(clickCount == 0){
      menuBtn.parentElement.children[1].style.display='block';
      menuBtn.children[0].innerHTML = '&uarr;';
      clickCount++;
    }
    else{
      menuBtn.parentElement.children[1].style.display='none';
      menuBtn.children[0].innerHTML = '&darr;';
      clickCount--;
    }
    });
  }
  dragInit(e){
    this.dragElement=e.target.textContent.toLowerCase();
    console.log(this.dragElement);
  }
  dragEnter(e){
    this.parentEle=e.target;
  }
  dropElement(e){
    this.allChild.push(new HtmlElement(this.parentEle,this.dragElement)); 
  }
  addEvent(){
    this.menuOpt.addEventListener('dragstart',this.dragInit.bind(this),false);
    this.dropzone.addEventListener('dragenter',this.dragEnter.bind(this),false);
    this.menuOpt.addEventListener('dragend',this.dropElement.bind(this),false);
  }
  preview(){
    var preview = document.getElementById('preview');
    preview.addEventListener('click',()=>{
      var menu=document.querySelector('.sidebar-menu');
      var displaySidebarBtn = document.querySelector('#get-sidebar');
      displaySidebarBtn.style.display='block';
      displaySidebarBtn.style.position='absolute';
      menu.style.display='none';
      this.dropzone.style.paddingBottom='0px';
        
      var playground=document.querySelector('.html-playground');
      playground.style.transition='all 2s';
      playground.style.width='100%';

      displaySidebarBtn.addEventListener('click',()=>{
      displaySidebarBtn.style.display='none';
      menu.style.display='block';
      playground.style.transition='all 0.0001s';
      playground.style.width='80%';
      this.dropzone.style.paddingBottom='50px';
      });
    })
  }
  saveAs(){
    let content="<html><head><title>DrawHTML</title></head><style>*{margin:0;padding:0;}</style></body>";
    content += document.querySelector('.html-playground').innerHTML;
    content += "</body></html>";
    var textToSaveAsBlob = new Blob([content], {type:"text/html"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = 'index';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
    function destroyClickedElement(event)
    {
        document.body.removeChild(event.target);
    }
    console.log(content);
  }
}
export default Sidebar;