package module7creoleplugin;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.swing.Action;
import javax.swing.SwingUtilities;

import gate.Annotation;
import gate.AnnotationSet;
import gate.Gate;
import gate.Resource;
import gate.creole.AbstractLanguageAnalyser;
import gate.creole.ExecutionException;
import gate.creole.ResourceInstantiationException;
import gate.creole.metadata.CreoleParameter;
import gate.creole.metadata.CreoleResource;
import gate.creole.metadata.Optional;
import gate.creole.metadata.RunTime;
import gate.gui.ActionsPublisher;
import gate.gui.MainFrame;
@CreoleResource(name = "Document Stats", comment = "Calculates document statistics")
public class DocStats extends AbstractLanguageAnalyser implements ActionsPublisher{

	@Override
	public List getActions() {
		// TODO Auto-generated method stub
		//action to reset
		Action resetIt 
		//action to display current total 
		return null;
	}
	private String tokenToCount;
	private String inputASName;
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
	
}
