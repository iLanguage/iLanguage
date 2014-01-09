package module5gateembeddedbasics;


import java.net.URL;
import java.util.Set;

import gate.*;
import gate.creole.SerialAnalyserController;
import gate.gui.MainFrame;
import javax.swing. SwingUtilities;
import java.io.*;

public class Main {
	public static void main(String[] args)
		throws Exception{
	Gate.init();	// prepare the library
	//show the main window
	SwingUtilities.invokeAndWait(new Runnable() {
		
		@Override
		public void run() {
			MainFrame.getInstance().setVisible(true);
		}
	});
	// create a document from a url and encoding	
	//Document doc = Factory.newDocument(new URL("http://gate.ac.uk"), "UTF-8");
	FeatureMap params= Factory.newFeatureMap();
	params.put(Document.DOCUMENT_STRING_CONTENT_PARAMETER_NAME, "This is home");
	params.put(Document.DOCUMENT_URL_PARAMETER_NAME, new URL("http://gate.ac.uk"));
	params.put(Document.DOCUMENT_ENCODING_PARAMETER_NAME, "UTF-8");
	FeatureMap  feats = Factory.newFeatureMap();
	feats.put("Date","2010-08-30");
	
	//create a document by creating a resource, casting it into a document and storing it in doc
	Document doc = (Document) Factory.createResource("gate.corpora.DocumentImpl",params,feats, "This is home,infactory");
	
	//AnnotationSet defaultAnnotations = doc.getAnnotations("Original markups");
	
	Set<String> annotationSetsInDocument = doc.getAnnotationSetNames();

	System.out.print(annotationSetsInDocument.size()); 
	
	for(String annotSet : annotationSetsInDocument){
		AnnotationSet annotTypes = doc.getAnnotations(annotSet);
		System.out.print(annotSet+" contains "+annotTypes.size()+" annotation types");
	}
	//finish later
	
/*
 * Practice creating a language analsyer: a tokenizer
 *
 */
	File pluginsDir = Gate.getPluginsHome();
	File aPluginDir = new File(pluginsDir, "ANNIE");
	Gate.getCreoleRegister().registerDirectories(aPluginDir.toURI().toURL());
	
	LanguageAnalyser analy = (LanguageAnalyser)Factory.createResource("gate.creole.tokeniser.DefaultTokeniser");
	analy.setDocument(doc);
	analy.setCorpus(null);
	//analy.execute();
	
	
	
	
	
	
	SerialAnalyserController pipeline = (SerialAnalyserController)Factory.createResource("gate.creole.SerialAnalyserController");
	Corpus corpusToAnalyze = (Corpus)Factory.createResource("gate.corpora.CorpusImpl");
	corpusToAnalyze.add(doc);
	pipeline.add(analy);
	pipeline.setCorpus(corpusToAnalyze);
	pipeline.execute();
	
	
	}		
}