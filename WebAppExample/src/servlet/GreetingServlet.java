package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class GreetingServlet
 */
public class GreetingServlet extends HttpServlet implements Servlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GreetingServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
	throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
	throws ServletException, IOException {
		
	      response.setContentType("text/html;charset=UTF-8");
	      PrintWriter out = response.getWriter();
	      String firstName = request.getParameter("firstName").toString();
	      System.out.println("firstName = " + firstName);
	      String surname = request.getParameter("surname").toString();
	      System.out.println("surname = " + surname);

	      out.println("<html>");
	      out.println("<head>");
	      out.println("<title>Servlet GreetingServlet</title>");
	      out.println("</head>");
	      out.println("<body>");
	      out.println("<h1>Servlet GreetingServlet at " + request.getContextPath () + "</h1>");
	      out.println("<p>Welcome " + firstName + " " + surname + "</p>");
	      out.println("</body>");
	      out.println("</html>");

	        out.close();	       
	 	}

}
