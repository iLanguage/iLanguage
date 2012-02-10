function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
  if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)','g');
      ele.className=ele.className.replace(reg,' ');
  }
}
var randomColor = function(){
  return '#000000'.replace(/0/g,function(){return (~~(Math.random()*10)).toString(10);})
}
var words = {};
var content = "waturikuq llaqtayta qaninpa kachkarqa tiyakurqani sivinganimanta";
words.content = content.split(" ");
var veryfunctional = "mana uk wata kay jina paqun";
words.veryfunctional = veryfunctional.split(" ");
var frequent = "chaymanta yunta puquykuna sara wakin";
words.frequent = frequent.split(" ");
var buzz = "tumpawan sarasta puqurqachu munanchu puquyta purumaspiqa purumasman avanzaykuyku uywaspaq mikhunan avanzachkan alturasman kunantaq"
words.buzz = buzz.split(" ");

var fonts = ["friendly1","pushy1","normal1","pushy2"];
var direction=["horizontal","vertical"];

var pathposition = 0;
var init = function(){
	var cloud = document.getElementById("cloud");
	cloud.innerHTML = "";
	
	for (b in words.buzz){
		window.setTimeout("appendword('buzz',"+b+")",14);
	}
	for (b in words.content){
		window.setTimeout("appendword('content',"+b+")",12);
	}
	for (b in words.frequent){
		window.setTimeout("appendword('frequent',"+b+")",13);
	}
	for (b in words.veryfunctional){
		window.setTimeout("appendword('veryfunctional',"+b+")",10);
	}
};
var appendword = function(category,b){
	var span = document.createElement("span");
	addClass(span, category);
	span.setAttribute("style","color:"+randomColor()+";");
	span.innerHTML=words[category][b];
	addClass(span, fonts[b%fonts.length]);
	addClass(span, direction[1]);
	pathposition++;
	addClass(span, "w"+pathposition);
	span.setAttribute("draggable","true");
	cloud.appendChild(span);
};

init();