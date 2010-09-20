def defaultannots = docs[0].getAnnotations();
def pairs = docs[0].annotations.get('pair');
pairs = pairs.findAll{ it.features.quantitiesInHypothesis != "" };
System.out.println("Pairs which have a quantity in the hypothesis: "+pairs.size());

new File("/Users/gina/Documents/workspace2/QuantityInferencer/output.csv").withWriter {out ->

    out.writeLine "Reason"+"\tQuantities in H"+"\tQuantities in Pair"+"\tGoldStandard"+"\tSystemResults";
    pairs.each{
        out.writeLine it.features.aReasoning +
        "\t" + it.features.quantitiesInHypothesis +
        "\t"+ it.features.quantitiesInBoth+
        "\t"+ it.features.entailment+
        "\t"+ it.features.entailResult
        };
}

System.out.println(" ");

System.out.println("\nGold standard:");

def entailment = pairs.findAll{ it.features.entailment =="ENTAILMENT" ||  it.features.entailment == "YES"}.size();
System.out.println("Entailments total: "+entailment);
def contradiction = pairs.findAll{ it.features.entailment =="CONTRADICTION" }.size();
System.out.println("Contradictions total: "+contradiction);
def unknown = pairs.findAll{  it.features.entailment =="UNKNOWN" ||  it.features.entailment == "NO"}.size();
def nos = pairs.findAll{  it.features.entailment == "NO"}.size();
System.out.println("Unknowns total: "+unknown+ " ("+"of which some are the 'no' from RTE4)");

System.out.println("\nSystem's results:");

def entailmentSystem = pairs.findAll{ it.features.entailResult =="ENTAILMENT" }.size();
System.out.println("System's identified entailments total: "+entailmentSystem);
def unknownSystem = pairs.findAll{ it.features.entailResult =="UNKNOWN" }.size();
System.out.println("System's identified unknowns total: "+unknownSystem);
def contradictionSystem = pairs.findAll{ it.features.entailResult =="CONTRADICTION" }.size();
System.out.println("System's identified contradictions total: "+contradictionSystem);
contradictionSystem = 0.1;


System.out.println("\nThree Way System:");

def entailmententailment = pairs.findAll{  ( it.features.entailment =="ENTAILMENT" ||  it.features.entailment == "YES") &&  it.features.entailResult =="ENTAILMENT"}.size();
System.out.println("\tCorrectly found entailments: "+entailmententailment);
def unknownunknown = pairs.findAll{ ( it.features.entailment =="UNKNOWN" ||  it.features.entailment == "NO") &&  it.features.entailResult =="UNKNOWN"}.size();
System.out.println("\tCorrectly found unknown: "+unknownunknown);
def contradictioncontradiction = pairs.findAll{ it.features.entailment =="CONTRADICTION" &&  it.features.entailResult =="CONTRADICTION"}.size();
System.out.println("\tCorrectly found contradiction: "+ contradictioncontradiction);
def totalcorrect =  entailmententailment + unknownunknown + contradictioncontradiction;
System.out.println("\tTotal Correct: "+totalcorrect);


def unknownentailment = pairs.findAll{ ( it.features.entailment =="UNKNOWN" ||  it.features.entailment == "NO") &&  it.features.entailResult =="ENTAILMENT"}.size();
System.out.println("\tUnknown wrongly marked as entailments: "+unknownentailment);
def contradictionentailment = pairs.findAll{ it.features.entailment =="CONTRADICTION" &&  it.features.entailResult =="ENTAILMENT"}.size();
System.out.println("\tContradictions wrongly marked as entailments: "+contradictionentailment);
def entailmentunknown = pairs.findAll{  ( it.features.entailment =="ENTAILMENT" ||  it.features.entailment == "YES") &&  it.features.entailResult =="UNKNOWN"}.size();
System.out.println("\tEntailments incorrectly marked as unknown: "+entailmentunknown);
def contradictionunknown = pairs.findAll{ it.features.entailment =="CONTRADICTION" &&  it.features.entailResult =="UNKNOWN"}.size();
System.out.println("\tContradictions (wrongly) marked as unknown: "+contradictionunknown);
def entailmentcontradiction = pairs.findAll{  ( it.features.entailment =="ENTAILMENT" ||  it.features.entailment == "YES") &&  it.features.entailResult =="CONTRADICTION"}.size();
System.out.println("\tEntailments wrongly marked as contradiction: "+entailmentcontradiction);
def unknowncontradiction = pairs.findAll{ ( it.features.entailment =="UNKNOWN" ||  it.features.entailment == "NO") &&  it.features.entailResult =="CONTRADICTION"}.size();
System.out.println("\tUnknowns (wrongly) marked as contradiction: "+unknowncontradiction);
def totalincorrect =  unknownentailment + contradictionentailment + entailmentunknown + contradictionunknown + entailmentcontradiction + unknowncontradiction;
System.out.println("\tTotal Incorrect: "+totalincorrect);

System.out.println("      Entailments:");
def precision = entailmententailment/entailmentSystem;
def recall = entailmententailment/entailment;
System.out.println("\tPrecision\t"+precision+"\t(correctly identified/total identified)");
System.out.println("\tRecall\t"+recall+"\t(correctly identified/total gold)");
System.out.println("      Unknowns:");
def precisionUnknown = unknownunknown/unknownSystem;
def recallUnknown = unknownunknown/unknown;
System.out.println("\tPrecision\t"+precisionUnknown+"\t(correctly identified/total identified)");
System.out.println("\tRecall\t"+recallUnknown+"\t(correctly identified/total gold)");
System.out.println("      Contradictions:");
def precisionContradiction = contradictioncontradiction/contradictionSystem;
def recallContradiction = contradictioncontradiction/contradiction;
System.out.println("\tPrecision\t"+precisionContradiction+"\t(correctly identified/total identified)");
System.out.println("\tRecall\t"+recallContradiction+"\t(correctly identified/total gold)");

System.out.println("   Average:");
System.out.println("      Precision\t"+((precisionContradiction+precisionUnknown+precision)/3)+"\t(correctly identified/total identified)");
System.out.println("      Recall\t"+((recallContradiction+recallUnknown+recall)/3)+"\t(correctly identified/total gold)");




System.out.println("\nTwo Way System:");
System.out.println("\tEntailment/Yes correctly found entailments: "+entailmententailment);
System.out.println("\tUnknown/No/Contradiction correctly found unknown: " + (unknownunknown + contradictionunknown) );
totalcorrect =  entailmententailment + unknownunknown + contradictionunknown;
System.out.println("\tTotal Correct: "+totalcorrect);

def noentailment = pairs.findAll{ ( it.features.entailment =="UNKNOWN" || it.features.entailment == "NO" ||  it.features.entailment =="CONTRADICTION") &&  it.features.entailResult =="ENTAILMENT"}.size();
System.out.println("\tUnknown/No/Contradiction wrongly marked as entailments: "+noentailment);
def nounknown = pairs.findAll{ (  it.features.entailment =="ENTAILMENT" ||  it.features.entailment == "YES" ) &&  it.features.entailResult =="UNKNOWN"}.size();
System.out.println("\tEntailment/Yes wrongly marked as unknown: "+nounknown);
totalincorrect =  noentailment+nounknown;
System.out.println("\tTotal Incorrect: "+totalincorrect);


System.out.println("      Entailments:");
def precision2 = entailmententailment/entailmentSystem;
def recall2 = entailmententailment/entailment;
System.out.println("\tPrecision\t"+precision2+"\t(correctly identified/total identified)");
System.out.println("\tRecall\t"+recall2+"\t(correctly identified/total gold)");
System.out.println("      Unknowns:");
def precisionUnknown2 =(unknownunknown + contradictionunknown)/unknownSystem;
def recallUnknown2 = (unknownunknown + contradictionunknown)/(unknown + contradiction);
System.out.println("\tPrecision\t"+precisionUnknown2+"\t(correctly identified/total identified)");
System.out.println("\tRecall\t"+recallUnknown2+"\t(correctly identified/total gold)");


System.out.println("   Average:");
System.out.println("      Precision\t"+((precisionUnknown2+precision2)/2)+"\t(correctly identified/total identified)");
System.out.println("      Recall\t"+((recallUnknown2+recall2)/2)+"\t(correctly identified/total gold)");
System.out.println("   F score: "+( ((precisionUnknown2+precision2)/2)+((recallUnknown2+recall2)/2) )/2);


def tokencount = docs[0].annotations.get('Token').size()
System.out.println("The corpus is "+tokencount+"  words.")

def numbers = docs[0].annotations.get('Number')
def numbercount = numbers.size()
System.out.println("There were "+numbercount+"  numbers identified.")

def easynumbercount = numbers.findAll{ it.features.kind =="token_digit_number" }.size()
def hardnumbercount = numbercount - easynumbercount
System.out.println(easynumbercount +" "+(easynumbercount/numbercount)+" were already found by the ANNIE English tokenizer, " + hardnumbercount + " "+ (hardnumbercount/numbercount)+" were assembled and annotated by the Quantity inferencer system.") 

