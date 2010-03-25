<%@ include file="header.jsp" %>

<form id="search" name="search" method="post" action="search_results.jsp" onsubmit="validateField(query)">
<h3>Basic Search</h3>
<table>
<tr><td width="432"><span style="font-weight: bold">Name<br />
      <input name="AssetName" type="text" size="60" /></span></td></tr>
<tr><td><br /><input type="submit" value="search" /></td></tr>
</table>
</form>

<p><a href="javascript:showAdvanced()" id="link">+ Advanced Search</a> </p>
 
<form id="advanced" name="advanced" method="post" action="search_results.jsp" style="visibility: hidden">
<h3>Advanced Search</h3>
<table>
<tr><td><span style="font-weight: bold">Asset ID<br><input name="AssetID" type="text" value="" size="60" ></span></td></tr>
<tr><td><span style="font-weight: bold">BarCode<br><input name="BarCode" type="text" value="" size="60" ></span></td></tr>
<tr><td><span style="font-weight: bold">Owner - Faculty<br ><input name="Owner" type="text" value="" size="60" ></span></td></tr>
<tr><td><span style="font-weight: bold">Purchase order number<br ><input name="PON" type="text" value="" size="60" ></span></td></tr>
<tr><td><span style="font-weight: bold">Purchase requisition number<br /><input name="REQ" type="text" value="" size="60" ></span></td></tr>
<tr><td><span style="font-weight: bold">Legacy Code<br /><input name="LegacyCode" type="text" value="" size="60" ></span></td></tr>
<tr><td><span style="font-weight: bold">Date Purchased Range<br >
From <input name="LowerBound" type="text" value="" size="20" maxlength="10" /> to <input name="UpperBound" type="text" value="" size="20" maxlength="10" >
</span></td></tr>

<tr><td><span style="font-weight: bold">Warranty expiration date range<br />
From <input name="LowerBound" type="text" value="" size="20" maxlength="10" /> to <input name="UpperBound" type="text" value="" size="20" maxlength="10" >
</span></td></tr>

      
<tr><td><b>Category</b><br />
<select name="Category">
  <option value="Equipment" selected="selected">Equipment</option>
  <option value="Furniture">Furniture</option>
</select>
</td></tr>

<tr><td><b>Location</b><br ><input name="LocationName" type="text" value="" size="60" /></td></tr>
<tr><td><b>Manufacturer</b><br ><input name="Manufacturer" type="text" value="" size="60" /></td></tr>

<tr><td><b>Status</b><br >
<select name="Status">
  <option value="Available">Available</option>
  <option value="On Hold">On Hold</option>
  <option value="Taken">Taken</option>
</select>
</td></tr>


<tr><td><div align="left"><br />
        <input type="submit" value="search"/>
</div></td></tr>
</table>
</form>


<%@ include file="footer.jsp" %>
