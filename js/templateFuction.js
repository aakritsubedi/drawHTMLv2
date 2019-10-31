

class TempalateFunction{
    constructor(){
        console.log("From Template Function Constructor");
        this.key =null;
        this.saveBtn=null;
        this.editBtn=null;
        this.activity=[];
        this.init();
    }
    init(){
        this.saveOpt = document.querySelector('#save-opt');
        this.key = document.querySelector('#key');
        this.saveBtn = document.querySelector('#save');
        this.editBtn = document.querySelector('#edit');
        this.saveMenuOpt = document.querySelector('.opt-menu');
        this.addEvents();
        this.cancel();
        this.optionTemplate();
    }
    addEvents(){
        this.saveBtn.addEventListener('click',this.saveIn.bind(this));
        this.saveOpt.addEventListener('click',this.saveMenu.bind(this));
        this.editBtn.addEventListener('click',this.editTemp.bind(this));
    }
    saveMenu(){
        this.saveMenuOpt.style.display='block';
    }
    checkExisting(usedFor,key){
        for (var i = 0; i<localStorage.length; i++) {
            if(localStorage.key(i) == key){
                if(usedFor == 'edit'){
                    return true;
                }
                else{
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        }
    }
    saveIn(){
        let  container=document.getElementById('playground');
        let that=this;
        let keyValue= that.key.value;
        this.activity=[];
        this.checkExisting('save',keyValue);
        parseHTML(container);
        function parseHTML(container){
			if(container.children.length>0){
                for(let i=0;i<container.children.length;i++){
                    let task = {
                        tagName : container.children[i].tagName,
                        attribute :{
                            id: container.children[i].getAttribute('id'),
                            class: container.children[i].getAttribute('class'),
                            src : container.children[i].getAttribute('src')
                        },   
                        style : container.children[i].getAttribute('style'),
                        value : container.children[i].innerText,
                        parentEleId : container.getAttribute('id')
                    }
                    that.activity.push(task);
                    parseHTML(container.children[i]);
                }
             }
            localStorage.setItem(keyValue,JSON.stringify(that.activity));
        }
        this.saveMenuOpt.style.display='none';
    }
    cancel(){
        let cancel = document.getElementById('cancel');
        cancel.addEventListener('click',()=>{
            cancel.parentElement.style.display='none';
        });
    }
    editTemp(){
        let keyValue=this.key.value;
        let fileStatus=this.loadPlayground(keyValue);
         if(fileStatus == false){
             alert("No File Found");
         }   
    }
    loadPlayground(keyValue){
        document.querySelector('.html-playground').innerHTML = '';
        if(this.checkExisting('edit',keyValue)){
            let activity=localStorage.getItem(keyValue);
            activity=JSON.parse(activity);
            let task=null;
            let parentEle=null;
            for(let i=0;i<activity.length;i++){
                let element = document.createElement(activity[i]['tagName']);
                //Adding Attribute
                let attribute = activity[i]['attribute'];
                //console.log(attribute);
                element.setAttribute('id',attribute['id']);
                if(attribute['class'] != null){
                    element.setAttribute('class',attribute['class']);
                }
                if(attribute['src'] != null){
                    element.setAttribute('src',attribute['src']);
                }
                //Adding Style 
                let style = activity[i]['style'];
                // console.log(activity[i]['value'x`x`]);
                element.setAttribute('style',style);
                if(activity[i]['tagName'] == 'UL'){
                    
                }
                else if(activity[i]['tagName'] == 'TABLE'){

                }
                else if(activity[i]['tagName'] == 'TR'){

                }
                else if(activity[i]['tagName'] == 'DIV'){

                }
                else{
                    element.innerText=activity[i]['value'];
                }
                parentEle=document.getElementById(activity[i]['parentEleId']);
                //console.log(parentEle);
                parentEle.appendChild(element);	
        }
        }
        else{
            return false;
        }
    }
    optionTemplate(){
        let selectMenu = document.querySelector('#edit-project');
        for (let i = 0; i<localStorage.length; i++) {
            let options=document.createElement('option');
            if(localStorage.key(i).includes('template')){
                options.setAttribute('value',localStorage.key(i));
                options.innerText=localStorage.key(i).toUpperCase().substring(8);
            }
            else{
                continue;
            }
            selectMenu.addEventListener('change',this.loadTemplate.bind(this));
            selectMenu.appendChild(options);
        }
    }
    loadTemplate(e){
        let keyValue=document.querySelector('#edit-project').value;
        this.loadPlayground(keyValue);
    }
}
export default TempalateFunction;