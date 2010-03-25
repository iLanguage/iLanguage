<!-- right side of the web page -->

</div>
<div id="right">  <!-- The left panel -->
    <div id="space">
    <h3>Space Inventory</h3>
	  <table width="220" height="100" border="0">
	  <tr valign=top><td width="160" height="100" valign="top">
	  <img src="images/floorplan_zoom_selection.png" width="150" alt="Space Inventory Image" align="left"/></td>
	  <td width="60" height="100" valign="top">
      <ul>
	  <li><a href="">View</a></li>
      <li><a href="">Edit</a></li>
      <li><a href="search_location.jsp">Search</a></li>
      </ul>
	  </td></tr></table>	
	 </div>
    
	<div id="assets">
    <h3>Assets Inventory</h3>      
	<table width="220" height="210" border="0">
	  <tr valign=top><td width="160" height="210" valign="middle">
	<img src="images/assets_ontology.png" width="150" alt="Assets Inventory Image" align="left"/>
	</td><td width="60" height="210" valign="top">
	  <ul>
	    <li><a href="add_asset.jsp">Add</a></li>
	    <li><a href="search_asset.jsp">Search</a></li>
	    <li><a href="create_group.jsp">Create Group</a> </li>
	    </ul></td>
	  </tr></table>
     </div>

    <div id="software">
    <h3>Software Inventory</h3>
	<table width="220" height="210" border="0">
	  <tr valign=top><td width="160" height="210" valign="middle">
	<img src="images/software_module.png" width="150" alt="Software Inventory Image" align="left"/></td>
	  <td width="60" height="210" valign="top">
      <ul>
	      <li><a href="">View</a></li>
          <li><a href="">Edit</a></li>
          <li><a href="search_software.jsp">Search</a></li>
    </ul></td>
	  </tr></table>
	 </div>

     <div id="others">
     <h3>Other Inventory Actions</h3>
     <ul>
        <li><a href="">Submit Inventory Change Request</a></li>
        <li><a href="">Report Inventory Problem</a></li>
	  	<li><a href="">Control Panel</a></li>
	 </ul> 
	 </div>	 
</div>


<!-- footer  -->
<%=
"	</div>  <!-- end of div content -->"+ 
"<div id=\"footer\">Copyright<br /> IufA\'s Unified University Inventory System (UUIS)"+
"</div></body>	</html>"
%>

