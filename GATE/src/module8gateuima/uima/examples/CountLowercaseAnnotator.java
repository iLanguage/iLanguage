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
import java.util.Iterator;

import gate.uima.cas.*;

public class CountLowercaseAnnotator extends JTextAnnotator_ImplBase {
  public void process(JCas jCas, ResultSpecification rs)
               throws AnnotatorProcessException {
    JFSIndexRepository indexRep = jCas.getJFSIndexRepository();
    FSIndex tokenIndex = indexRep.getAnnotationIndex(Token.type);
    Iterator tokens = tokenIndex.iterator();
    while(tokens.hasNext()) {
      Token tok = (Token)tokens.next();
      String tokenString = tok.getString();
      if(tokenString != null) {
        int tokenLength = tokenString.length();
        int numLowerCase = 0;
        for(int i = 0; i < tokenLength; i++) {
          if(Character.isLowerCase(tokenString.charAt(i))) {
            numLowerCase++;
          }
        }
        tok.setLowerCaseLetters(numLowerCase);
      }
    }
  }
}
