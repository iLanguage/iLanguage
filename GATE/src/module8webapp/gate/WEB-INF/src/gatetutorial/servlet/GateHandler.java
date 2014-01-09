/*
 * This file is part of a hands-on exercise for the third GATE training course,
 * Montreal, August/September 2010.  It is released under the GNU Lesser
 * General Public Licence version 3.0, a copy of which is available at
 * http://gate.ac.uk/gate/licence.html
 *
 * Original code (c) 2010 The University of Sheffield.
 */
package gatetutorial.servlet;

import gate.Corpus;
import gate.CorpusController;
import gate.Document;
import gate.Factory;
import gate.Utils;
import gate.creole.ExecutionException;
import gate.creole.ResourceInstantiationException;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.HttpRequestHandler;

/**
 * Simple HttpRequestHandler that uses a GATE application to process
 * some text as a GATE document and render the document's features as an
 * HTML table.
 */
public class GateHandler implements HttpRequestHandler {
  
  private static final Logger log = Logger.getLogger(GateHandler.class);

  /**
   * Atomic counter that we use to obtain a unique ID for each handler
   * instance.
   */
  private static AtomicInteger nextId = new AtomicInteger(1);

  /**
   * The ID of this handler instance.
   */
  private int handlerId;

  /**
   * The application that will be run.
   */
  private CorpusController application;

  /**
   * A corpus that will be used to hold the document being processed.
   */
  private Corpus corpus;

  /**
   * Set the application that will be run over the documents.
   */
  public void setApplication(CorpusController application) {
    this.application = application;
  }

  /**
   * Create the corpus. The PostConstruct annotation means that this
   * method will be called by spring once the handler object has been
   * constructed and its properties (i.e. the application) have been
   * set.
   */
  @PostConstruct
  public void init() throws Exception {
    handlerId = nextId.getAndIncrement();
    log.info("init() for GateHandler " + handlerId);
    // create a corpus and give it to the controller
    corpus = Factory.newCorpus("webapp corpus");
    application.setCorpus(corpus);
  }

  /**
   * Clean-up method. The PreDestroy annotation means that Spring will
   * call the method when the object is no longer required.
   */
  @PreDestroy
  public void cleanup() throws Exception {
    log.info("cleanup() for GateHandler " + handlerId);
    Factory.deleteResource(corpus);
    Factory.deleteResource(application);
  }

  /**
   * Handle a request.
   */
  public void handleRequest(HttpServletRequest request,
          HttpServletResponse response) throws ServletException, IOException {
    log.info("Handler " + handlerId + " handling request");
    // we take the text to annotate from a form field
    String text = request.getParameter("text");
    // the form also allows you to provide a mime type
    String mime = request.getParameter("mime");
    
    // delay parameter to fake a long-running process
    int delay = 0;
    String delayParam = request.getParameter("delay");
    if(delayParam != null) {
      try {
        delay = Integer.parseInt(delayParam);
      }
      catch(NumberFormatException e) {
        log.warn("Failed to parse delay value " + delayParam + ", ignored", e);
      }
    }

    Document doc = null;
    try {
      log.debug("Creating document");
      doc = (Document)Factory.createResource("gate.corpora.DocumentImpl",
                  Utils.featureMap("stringContent", text, "mimeType", mime));
    }
    catch(ResourceInstantiationException e) {
      failureMessage("Could not create GATE document for input text", e,
              response);
      return;
    }
    try {
      corpus.add(doc);
      log.info("Executing application");
      application.execute();
      // fake a long-running application by sleeping for delay seconds
      try {
        Thread.sleep(delay * 1000);
      }
      catch(InterruptedException e) {
        // re-interrupt self
        Thread.currentThread().interrupt();
      }
      log.info("Application completed");
      successMessage(doc, response);
    }
    catch(ExecutionException e) {
      failureMessage("Error occurred which executing GATE application", e,
              response);
    }
    finally {
      // remember to do the clean-up tasks in a finally
      corpus.clear();
      log.info("Deleting document");
      Factory.deleteResource(doc);
    }
  }

  /**
   * Render the document's features in an HTML table.
   */
  private void successMessage(Document doc, HttpServletResponse response)
          throws IOException {
    response.setContentType("text/html");
    PrintWriter w = response.getWriter();
    w.println("<html>");
    w.println("<head>");
    w.println("<title>Results - GATE handler " + handlerId + "</title>");
    w.println("</head>");
    w.println("<body>");
    w.println("<h1>Document features: GATE handler " + handlerId + "</h1>");
    w.println("<table>");
    w.println("<tr><td><b>Name</b></td><td><b>Value</b></td></tr>");
    for(Map.Entry<Object, Object> entry : doc.getFeatures().entrySet()) {
      w.println("<tr><td>" + entry.getKey() + "</td><td>" + entry.getValue()
              + "</td></tr>");
    }
    w.println("</table>");
    w.println("</body>");
    w.println("</html>");
  }

  /**
   * Simple error handler - you would obviously use something more
   * sophisticated in a real application.
   */
  private void failureMessage(String message, Exception e,
          HttpServletResponse response) throws IOException {
    response.setContentType("text/html");
    PrintWriter w = response.getWriter();
    w.println("<html>");
    w.println("<head>");
    w.println("<title>Error - GATE handler " + handlerId + "</title>");
    w.println("</head>");
    w.println("<body>");
    w.println("<h1>Error in GATE handler " + handlerId + "</h1>");
    w.println("<p>" + message + "</p>");
    if(e != null) {
      w.println("<pre>");
      e.printStackTrace(w);
      w.println("</pre>");
    }
    w.println("</body>");
    w.println("</html>");
  }
}
