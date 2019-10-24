class Template{
  constructor(){
    console.log('Template Constructor');
    this.init();
  }
  init(){
    this.templateOpt = document.querySelector('.templates');
    this.dropzone = document.querySelector('.html-playground');
    this.parentEle = this.dropzone;
    this.addEvent();
  }  
  dragInit(e){
    this.dragElement=e.target.textContent.toLowerCase();
    console.log(this.dragElement);
  }
  dragEnter(e){
    this.parentEle=e.target;
  }
  dropElement(e){
    this.loadTemplate();
  }
  addEvent(){
    document.getElementById('load-template').addEventListener('change', this.loadTemplate, false);
  }
  loadTemplate(e){
      var file = e.target.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        var contents = e.target.result;
        console.log(contents);
        document.querySelector('.html-playground').innerHTML=contents;
      };
      reader.readAsText(file);
  }
}
export default Template;