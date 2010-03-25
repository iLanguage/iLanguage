<%@page import="java.util.Enumeration"%>
<%@ include file="header.jsp" %>
<h3>Search Results</h3>
<P>No database to search in :-)<br /> No control logic to do the search"</P>

<%
	String requestMethod = request.getMethod(); 
	String Query = request.getQueryString();
	Enumeration<String> requestNames = request.getParameterNames();
	
	StringBuffer outPut = new StringBuffer();
	while(requestNames.hasMoreElements()){
		String Name = (String)requestNames.nextElement();
		String[] values = request.getParameterValues(Name);
	        if(values[0]!= ""){
		    	for(int count=0; count < values.length; count++){
					outPut.append("<tr><td>"+ Name +"</td><td>"+values[count]+"</td></tr>");
		    	}
	        }
	}
%>


<p>Your search uses the method: : <b><%= request.getMethod() %></b> <br />

<%= "Your search Query is (only work with the get method): <b>" + request.getQueryString() + "</b></p>" %>

<table border="2"> 
<tr><th>Names</th><th>Values</th></tr>
<%= outPut.toString() %>
</table>

<p>Your server is:  <b><%= application.getServerInfo() %></b> </p>

<%@ include file="footer.jsp" %>
