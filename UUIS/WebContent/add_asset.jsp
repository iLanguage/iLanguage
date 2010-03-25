<%@ include file="header.jsp" %>

<%!
    // define the variables
    String Barcode, Owner, REQ, PON, LegacyCode, DatePurchased, WarrantyExpiration,
    Manufacturer, LocationName, Model; 
    String[] Description; 
%>    
<%
    // if user comes in this page because he did not entered correct information before
    // he will no want to retype everything he wrote before
    // we need to have an http request when we come to this page
    
	if(request.getParameterValues("Owner") == null){ Owner = " ";}
	else{Owner = request.getParameterValues("Owner")[0];}
	
	if(request.getParameterValues("Barcode") == null){ Barcode = " ";}
	else{Barcode = request.getParameterValues("Barcode")[0];}
	
	if(request.getParameterValues("REQ") == null){ REQ = " ";}
	else{REQ = request.getParameterValues("REQ")[0];}
	
	if(request.getParameterValues("PON") == null){ PON = " ";}
	else{PON = request.getParameterValues("PON")[0];}
	
	if(request.getParameterValues("LegacyCode") == null){ LegacyCode = " ";}
	else{LegacyCode = request.getParameterValues("LegacyCode")[0];}
	
	if(request.getParameterValues("DatePurchased") == null){ DatePurchased = " ";}
	else{DatePurchased = request.getParameterValues("DatePurchased")[0];}
	
	if(request.getParameterValues("WarrantyExpiration") == null){ WarrantyExpiration = " ";}
	else{WarrantyExpiration = request.getParameterValues("WarrantyExpiration")[0];}
	
	if(request.getParameterValues("Manufacturer") == null){ Manufacturer = " ";}
	else{Manufacturer = request.getParameterValues("Manufacturer")[0];}
	
	if(request.getParameterValues("LocationName") == null){ LocationName = " ";}
	else{LocationName = request.getParameterValues("LocationName")[0];}
	
	if(request.getParameterValues("Model") == null){ Model = " ";}
	else{Model = request.getParameterValues("Model")[0];}
	
	if(request.getParameterValues("Description") == null)
	{ Description = new String[1]; Description[0] = " ";}
	else{Description = request.getParameterValues("Description");}
%>

<form id="addAsset" name="addAsset" method="post" action="#">
<h3>Add an Asset</h3>
<table id="table">
<tr><td><span style="font-weight: bold">Barcode(*)<br /><input name="Barcode" type="text" value="<%= Barcode%>" size="60" /></span></td></tr>
      
<tr><td><span style="font-weight: bold">Owner- Faculty(*)<br />
<input name="Owner" type="text" value="<%= Owner%>" size="60" /></span></td></tr>

<tr><td><span style="font-weight: bold">Purchase requisition number<br />
<input name="REQ" type="text" value="<%= REQ%>" size="60" /></span></td></tr>

<tr><td><span style="font-weight: bold">Purchase order number<br />
<input name="PON" type="text" value="<%= PON%>" size="60" /></span></td></tr>

<tr><td><span style="font-weight: bold">Legacy Code<br />
<input name="LegacyCode" type="text" value="<%= LegacyCode%>" size="60" /></span></td></tr>

<tr><td><span style="font-weight: bold">Date Purchased (YYYY-MM-DD)<br />
<input name="DatePurchased" type="text" value="<%= DatePurchased%>" size="60" maxlength="10" /></span></td></tr>

<tr><td><span style="font-weight: bold">Warranty Expiration (YYYY-MM-DD)<br />
<input name="WarrantyExpiration" type="text" value="<%= WarrantyExpiration%>" size="60" maxlength="10" /></span></td></tr>

<tr><td><b>Location</b><br /><input name="LocationName" type="text" value="<%= LocationName%>" size="60" /></td></tr>

<tr><td><span style="font-weight: bold">Category (*)</span><br />
    <input type="radio" name="Category" value="Furniture" /> 
    Furniture
<br />
<input type="radio" name="Category" value="Equipment" /> Equipment
</td>
</tr>
<tr><td id="description1"><span style="font-weight: bold">Manufacturer</span><br />
  <input name="Manufacturer" type="text" value="<%= Manufacturer%>" size="60" /></td></tr>
  
<tr><td><span style="font-weight: bold">Model</span><br />
  <input name="Model" type="text" value="<%= Model%>" size="60" /></td></tr> 

 

    <tr id="list"><td><span style="font-weight: bold">Description </span><br />
    <select>
    <option value="rfromdatabase">Retrieve list element from database</option>
    <% 
 // drop down list from the database
    for(int i=0; i<Description.length;++i){
    	out.print("<option value=\""+ Description[i]+ "\"</option>");    	
    	}
    %>
   </select>
   </td></tr>
  
<tr><td><button onclick="addRow('table')">Add Description</button></td></tr>
</table>

<table>
<tr><td><span style="font-weight: bold">Status</span><br />
    <select name="select">
      <!-- Will be populated by the database -->
      <option value="Available" selected="selected">Available</option>
      <option value="On Hold">On Hold</option>
      <option value="Taken">Taken</option>
      <option value="given">Given</option>
      <option value="lost">lost</option>
    </select>
	</td></tr>

<tr><td><br /><input type="submit" value="Add an asset" onclick="return validateAdd()"/></td></tr>
</table>
</form>


<%@ include file="footer.jsp" %>


  