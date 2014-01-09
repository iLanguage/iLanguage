package module7creoleplugin;
/*
 * This file is part of a hands-on exercise for the third GATE training course,
 * Montreal, August/September 2010.  It is released under the GNU Lesser
 * General Public Licence version 3.0, a copy of which is available at
 * http://gate.ac.uk/gate/licence.html
 *
 * Original code (c) 2010 The University of Sheffield.
 */


import javax.swing.*;
import gate.*;
import gate.creole.*;
import gate.creole.metadata.CreoleResource;
import gate.creole.metadata.GuiType;
import gate.event.FeatureMapListener;

@CreoleResource(name="Statistics Viewer", 
        comment="Shows document statistics",
        resourceDisplayed="gate.Document",
        guiType=GuiType.LARGE,
        mainViewer=true)
public class StatsViewer extends AbstractVisualResource implements FeatureMapListener {
  private JTextPane textPane;
  private FeatureMap targetFeatures;
  
  @Override
  public Resource init() throws ResourceInstantiationException {
    textPane = new JTextPane();
    add(new JScrollPane(textPane));
    return this;
  }

  @Override
  public void setTarget(Object target) {
    if(targetFeatures != null) targetFeatures.removeFeatureMapListener(this);
    targetFeatures = ((Document)target).getFeatures();
    targetFeatures.addFeatureMapListener(this);
    featureMapUpdated();
  }

  public void featureMapUpdated() {
    textPane.setText(targetFeatures.toString()+"\n\n"); 
  } 
}
