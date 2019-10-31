import UI from '../js/ui.js';
function getRandomColor() {
  var r = Math.floor(Math.random()*256);          // Random between 0-255
  var g = Math.floor(Math.random()*256);          // Random between 0-255
  var b = Math.floor(Math.random()*256);          // Random between 0-255
  var color = 'rgb(' + r + ',' + g + ',' + b + ')'; // Collect all to a string
  return color;
}
function getRandomNo(lower,upper){
  return Math.floor(Math.random() * upper) + lower;  
}
class HtmlElement{
  constructor(parentElement,element){
    this.inputOpt=null;
    this.elementOffsetTop=null;
    this.id=null;
    this.init(parentElement,element);
  }
  init(parentElement,element){
    this.parentElement = parentElement;
    this.element=element;
    this.createElement();
  }
  getOffsetTop(parentEle){
    let offsetReq=0;let htInPercent=0;let htOfParent=0;let ht=0;let top =0;
    if(parentEle.children.length != 0){
      htInPercent =parseFloat(parentEle.lastChild.style.height);
      htOfParent = parseInt(document.defaultView.getComputedStyle(parentEle).height);
      ht = htInPercent/100 * htOfParent;
      if(parentEle.lastChild.getAttribute('id').includes('img_')){
        ht=parseInt(parentEle.lastChild.style.height);
      }
      top =parseInt(parentEle.lastChild.style.top)
      offsetReq= ht+top;
    }
    return offsetReq;
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
      case 'p':
        this.paragraph();
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
      case 'input':
        this.createInput();
        break;
      default:
        console.log("Please enter the correct element name");
    }
  }
  createDiv(){
    let div=document.createElement('div');
    //Default Style
    div.style.height='10%';
    div.style.width='100%';
    div.style.left='0%';
    div.style.position='absolute';
    div.style.top=this.getOffsetTop(this.parentElement)+'px';
    div.style.backgroundColor=getRandomColor();
    this.id='div_'+Date.now();
    div.setAttribute('id',this.id);
    this.parentElement.appendChild(div);
  }
  createSpan(){
    let span=document.createElement('span');
    //Default Style
    span.style.height='20px';
    span.style.left='0%';
    span.style.top=this.getOffsetTop(this.parentElement)+'px';
    //span.style.display='inline';
    span.style.position='absolute';
    span.style.fontSize='16px';
    span.style.fontWeight='normal';
    span.style.fontFamily='Arial';
    span.setAttribute('id','span_'+Date.now());
    this.id='span_'+Date.now();
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
    nav.style.left='0%';
    nav.style.position='absolute';
    nav.style.top=this.getOffsetTop(this.parentElement)+'px';
    nav.setAttribute('id','nav_'+Date.now());
    this.id='nav_'+Date.now();
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
      this.id='nav-items'+Date.now();
    }
    else{
      items.textContent='ListItem#';
      items.style.color='#000000';
      items.setAttribute('id','list-item'+Date.now());
      this.id='list-item'+Date.now();

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
    nav.style.left='0%';
    nav.style.top=this.getOffsetTop(this.parentElement)+'px';
    nav.setAttribute('id',type+'_'+Date.now());
    this.id=type+'_'+Date.now();
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
    div.style.left='0%';
    div.style.position='absolute';
    div.style.height='60px';
    div.style.width='100%';
    div.style.paddingTop='10px';
    div.style.top=this.getOffsetTop(this.parentElement)+'px';
    div.setAttribute('id','div_'+Date.now());
    this.id='div_'+Date.now();
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
    let displayZone=document.querySelector('.ask-opt');
    let pause = document.querySelector('.pause');
    pause.style.display='block';
    let div = document.createElement('div');
    //Styling Div
    div.style.width='60%';
    //div.style.margin='50px auto';
    div.style.zIndex='3';
    div.style.backgroundColor='#222222';
    div.style.opacity='0.9';
    div.style.position='absolute';
    div.style.display='inline';
    div.style.top='150px';
    div.style.left='30%';
    div.style.color='#ffffff';
    div.setAttribute('class','ask-opt');
    //div.style.contentAlign="center";
    div.innerHTML='<span style="background-color:#222222;color:#ffffff;display:block;line-height:45px;padding:0 10px;border-bottom:1px solid #ffffff; margin-bottom:5px;">Table Options</span>';

    this.createInputType('text','Image URL','img-src',div);
    this.createInputType('submit','Add Image','add-img',div)

    this.inputOpt=displayZone.appendChild(div);

    //TO DO: trun off the draggable property of sidebarmenu
  }
  askTblReq(){
    let displayZone=document.querySelector('.ask-opt');
    let pause = document.querySelector('.pause');
    pause.style.display='block';
    let div = document.createElement('div');
    //Styling Div
    div.style.width='60%';
    //div.style.margin='50px auto';
    div.style.zIndex='3';
    div.style.backgroundColor='#222222';
    div.style.opacity='0.9';
    div.style.position='absolute';
    div.style.top='50px';
    div.style.left='30%';
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
        else if(title == 'Cancel'){
          input.style.backgroundColor = '#BA2F16';
          input.addEventListener('click',() => this.tblAction(title));
        }
      
    }
    span.appendChild(input);
    parentElement.appendChild(span);
  }
  tblAction(title){
    let dropzone=this.parentElement;
    let pause = document.querySelector('.pause');
    let displayZone = document.querySelector('.ask-opt');
    //console.log(this.parentElement);
    if(title == 'Create Table'){
      let row = document.getElementById('row').value;
      let col = document.getElementById('column').value ;
      if(row == 0 || col == 0){
        alert("Row or Column value cannot be equal to zero.");
      }
      else{
        this.createTable(row,col,dropzone);
        pause.style.display='none';
      }
    } 
    if(title == 'Cancel'){
      pause.style.display='none';
      displayZone.removeChild(this.inputOpt);
    }
  }
  createTable(row,col,parentElement){
    let table=document.createElement('table');
    //Basic Table Style
    //table.style.border='1px solid #000000';
    table.style.width='80%';
    table.style.margin='2px auto';
    table.style.left='0%';
    table.style.top=this.getOffsetTop(parentElement)+'px';
    table.style.position='absolute';
    table.style.textAlign='center';
    table.setAttribute('id','tbl_'+Date.now());
    this.id='tbl_'+Date.now();
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
        if(i==0){
          td.textContent="<<title>>";
        }
        else{
          td.textContent="<<data>>";
        }
        td.setAttribute('id','td_'+i);
        tr.appendChild(td);
      }
    }
    document.querySelector('.ask-opt').removeChild(this.inputOpt);
    parentElement.appendChild(table);
    
  }
  addImage(){
    let dropzone=document.querySelector('.ask-opt');
    let pause = document.querySelector('.pause');
    pause.style.display='none';
    let imgSrc = document.getElementById('img-src').value;
    let div = document.createElement('div');
    div.style.height='240px';
    div.style.width='240px';
    div.style.left='0%';
    div.style.border='4px solid black';
    div.style.position='absolute';
    div.classList.add('img-holder');
    div.style.top=this.getOffsetTop(this.parentElement)+'px';
    this.id='img_'+Date.now();
    div.setAttribute('id',this.id);
    let img = document.createElement('img');
    img.style.position='absolute';
    img.style.height='100%';
    img.style.width='100%';
    img.setAttribute('src',imgSrc);
    div.appendChild(img);
    this.parentElement.appendChild(div);
    dropzone.removeChild(this.inputOpt);
  }
  createBtn(){
    let btn = document.createElement('button');
    //Styling
    btn.style.border='none';
    btn.style.padding='3px 12px';
    btn.style.backgroundColor='#2C3335';
    btn.style.color='#ffffff';
    btn.style.lineHeight='30px';
    btn.style.height='36px';
    btn.textContent='Button';
    btn.style.display='inline-block';
    btn.style.left='0%';
    btn.style.top=this.getOffsetTop(this.parentElement)+'px';
    console.log(btn.style.top);
    btn.style.position='absolute';
    btn.setAttribute('id','btn_'+Date.now());
    this.id='btn_'+Date.now();
    this.parentElement.appendChild(btn);
  }
  paragraph(){
    let p = document.createElement('p');
    p.style.textAlign='justify';
    p.style.lineHeight='22px';
    p.style.fontSize='16px';
    p.style.padding='5px';
    p.style.position='absolute';
    p.style.fontSize='16px';
    p.style.fontWeight='normal';
    p.style.fontFamily='Arial';
    p.style.top=this.getOffsetTop(this.parentElement)+'px';
    p.setAttribute('id','p_'+Date.now());
    this.id='p_'+Date.now();
    p.innerText='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi porro ex corrupti incidunt ad! Esse necessitatibus enim illum eius, assumenda minus voluptas exercitationem deleniti tenetur laboriosam veniam quo quasi nostrum!';

    this.parentElement.appendChild(p);
  }
  createInput(){
    let input = document.createElement('input');
    input.style.height='25px';
    input.style.width='25%';
    input.style.margin='2px';
    this.id='input_'+Date.now();
    input.setAttribute('id',this.id);
    input.setAttribute('placeholder','Placeholder text');
    if(this.parentElement.tagName =='UL'){
      input.style.width='100%';
      let items = document.createElement('li');
      items.style.float='left';
      items.style.lineHeight='60px';
      items.style.color='#ffffff';
      items.setAttribute('id','nav-items'+Date.now());
      this.id='nav-items'+Date.now();
      items.appendChild(input);
      this.parentElement.appendChild(items);
    }
    else{
      this.parentElement.appendChild(input);
    }
  }
}
export default HtmlElement;