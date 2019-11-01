import HtmlElement from '../js/htmlElement.js';
import Template from '../js/template.js';
import UI from '../js/ui.js';

class Sidebar{
  constructor(){
    console.log("Sidebar Constructor");
    this.parentEle=null;
    this.dragElement=null;
    this.allChild=null;
    this.undo=null;
    this.init();
  }
  init(){
    //Initilizing variable
    this.logo = document.querySelector('#logo');
    this.sidebar = document.querySelector('.sidebar-menu');
    this.menuOpt = document.querySelector('.draggable');
    this.dropzone = document.querySelector('.html-playground');
    this.undo=document.querySelector('#undo');
    this.activity=document.querySelector('.activity');
    this.allChild=[];
    this.parentEle = this.dropzone;
    //calling necessary function
    this.addDraggableProp();
    this.menuToggle();
    this.addEvent();
    this.preview();

    this.template = new Template();
  }
  //New 
  newFile(){
    let playground=document.querySelector('#playground');
    playground.innerHTML='';
    this.allChild.splice(0,this.allChild.length);
  }
  //Adding Draggable Property in list items
  addDraggableProp(){
    let list = this.menuOpt.children;
    for(let i=0;i<list.length;i++){
      list[i].setAttribute('draggable',true);
      list[i].setAttribute('title','Drag '+list[i].innerText+' tag');
      list[i].setAttribute('ondragstart','event.dataTransfer.setData(\'text/plain\',null)');
    }
  }
  //Toggle Projects Menu to display and hide the options below
  menuToggle(){
    let clickCount=0;
    let menuBtn = document.querySelector('.projects .menu-title');
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
  //Initilize the drag event from TAGS
  dragInit(e){
    this.dragElement=e.target.textContent.toLowerCase();
  }
  dragEnter(e){
    this.parentEle=e.target;
  }
  dropElement(e){
    this.undo.style.backgroundColor='#26ae60';
    this.allChild.push(new HtmlElement(this.parentEle,this.dragElement)); 
  }
  //Undo == removes the last element acc to activity log
  undoEvent(e){
    if(this.allChild.length>0){
      let id=this.allChild.pop().id;
      let lastAction = document.getElementById(id);
      lastAction.parentElement.removeChild(lastAction);
    }
    else{
      console.log("No Action");
      this.undo.style.backgroundColor='#B83227';
    }
  }
  //add necessary events
  addEvent(){
    this.menuOpt.addEventListener('dragstart',this.dragInit.bind(this),false);
    this.dropzone.addEventListener('dragenter',this.dragEnter.bind(this),false);
    this.menuOpt.addEventListener('dragend',this.dropElement.bind(this),false);
    this.undo.addEventListener('click',this.undoEvent.bind(this));
    this.logo.addEventListener('click',this.newFile.bind(this));
    this.activity.addEventListener('click',this.activityLog.bind(this));
  }
  //Preview the HTML created
  preview(){
    var preview = document.getElementById('preview');
    var saveOpt = document.getElementById('save-opt');
    var undoOpt = document.getElementById('undo');
    preview.addEventListener('click',()=>{
      var menu=document.querySelector('.sidebar-menu');
      var displaySidebarBtn = document.querySelector('#get-sidebar');
      displaySidebarBtn.style.display='block';
      displaySidebarBtn.style.position='absolute';
      menu.style.display='none';
      preview.style.display='none';
      undoOpt.style.display='none';
      saveOpt.style.display='none';
      this.dropzone.style.paddingBottom='0px';
        
      var playground=document.querySelector('.html-playground');
      playground.style.transition='all 2s';
      playground.style.width='100%';

      displaySidebarBtn.addEventListener('click',()=>{
      displaySidebarBtn.style.display='none';
      menu.style.display='block';
      preview.style.display='block';
      saveOpt.style.display='block';
      undoOpt.style.display='block';
      playground.style.transition='all 0.0001s';
      playground.style.width='80%';
      this.dropzone.style.paddingBottom='100px';
      });
    })
  }
  //Saving Options
  saveAs(){
    let content="<html><head><title>DrawHTML</title></head><style>*{margin:0;padding:0;}</style></body>";
    content += document.querySelector('.container').children[1].innerHTML;
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
    //console.log(content);
  }
  //Activity Logs
  activityLog(){
    let sidebar = document.querySelector('.sidebar-menu');
    sidebar.style.borderTop='none';
    sidebar.style.borderBottom='none';
    let allActivity=document.querySelector('.all-activity');
    allActivity.style.display='block';
    let h3=document.createElement('h3');
    h3.innerHTML='&#9997; Activity Log';
    h3.style.color='#ffffff';
    h3.style.backgroundColor='#4C4B4B';
    h3.style.lineHeight='34px';
    let span=document.createElement('span');
    span.classList.add('cross-btn');
    span.innerHTML='&#10006;';
    span.addEventListener('click',(e)=>{
      sidebar.style.borderTop='6px solid #f2f2f2';
      sidebar.style.borderBottom='6px solid #f2f2f2';
      allActivity.removeChild(h3);
      allActivity.removeChild(ul);
      allActivity.style.display='none';
    });
    h3.appendChild(span);
    let ul=document.createElement('ul');
    //ul.style.paddingTop='10px';
    for(let i=0;i<this.allChild.length;i++){
    
      let li=document.createElement('li');
      li.style.fontSize='14px';
      li.classList.add('liActivity');
      li.innerHTML='<b>'+this.allChild[i].element+'</b> with id '+this.allChild[i].id+' was added.';
      //Li Work
      li.addEventListener('click',()=> this.activityTask(this.allChild[i].id));
      ul.appendChild(li);
    }
    allActivity.prepend(h3);
    allActivity.appendChild(ul);
  }
  //To set selectedElemet in UI class from activity log and perform functionalities
  activityTask(id){
    let ui= new UI();
    ui.selectEleFromActivity(id);
  }
}
export default Sidebar;