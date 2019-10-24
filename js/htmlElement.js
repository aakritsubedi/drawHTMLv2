import UI from '../js/ui.js';
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomNo(lower,upper){
  return Math.floor(Math.random() * upper) + lower;  
}
class HtmlElement{
  constructor(parentElement,element){
    this.inputOpt=null;
    this.elementOffsetTop=null;
    this.init(parentElement,element);
  }
  init(parentElement,element){
    this.parentElement = parentElement;
    this.element=element;
    this.createElement();
  }
  getOffsetTop(){
    let totalHt=0;
    let allChildren = document.querySelector('.html-playground').children;
    console.log(allChildren);
    for(let i=0;i<allChildren.length;i++){
      if(allChildren[i].className=='ask-opt'){
        continue;
      }
      else{
        totalHt += allChildren[i].clientHeight;
      }
    }
    console.log(totalHt);
    return totalHt;
  }
  createElement(){
    switch(this.element){
      case 'div':
        this.createDiv();
        break;
      case 'span':
        this.createSpan();
        break;
      case 'navigation menu':
        this.navigationMenu();
        break;
      case 'navigation items':
        this.addListItems('nav');
        break;
      case 'lists':
        this.addList('ul');
        break;
      case 'list items':
        this.addListItems('ul');
        break;
      case 'button':
        this.createBtn();
        break;
        
      case 'table':
        this.askTblReq();
        break;
      case 'img':
        this.askImgReq();
        break;
      case 'date & time':
        this.dateTime();
        break;
      default:
        console.log("Please enter the correct element name");
    }
  }
  createDiv(){
    let div=document.createElement('div');
    //Default Style
    div.style.height='100px';
    div.style.width='100%';
    div.style.left='0px';
    div.style.top=this.getOffsetTop()+'px';
    div.style.backgroundColor=getRandomColor();
    div.setAttribute('id','div_'+Date.now());

    this.parentElement.appendChild(div);
  }
  createSpan(){
    let span=document.createElement('span');
    //Default Style
    span.style.height='100px';
    span.style.width='100%';
    span.style.left='0px';
    span.style.top=this.getOffsetTop()+'px';
    span.style.display='inline';
    span.style.backgroundColor=getRandomColor();
    span.setAttribute('id','span_'+Date.now());
    span.textContent='Enter Text';

    this.parentElement.appendChild(span);
  }
  navigationMenu(){
    let nav = document.createElement('ul');
    nav.style.listStyle='none';
    nav.style.textAlign='center';
    nav.style.backgroundColor = '#333';
    nav.style.height='60px';
    nav.style.width='100%';
    nav.style.left='0px';
    nav.style.top=this.getOffsetTop()+'px';
    nav.setAttribute('id','nav_'+Date.now());
    let items=document.createElement('li');
      items.style.float='left';
      items.style.width='auto';
      items.style.lineHeight='60px';
      items.style.padding='0 10px';
      items.textContent='Your Company Name';
      items.setAttribute('id','company-name');
      items.style.color='#ffffff';
    
      nav.appendChild(items);
    if(true){
      this.parentElement.appendChild(nav);
    }
  }
  addListItems(usedfor){
    let items=document.createElement('li');
    if(usedfor == 'nav'){
      items.style.float='left';
      items.style.lineHeight='60px';
      items.textContent='Menu#';
      items.style.color='#ffffff';
      items.setAttribute('id','nav-items'+Date.now());
    }
    else{
      items.textContent='ListItem#';
      items.style.color='#000000';
      items.setAttribute('id','list-item'+Date.now());
    }
    
    items.style.width='auto';
    items.style.padding='0 10px';
    if(this.parentElement.tagName == 'UL' || this.parentElement.tagName == 'OL'){
      this.parentElement.appendChild(items);
    }
    else{
      console.log("Cannot perform this action");
    }
    
  }
  addList(type){
    let nav = document.createElement(type);
    nav.style.padding='1px 50px';
    nav.style.left='0px';
    nav.style.top=this.getOffsetTop()+'px';
    nav.setAttribute('id',type+'_'+Date.now());
    let items=document.createElement('li');
      items.textContent='ListItem';
      items.setAttribute('id','list-item'+Date.now());
      nav.appendChild(items);
      
    this.parentElement.appendChild(nav);
  }
  dateTime(){
    let d = new Date();
    let today=d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
    let time=d.getHours()+":"+d.getMinutes();
    var div = document.createElement('div');
    div.style.backgroundColor='#f4f4f4';
    div.style.textAlign='center';
    div.innerHTML=today+"<br/>"+time;
    div.style.left='0px';
    div.style.top=this.getOffsetTop()+'px';
    document.innerHtml='<script>'+
      setInterval(() => {
        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59
        var session = "AM";
        
        if(h == 0){
            h = 12;
        }
        
        if(h > 12){
            h = h - 12;
            session = "PM";
        }
        
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        
        var time = h + ":" + m + ":" + s + " " + session;
        div.innerHTML=today+"<br/>"+time;
      }, 1000);
    
    +'</script>'
    this.parentElement.appendChild(div);
  }
  askImgReq(){
    let displayZone=document.querySelector('.html-playground');
    let div = document.createElement('div');
    //Styling Div
    div.style.width='60%';
    //div.style.margin='50px auto';
    div.style.zIndex='3';
    div.style.backgroundColor='#222222';
    div.style.opacity='0.9';
    div.style.position='absolute';
    div.style.display='inline';
    div.style.top='50px';
    div.style.left='50px';
    div.style.color='#ffffff';
    div.setAttribute('class','ask-opt');
    //div.style.contentAlign="center";
    div.innerHTML='<span style="background-color:#222222;color:#ffffff;display:block;line-height:45px;padding:0 10px;border-bottom:1px solid #ffffff; margin-bottom:5px;">Table Options</span>';

    this.createInputType('text','Image URL','img-src',div);
    this.createInputType('submit','Add Image','add-img',div)

    this.inputOpt=displayZone.appendChild(div);
    console.log(this.inputOpt);

    //TO DO: trun off the draggable property of sidebarmenu
  }
  askTblReq(){
    let displayZone=document.querySelector('.html-playground');
    let div = document.createElement('div');
    //Styling Div
    div.style.width='60%';
    //div.style.margin='50px auto';
    div.style.zIndex='3';
    div.style.backgroundColor='#222222';
    div.style.opacity='0.9';
    div.style.position='absolute';
    div.style.top='50px';
    div.style.left='50px';
    div.style.color='#ffffff';
    div.setAttribute('class','ask-opt');
    //div.style.contentAlign="center";
    div.innerHTML='<span style="background-color:#222222;color:#ffffff;display:block;line-height:45px;padding:0 10px;border-bottom:1px solid #ffffff; margin-bottom:5px;">Table Options</span>';

    this.createInputType('number','No. of rows','row',div);
    this.createInputType('number','No. of column','column',div);
    this.createInputType('submit','Create Table','create-table',div);
    this.createInputType('submit','Cancel','dismiss-table-menu',div);

    this.inputOpt=displayZone.appendChild(div);

    //TO DO: trun off the draggable property of sidebarmenu
    
  }
  createInputType(type,title,use,parentElement){
    let span=document.createElement('span');
    //Styling Span
    span.style.margin='5px 25px';
    if(type != 'submit'){
      span.textContent=title;
    }
    let input=document.createElement('input');
    input.setAttribute('type',type);
    input.setAttribute('placeholder','Please enter '+title);
    //input.setAttribute('min','1');
    input.style.border='none';
    input.style.height='30px';
    input.style.width="90%";
    input.style.display="block";
    input.style.margin="inherit";
    input.setAttribute('id',use);
    if(type == 'submit'){
      //event.preventDefault();
      input.setAttribute('value',title);
      input.style.backgroundColor = '#BA2F16';
      input.style.marginTop="-2px";
      input.style.marginBottom="-2px";
      if(title == 'Create Table'){
        input.style.backgroundColor = '#26ae60';
        input.addEventListener('click',() => this.tblAction(title));
      }
      else if(title == 'Add Image'){
        input.style.backgroundColor = '#26ae60';
        input.addEventListener('click',() =>this.addImage());
      }
      
    }
    span.appendChild(input);
    parentElement.appendChild(span);
  }
  tblAction(title){
    let displayZone=document.querySelector('.html-playground');
    console.log(title);
    if(title == 'Create Table'){
      let row = document.getElementById('row').value;
      let col = document.getElementById('column').value ;
      if(row == 0 || col == 0){
        alert("Row or Column value cannot be equal to zero.");
      }
      else{
        this.createTable(row,col,displayZone);
      }
    } 
    else{
      displayZone.removeChild(this.inputOpt);
    }
  }
  createTable(row,col,parentElement){
    let table=document.createElement('table');
    //Basic Table Style
    //table.style.border='1px solid #000000';
    table.style.width='80%';
    table.style.margin='2px auto';
    table.style.left='0px';
    table.style.top=this.getOffsetTop()+'px';
    table.setAttribute('id','tbl_'+Date.now());
    for(let i=0;i<row;i++){
      let tr=document.createElement('tr');
      if(i==0){
        tr.style.backgroundColor='#222222';
        tr.style.color='#ffffff';
        tr.style.lineHeight='25px';
        tr.setAttribute('id','thead_'+i+'tr');
      }
      else{
        tr.style.backgroundColor='#f4f4f4';
        tr.style.color='#000000';
        tr.style.lineHeight='20px';
        tr.setAttribute('id','tbody_'+i+'tr');
      }
      table.appendChild(tr);
      for(let j=0;j<col;j++){
        let td=document.createElement('td');
        td.textContent="1";
        td.setAttribute('id','td_'+i);
        tr.appendChild(td);
      }
    }
    parentElement.removeChild(this.inputOpt);
    parentElement.appendChild(table);
    
  }
  addImage(){
    let dropzone=document.querySelector('.html-playground');
    let imgSrc = document.getElementById('img-src').value;
    let div = document.createElement('div');
    div.style.height='240px';
    div.style.width='240px';
    //div.style.position='relative';
    div.style.left='0px';
    div.style.top=this.getOffsetTop()+'px';
    let img = document.createElement('img');
    img.style.position='absolute';
    img.style.height='100%';
    img.style.width='100%';
    img.setAttribute('src',imgSrc);
    div.appendChild(img);

    dropzone.appendChild(div);
    dropzone.removeChild(this.inputOpt);
    console.log(imgSrc);

  }
  createBtn(){
    let btn = document.createElement('button');
    //Styling
    btn.style.border='none';
    btn.style.padding='3px 12px';
    btn.style.backgroundColor='#2C3335';
    btn.style.color='#ffffff';
    btn.style.lineHeight='30px';
    btn.textContent='Button';
    btn.style.left='0px';
    btn.style.top=this.getOffsetTop()+'px';
    btn.setAttribute('id','btn_'+Date.now());

    this.parentElement.appendChild(btn);
  }
}
export default HtmlElement;