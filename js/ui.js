import Sidebar from '../js/sidebar.js';
class UI{
  constructor(){
    this.playground=null;
    this.selectedElement=null;

    this.startWidth =0;
    this.startHeight =0;
    this.resizeBtn=null;
		this.startX =0;this.startY=0;
    this.init();
  }
  init(){
    this.playground=document.querySelector('.html-playground');
    this.selectedElement=document.querySelector('.html-playground');
    this.addEvents();
    this.initDrag =this.initDrag.bind(this)
    this.doDrag = this.doDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
  }
  selectEleFromActivity(id){
    let activityMsg = document.querySelector('.activity-msg');
    let msgArea = document.querySelector('.msg-area');
    this.selectedElement=document.getElementById(id);
    if(this.selectedElement == null){
      msgArea.style.display='block';
      msgArea.style.height='70px';
      activityMsg.innerText='The element with id '+id+' has already been deleted.';
      activityMsg.style.backgroundColor='#E44236';
      activityMsg.style.top='35px';
    }
    else{
      msgArea.style.display='block';
      msgArea.style.height='50px';
      activityMsg.innerText='The elemet with id '+id+' is been selected.';
      activityMsg.style.top='35px';
      activityMsg.style.backgroundColor='#019031';
      this.displayEditMenu();
    }
    setTimeout(()=>{
      msgArea.style.height='0px';
      activityMsg.style.top='-100px';
    }, 4000);
  }
  rgbToHex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }
  getClickedElement(e){
    this.selectedElement = e.target;
    this.displayEditMenu();
  }
  doDrag(e) {
    let opt = document.querySelector('.element-info');
    opt.style.display='none';
    let heightLimit=parseInt(document.defaultView.getComputedStyle(this.selectedElement.parentElement).height);
    let widthLimit=parseInt(document.defaultView.getComputedStyle(this.selectedElement.parentElement).width);
    console.log('Dragging',heightLimit,widthLimit);
    let newWidth = this.startWidth + e.clientX - this.startX;
    let newHeight = this.startHeight + e.clientY - this.startY;
    if(newHeight <= heightLimit){
      this.selectedElement.style.height = newHeight + 'px';
      this.selectedElement.style.borderColor='black';
    }
    else{
      this.selectedElement.style.borderColor='red';
    }
    if(newWidth <= widthLimit){
      this.selectedElement.style.width = newWidth + 'px';
      this.selectedElement.style.borderColor='black';
    }
    else{
      this.selectedElement.style.borderColor='red';
    }
    this.displayDimension(newHeight,newWidth);
  }
  
  stopDrag(e) {
    this.selectedElement.style.border='none';
    let that=this;
    this.selectedElement.removeChild(this.resizeBtn);
    this.resizeBtn.removeEventListener('mousedown',this.initDrag.bind(this));
    document.documentElement.removeEventListener('mousemove', this.doDrag, false);
    document.documentElement.removeEventListener('mouseup', this.stopDrag, false); 
    
    setWidthHeight();
    function setWidthHeight(){
      let totalwidth=parseInt(document.defaultView.getComputedStyle(that.selectedElement.parentElement).width);
      let selectedElementWidth  =parseInt(document.defaultView.getComputedStyle(that.selectedElement).width);
      let widthPercent = (selectedElementWidth/totalwidth)*100;
      that.selectedElement.style.width = widthPercent+'%';

      let totalHeight=parseInt(document.defaultView.getComputedStyle(that.selectedElement.parentElement).height);
      let selectedElementHeight  =parseInt(document.defaultView.getComputedStyle(that.selectedElement).height);
      let heightPercent = (selectedElementHeight/totalHeight)*100;
      that.selectedElement.style.height = heightPercent+'%';
    } 
  }
  initDrag(e) {
    this.selectedElement.style.border='1px dashed #000000';
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startWidth = parseInt(document.defaultView.getComputedStyle(this.selectedElement).width, 10);
    this.startHeight = parseInt(document.defaultView.getComputedStyle(this.selectedElement).height, 10);
    document.documentElement.addEventListener('mousemove',this.doDrag, false);
    document.documentElement.addEventListener('mouseup', this.stopDrag, false);
  }
  displayDimension(ht,wd){
    this.resizeBtn.style.backgroundColor='#4C4B4B';
    this.resizeBtn.style.width='75px';
    this.resizeBtn.style.height='25px';
    this.resizeBtn.style.lineHeight='25px';
    this.resizeBtn.style.textAlign='center';
    this.resizeBtn.style.color='#ffffff';
    this.resizeBtn.innerText= ht+' x '+ wd;

  }
  addResizeBtn(e){
    this.removeAllResizeBtn();
    this.selectedElement=e.target;
    let selectedElementId = this.selectedElement.getAttribute('id');
    if(selectedElementId != 'playground' && selectedElementId != 'resize-btn'){
      let div=document.createElement('div');
      //Styling Div
      div.style.position='absolute';
      div.style.bottom='0px';
      div.style.right='0px';
      div.style.height='10px';
      div.style.width='10px';
      div.setAttribute('id','resize-btn');
      div.style.backgroundColor='navy';

      this.resizeBtn=this.selectedElement.appendChild(div);
      this.resizeBtn.addEventListener('mousedown',this.initDrag);
    }
  }
  removeAllResizeBtn(){
    let resizeBtn = document.querySelectorAll('#resize-btn');
    for(let i=0;i<resizeBtn.length;i++){
      resizeBtn[i].parentElement.removeChild(resizeBtn[i]);
    }
  }
  addEvents(){
    this.playground.addEventListener('dblclick',this.getClickedElement.bind(this));
    this.addResizeBtn = this.addResizeBtn.bind(this);
    this.playground.addEventListener('click',this.addResizeBtn);
  }
  getAllProperty(){
    let left=0;let top=0;let ht=0;let wd=0;let id=null;
    let bgColor=this.selectedElement.style.backgroundColor;
    
    let tag=this.selectedElement.tagName;
    ht=this.selectedElement.style.height;
    wd=this.selectedElement.style.width;
    left=this.selectedElement.style.left;
    top=this.selectedElement.style.top;
    id=this.selectedElement.id;
    let val=this.selectedElement.innerText;
    let fontSize = this.selectedElement.style.fontSize;
    let fontWeight = this.selectedElement.style.fontWeight;
    let fontFamily = this.selectedElement.style.fontFamily;
    let src = this.selectedElement.getAttribute('src');
    
    return {
      bgColor : bgColor,
      ht : ht,
      wd : wd,
      id : id,
      tag : tag,
      left : left,
      top : top,
      val : val,
      fontSize : fontSize,
      fontWeight : fontWeight,
      fontFamily : fontFamily,
      src : src
    }
  }
  //Display all changable CSS property in the sidebar option section
  displayEditMenu(){
    let opt = document.querySelector('.element-info');
    opt.style.display='none';
    let allValue = this.getAllProperty();
    let optDiv = document.querySelector('#display-opt');
    if(optDiv.hasChildNodes()){
      optDiv.innerHTML=' ';
    }
    if(allValue.id != 'playground' && allValue.id !='resize-btn'){
      this.removeOtherBorder();
      this.selectedElement.style.border='2px dotted #000000';
      //Styling Menu 
      opt.style.display='block';
      opt.style.top=this.selectedElement.offsetTop+this.selectedElement.parentElement.offsetTop+10+'px';
      opt.children[0].style.backgroundColor=allValue.bgColor;

      let span = document.createElement('span');
      span.style.display='block';
      span.style.marginBottom='5px';
      span.style.borderBottom='1px dotted #222222';
      span.style.fontSize='13px';
      span.innerHTML='Info of <b>'+allValue.tag +'</b> with id: <i>'+allValue.id+"</i>";
      if(allValue.bgColor){
        this.createInputField(optDiv,'color',allValue.bgColor,'backgroundColor');
      }
      if(allValue.ht || allValue.wd){
        this.createInputField(optDiv,'text',allValue.ht,'height');
        this.createInputField(optDiv,'text',allValue.wd,'width');
        this.createInputField(optDiv,'text',allValue.left,'left');
        this.createInputField(optDiv,'text',allValue.top,'top');
      }
      if(allValue.fontFamily){
        this.createInputField(optDiv,'text',allValue.fontFamily,'fontFamily');
        this.createInputField(optDiv,'text',allValue.fontSize,'fontSize');
        this.createInputField(optDiv,'text',allValue.fontWeight,'fontWeight');
      }
      if(allValue.src){
        this.createInputField(optDiv,'text',allValue.src,'img-src');
      }
      if(allValue.tag != 'DIV' && allValue.tag != 'TABLE' && allValue.tag != 'UL' && allValue.tag != 'IMG'){
        if(allValue.tag == 'P'){
          this.createTextArea(optDiv,allValue.val,'content');
        }
        else{
          this.createInputField(optDiv,'text',allValue.val,'content');
        }
      }
      optDiv.prepend(span);
      
      this.createBtn(allValue.ht,allValue.top,opt,optDiv);    
      opt.appendChild(optDiv);
    }
  }
  removeOtherBorder(){
    for(let i=0;i<this.playground.children.length;i++){
      this.playground.children[i].style.border='none';
    }
  }
  createTextArea(parentEle,value,id){
    let span=document.createElement('span');
    span.style.fontSize='12px';
    span.textContent= id.toUpperCase();
    let textarea=document.createElement('textarea');
    textarea.setAttribute('id',id);
    textarea.style.height='200px';
    textarea.style.width='95%';
    textarea.innerText= value;
    textarea.style.margin='1px auto';
    textarea.style.display='block';
    parentEle.appendChild(span);
    parentEle.appendChild(textarea);
  }
  createBtn(ht,top,opt,optDiv){
    let btn = document.createElement('button');
      btn.textContent='Update';
      btn.style.padding='5px 10px';
      btn.style.backgroundColor='#26ae60';
      btn.style.color='#ffffff';
      btn.style.border='none';
      btn.style.margin='2px';
      btn.addEventListener('click',()=>this.getValue(ht,top));

      let btnDelete = document.createElement('button');
      btnDelete.textContent='Delete';
      btnDelete.style.padding='5px 10px';
      btnDelete.style.backgroundColor='#BA2F16';
      btnDelete.style.color='#ffffff';
      btnDelete.style.border='none';
      btnDelete.style.margin='2px';
      btnDelete.addEventListener('click',()=>{
        let parentELe=this.selectedElement.parentElement;
        parentELe.removeChild(this.selectedElement);
        this.selectedElement.style.border='none';
        opt.style.display='none';
      });

      let btnCancel = document.createElement('button');
      btnCancel.textContent='Cancel';
      btnCancel.style.padding='5px 10px';
      btnCancel.style.backgroundColor='#BA2F16';
      btnCancel.style.color='#ffffff';
      btnCancel.style.border='none';
      btnCancel.style.margin='2px';
      btnCancel.addEventListener('click',()=>{
        opt.style.display='none';
        this.selectedElement.style.border='none';
      });
      optDiv.appendChild(btn);
      optDiv.appendChild(btnCancel);
      optDiv.appendChild(btnDelete);
  }
  getValue(preHt,preTop){
    let opt = document.querySelector('.element-info');
    let inputFieldZone = opt.children[1];
    let allInput = inputFieldZone.querySelectorAll('input');
    let allTextArea = inputFieldZone.querySelectorAll('textarea');
    let allInputFeild = [];
    for(let j=0;j<allInput.length;j++){
      allInputFeild.push(allInput[j]);
    }
    for(let j=0;j<allTextArea.length;j++){
      allInputFeild.push(allTextArea[j]);
    }
    console.log(allInputFeild.length);
    let allValue={};
    let delHt=0;let delTop=0;
    for(let i=0;i< allInputFeild.length;i++){
      allValue[allInputFeild[i].id] = allInputFeild[i].value;
    }
    for(let key in allValue){
      if(key == 'img-src' || key == 'content'){
        if(key == 'img-src'){
          this.selectedElement.removeAttribute('src');
          this.selectedElement.setAttribute('src',allValue[key]);
        }
        if(key == 'content'){
          this.selectedElement.innerText=allValue[key];
        }
      }
      else{
        this.selectedElement.style[key] = allValue[key];
        if(key == 'height'){
          delHt=parseInt(allValue[key])-parseInt(preHt);
          console.log(allValue[key],preHt,delHt);
        }
        if(key == 'top'){
          delTop=parseInt(allValue[key])-parseInt(preTop);
          console.log(allValue[key],preTop,delTop);
        }
      }
      this.selectedElement.style.border='none';
    }
    updateAll(this); 
    function updateAll(that){
      let pg=document.getElementById('playground');
      let pgChild=pg.children;
      let startPt = 0;
      for(let i=0;i<pgChild.length;i++){
        if(that.selectedElement.id == pgChild[i].id){
          startPt = i;
        }
      }
      for(let i=startPt;i<pgChild.length;i++){
        //console.log(pgChild[i].style.height);
        if(i==(pgChild.length-1)){
          break;
        }
        pgChild[i+1].style.top=parseInt(pgChild[i+1].style.top)+delHt+delTop+'px';
      }
    }
    opt.style.display='none';
  }
  createInputField(parentEle,type,value,id){
    let span=document.createElement('span');
    span.style.fontSize='12px';
    span.textContent= id.toUpperCase();
    let input=document.createElement('input');
    input.setAttribute('id',id);
    input.setAttribute('type',type);
    value=(id == 'backgroundColor') ? this.rgbToHex(value) : value;
    input.setAttribute('value',value);
    input.style.width='60%';
    input.style.margin='1px auto';
    input.style.display='block';
    parentEle.appendChild(span);
    parentEle.appendChild(input);
  }
  //Add resize the btn in right bottom to resize the element
  createResizeBtn(){
    let div = document.createElement('div');
    //styling DIV
    div.style.height='15px';
    div.style.width='15px';
    div.style.backgroundColor='#2475B0';
    div.style.position='absolute';
    div.style.right='0';
    div.style.bottom='0';

    this.selectedElement.appendChild(div);
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