
class UI{
  constructor(){
    this.playground=null;
    this.selectedElement=null;
    this.init();
  }
  init(){
    this.playground=document.querySelector('.html-playground');
    this.selectedElement=document.querySelector('.html-playground');
    this.getClickedElement();
    //this.displayOptionInSidebar();
  }
  getClickedElement(){
    this.playground.addEventListener('click',(e)=>{
      this.selectedElement = e.target;
      //console.log(e.target);
      this.displayOptionInSidebar();
    });
  }
  //Display all changable CSS property in the sidebar option section
  displayOptionInSidebar(){
    let bgColor=this.selectedElement.style.backgroundColor;
    let ht=this.selectedElement.style.height;
    let wd=this.selectedElement.style.width;
    let id=this.selectedElement.id;
    let tag=this.selectedElement.tagName;
    let left=this.selectedElement.offsetLeft;
    let top=this.selectedElement.offsetTop;
    let val=this.selectedElement.innerText;
    
    console.log(bgColor,ht,wd,id,tag);
    console.log(left,top,this.selectedElement);
    let optDiv = document.querySelector('#display-opt');
    if(optDiv.hasChildNodes()){
      optDiv.innerHTML=' ';
    }
    if(id != 'playground'){
      let span = document.createElement('span');
      span.style.display='block';
      span.style.marginBottom='5px';
      span.style.borderBottom='1px dotted #222222';
      
      span.innerHTML='Info of <b>'+tag +'</b> with id: <i>'+id+"</i>"; 
      this.createInputField(optDiv,'color',bgColor,'bg-color');
      this.createInputField(optDiv,'text',ht,'height');
      this.createInputField(optDiv,'text',wd,'width');
      this.createInputField(optDiv,'text',val,'content');
      let btn = document.createElement('button');
      btn.textContent='Update';
      btn.style.padding='10px 20px';
      btn.style.backgroundColor='#26ae60';
      btn.style.color='#ffffff';
      btn.style.border='none';
      btn.setAttribute('click',this.getValue);

      let opt = document.querySelector('.options')
      optDiv.prepend(span);
      optDiv.appendChild(btn);
      opt.appendChild(optDiv);
    }
    //console.log(optDiv);
  }
  createInputField(parentEle,type,value,id){
    let span=document.createElement('span');
    span.textContent= (id != 'bg-color') ? id.toUpperCase() : 'Change BG Color to';
    let input=document.createElement('input');
    input.setAttribute('id',id);
    input.setAttribute('type',type);
    input.setAttribute('value',value);
    input.style.width='80%';
    input.style.margin='5px auto';
    parentEle.appendChild(span);
    parentEle.appendChild(input);
  }
  //Add resize the btn in right bottom to resize the element
  createResizeBtn(){
    
  }
  //Resize: to resize the selected element to new size 
  resizeElement(){
    //newValue = previousValue + change
  }
  //Drag: to drag the selected element to new position within wrapper
  dragElement(){
    //newValue = previousValue + change
  }
  //Delete: to remove the particular element from the DOM
  deleteElement(){
    //remove the element from the parent container
  }
  //Update: to update the change in the user interface
  update(){
    //update the value
  }
}
export default UI