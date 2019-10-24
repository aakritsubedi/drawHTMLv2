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
        this.key = document.querySelector('#key');
        this.saveBtn = document.querySelector('#save');
        this.editBtn = document.querySelector('#edit');
        this.addEvents();
    }
    addEvents(){
        this.saveBtn.addEventListener('click',this.saveIn.bind(this));
        this.editBtn.addEventListener('click',this.editTemp.bind(this));
    }
    checkExisting(usedFor,key){
        for (var i = 0; i<localStorage.length; i++) {
            if(localStorage.key(i) === key){
                console.log("Existing");
                if(usedFor == 'edit'){
                    return true;
                }
                else{
                    localStorage.removeItem(key);
                }
            }
        }
    }
    saveIn(){
        let  container=document.getElementById('playground');

        let that=this;

        let keyValue= that.key.value;
        this.checkExisting('save',keyValue);
        parseHTML(container);

        function parseHTML(container){
            console.log(that);
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
			else{
				return container;
			}
        }
        //console.log(that.activity);
        localStorage.setItem(keyValue,JSON.stringify(that.activity));
		
    }
    editTemp(){
        document.querySelector('.html-playground').innerHTML = '';
        let keyValue=this.key.value;
        if(this.checkExisting('edit',keyValue)){
            let activity=localStorage.getItem(keyValue);
            activity=JSON.parse(activity);
            console.log(activity);
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
                if(activity[i]['tagName'] != 'UL'){
                    element.innerText=activity[i]['value'];
                }
                if(activity[i]['tagName'] == 'TABLE' || activity[i]['tagName'] == 'TR' ){
                    element.innerText='';
                }
                parentEle=document.getElementById(activity[i]['parentEleId']);
                //console.log(parentEle);
                parentEle.appendChild(element);	
        }
        }
        else{
            alert("No file exist");
        }
    }
}
export default TempalateFunction;