import Sidebar from '../js/sidebar.js';
import UI from '../js/ui.js';
import TemplateFunction from '../js/templateFuction.js';
var sidebar = new Sidebar();

let saveAs = document.querySelector('#save-as');
saveAs.addEventListener('dblclick',sidebar.saveAs);

var tempFunc = new TemplateFunction();
var ui = new UI();