package module7creoleplugin;

	import java.util.HashMap;
	import java.util.Map;
	import java.util.Set;

	import javax.swing.SwingUtilities;

	import gate.Annotation;
	import gate.AnnotationSet;
	import gate.Controller;
	import gate.CorpusController;
	import gate.Gate;
	import gate.Resource;
	import gate.creole.AbstractLanguageAnalyser;
	import gate.creole.ControllerAwarePR;
	import gate.creole.ExecutionException;
	import gate.creole.ResourceInstantiationException;
	import gate.creole.metadata.CreoleParameter;
	import gate.creole.metadata.CreoleResource;
	import gate.creole.metadata.Optional;
	import gate.creole.metadata.RunTime;
	import gate.gui.MainFrame;
	@CreoleResource(name = "Document Stats", comment = "Calculates document statistics")
	public class CorpusStats extends AbstractLanguageAnalyser implements ControllerAwarePR{

		private String tokenToCount;
		private String inputASName;
		private String wordCount;
		private String verbCount;
		public Resource init()
			throws ResourceInstantiationException{
			System.out.print("Resource initialized");
			return this; 
		}
		public void execute()
			throws ExecutionException{
			System.out.print("Resource executing");
			
			AnnotationSet as= document.getAnnotations();
			Map<String,Integer> types = new HashMap<String,Integer>();
			for (Annotation a : as){
				String type = a.getType();
				if (types.containsKey(type)){
					//increase the count
				}else{
					//insert
				}
			}
			
			int tokens = document.getAnnotations().get(tokenToCount).size();
			document.getFeatures().put("token_count", tokens);
			setWordCount(getWordCount()+tokens);
			
		}
		@RunTime
		@CreoleParameter(defaultValue="Token", comment="The name for the annotation to count.")
		public void setTokenToCount(String tokenType){
			tokenToCount = tokenType;
		}
		public String getTokenToCount(){
			return tokenToCount;
		}
		public String getInputASName(){
			return inputASName;
		}
		@RunTime
		@Optional
		@CreoleParameter(defaultValue="",comment="The annotation set which contains the annotation types to work on.")
		public void setInputASName(String inputAS){
			inputASName=inputAS;
		}
		
		
		public void setWordCount(String wordCountIN){
			wordCount=wordCountIN;
		}
		public String getWordCount(){
			return wordCount;
		}
		public void setVerbCount(String verbCountIn){
			verbCount=verbCountIn;
		}
		public String getVerbCount(){
			return verbCount;
		}
		@Override
		public void controllerExecutionAborted(Controller arg0, Throwable arg1)
				throws ExecutionException {
			System.out.print("Something went wrong, sorry :)");
			
		}
		@Override
		public void controllerExecutionFinished(Controller arg0)
				throws ExecutionException {
			//check whether running in CorpusController
			if(arg0 instanceof CorpusController){
				//put the total into the controllers corpus
				corpus.getFeatures().put("word_count", wordCount);
				corpus.getFeatures().put("verb_count", verbCount);
			}
		}
		@Override
		public void controllerExecutionStarted(Controller arg0)
				throws ExecutionException {
			setWordCount("0");
			setVerbCount("0");
			
		}
		
		
	}
