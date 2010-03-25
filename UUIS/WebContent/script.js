  

           
  function show(id) {
	var sho = document.getElementById(id);		
	sho.style.visibility = 'visible';		
  }

  function hide(id){
	var hidden = document.getElementById(id);
	hidden.style.visibility = 'hidden';
  }
    
  function remove(id) {
       var element = document.getElementById(id);
       element.parentNode.removeChild(element);
  }

  function swap(id1, id2){
	var el1 = document.getElementById(id1);
	var el2 = document.getElementById(id2);
	el1.parentNode.insertBefore(el1, el2);
  }
  
  function showAdvanced(){
	hide('search');
	hide('link');
	swap('advanced','search');
	show('advanced');
  }

  function validateAdd(){	  
	  
	  var Barcode=document.addAsset.Barcode;
	  if (Barcode.value==null || Barcode.value==" "){
	      alert("Enter the barcode");
	      Barcode.focus();
	      return false;
      }
	  
	 var Owner=document.addAsset.Owner; 
	 if(Owner.value==null ||Owner.value==" "){
	      alert("Enter the owner name");
	      Owner.focus();
	      return false;
      }
	  
	 /*
	  var Category=document.addAsset.Category;
	  if(Category.value==null || Category.value==" "){
	      alert("Select a category");
	      // Category.focus();
	      return false;
      }	   
      */ 
    
    return true;       
  }
  
  function addDescription(){
	  remove('description2');
	  var fdes = document.getElementById('description1');
	  var sdes;;
	  sdes = fdes.cloneNode();
	  document.write(sdes);
	  document.write("<tr><td id=\"description2\"><span style=\"font-weight: bold\"><a href=\"#\">Add a description</a></span><br /></td></tr>");
  }

  function newList(){
	  var newdiv = document.createElement('select');
	  newdiv.setAttribute('name',Status);

  }
  
  function addRow(id){
	  var tbody = document.getElementById(id).getElementsByTagName("tbody")[document.getElementById(id).rows.length];
	  var row = document.createElement("tr");
	  var newline = document.createElement("br");
	  var cell = document.createElement("td");	  
	  //var input = document.createElement("input");
	  //input.setAttribute("type","text");
	  //input.setAttribute("name","Description");   
	  
	  
	  
	  cell.appendChild(input);
	  row.appendChild(cell);
	  tbody.appendChild(cell);
}
  function addRowToTable(id)
  {
    var tbl = document.getElementById(id);
    var lastRow = tbl.rows.length;
    // if there's no header row in the table, then iteration = lastRow + 1
    var iteration = lastRow;
    var row = tbl.insertRow(lastRow);
    
    
    var cell = row.insertCell(0);
    //var input = document.createElement("input");
	//input.setAttribute("type","text");
	//input.setAttribute("name","Description");
    //input.onkeypress = keyPressTest;
    //cell.appendChild(input);
    
    /*
    // left cell
    var cellLeft = row.insertCell(0);
    var textNode = document.createTextNode(iteration);
    cellLeft.appendChild(textNode);
    
    // right cell
    var cellRight = row.insertCell(1);
    var el = document.createElement('input');
    el.type = 'text';
    el.name = 'txtRow' + iteration;
    el.id = 'txtRow' + iteration;
    el.size = 40;
    
    el.onkeypress = keyPressTest;
    cellRight.appendChild(el);
    
    // select cell
    var cellRightSel = row.insertCell(2);
    var sel = document.createElement('select');
    sel.name = 'selRow' + iteration;
    sel.options[0] = new Option('text zero', 'value0');
    sel.options[1] = new Option('text one', 'value1');
    cellRightSel.appendChild(sel);
    
    */
    
  }

  
  
function addR(tableID) {	 
    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "checkbox";
    cell1.appendChild(element1);

    var cell2 = row.insertCell(1);
    cell2.innerHTML = rowCount + 1;

    var cell3 = row.insertCell(2);
    var element2 = document.createElement("input");
    element2.type = "text";
    cell3.appendChild(element2);
}
