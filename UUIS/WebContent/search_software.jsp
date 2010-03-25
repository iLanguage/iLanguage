<%@ include file="header.jsp" %>


<form id="search" name="search" method="post" action="search_results.jsp" >
<h3>Basic Search</h3>
<table>
<tr><td><span style="font-weight: bold">Name of the software<br />
      <input name="query" type="text" value="" size="60" />
</span></td>
</tr>
<tr><td><input type="submit" value="search" /></td></tr>
</table>
</form>
<a href="javascript:showAdvanced()" id="link">+ Advanced Search</a>  
<form id="advanced" name="advanced" method="post" action="search_results.jsp" style="visibility: hidden">
<h3>Advanced Search</h3>
<table>
<tr><td><b>Name of the software</b><br /><input name="query" type="text" value="" size="60" /></td></tr>
<tr><td><b>Vendor</b><br /><input name="vendor" type="text" value="" size="60" /></td></tr>
<tr><td><b>Title</b><br /><input name="title" type="text" value="" size="60" /></td></tr>
<tr><td>Version<br /><input name="version" type="text" value="" size="60" /></td></tr>
<tr><td><b>License</b><br /><input name="license" type="text" value="" size="60" /></td></tr>
<tr><td>License expiry date<br /><input name="expiryDate" type="text" value="" size="60" /></td></tr>
<tr><td>Contact person<br /><input name="contact" type="text" value="" size="60" /></td></tr>
<tr><td>Purchase number<br /><input name="pon" type="text" value="" size="60" /></td></tr>
<tr><td>Purchase number<br />
  <input name="rec" type="text" value="" size="60" /></td>
</tr>
<tr><td><input type="submit" value="search" /></td></tr>
</table>
</form>


<%@ include file="footer.jsp" %>
