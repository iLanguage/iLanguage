<%@ include file="header.jsp" %>

<form id="search" name="search" method="post" action="search_results.jsp">
<h3>Basic search</h3>
<table>
<tr><td><span style="font-weight: bold">Enter a location<br />
      <input name="query" type="text" value="" size="60" />
</span></td>
</tr>
<tr><td><input type="submit" value="search" /></td></tr>
</table>
</form>

<a href="javascript:showAdvanced()" id="link">+ Advanced Search</a> 
 
<form id="advanced" name="advanced" method="post" action="search_results.jsp" style="visibility: hidden">
<h3> Advanced Search </h3>
<table>
<tr><td><span style="font-weight: bold">Enter a location<br />
      <input name="query" type="text" value="" size="60" />
</span></td></tr>
<!-- <tr><td><b>Location</b><br /><input name="location" type="text" value="" size="60" /></td></tr> -->
<tr><td><b>Type</b><br /><input name="type" type="text" value="" size="60" /></td></tr>
<tr><td>capacity<br /><input name="capacity" type="text" value="" size="60" /></td></tr>
<tr><td><b>Location Name</b><br /><input name="locationName" type="text" value="" size="60" /></td></tr>
<tr><td>Date last updated<br /><input name="dateLastUpdated" type="text" value="" size="60" /></td></tr>
<tr><td>Contact Person<br /><input name="contactPerson" type="text" value="" size="60" /></td></tr>
<tr><td>Person Assigned into location<br /><input name="assignedPerson" type="text" value="" size="60" /></td></tr>
<tr><td><input type="submit" value="search" /></td></tr>
</table>
</form>


<%@ include file="footer.jsp" %>
