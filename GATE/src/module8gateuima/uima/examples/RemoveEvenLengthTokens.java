/*
 *  Copyright (c) 2005, The University of Sheffield.
 *
 *  This file is part of the GATE/UIMA integration layer, and is free
 *  software, released under the terms of the GNU Lesser General Public
 *  Licence, version 2.1 (or any later version).  A copy of this licence
 *  is provided in the file LICENCE in the distribution.
 *
 *  UIMA is a product of IBM, details are available from
 *  http://alphaworks.ibm.com/tech/uima
 */
package gate.uima.examples;

import org.apache.uima.analysis_engine.annotator.JTextAnnotator_ImplBase;
import org.apache.uima.analysis_engine.annotator.AnnotatorProcessException;
import org.apache.uima.analysis_engine.ResultSpecification;
import org.apache.uima.jcas.JCas;
import org.apache.uima.jcas.JFSIndexRepository;
import org.apache.uima.cas.FSIndex;
import org.apache.uima.cas.FSIndexRepository;
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;

import gate.uima.cas.*;

public class RemoveEvenLengthTokens extends JTextAnnotator_ImplBase {
  public void process(JCas jCas, ResultSpecification rs)
               throws AnnotatorProcessException {
    JFSIndexRepository indexRep = jCas.getJFSIndexRepository();
    FSIndexRepository fsIndexRep = indexRep.getFSIndexRepository();
    List tokensToRemove = new ArrayList();
    FSIndex tokenIndex = indexRep.getAnnotationIndex(Token.type);
    Iterator tokens = tokenIndex.iterator();
    while(tokens.hasNext()) {
      Token tok = (Token)tokens.next();
      if(((tok.getEnd() - tok.getBegin()) % 2) == 0) {
        // mark token for removal if it has an even-length span
        tokensToRemove.add(tok);
      }
    }

    // now iterate over tokens marked for removal and remove them from the
    // index
    Iterator tokensToRemoveIt = tokensToRemove.iterator();
    while(tokensToRemoveIt.hasNext()) {
      fsIndexRep.removeFS((Token)tokensToRemoveIt.next());
    }
  }
}
