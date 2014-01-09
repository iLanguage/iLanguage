// Implement this Groovy script to:
// - annotate all instances of the word "goldfish" (case-insensitive) in the
//   input document
// - add a feature "numFish" to each Sentence annotation giving the number of
//   Goldfish annotations contained in the sentence.
//
// You can assume that this script will run after the tokeniser and sentence
// splitter, so your inputAS will contain Token, SpaceToken and Sentence
// annotations.
//
// If you have time, you could experiment with using scriptParams for things
// like the string to search for, the target annotation type, the feature name
// for the Sentences, etc.

tokens = doc.annotations["Token"]

tokens.findAll{
	it.features.string =~ /[G|g]oldfish/
}.each{
	
	//Featuremap fm = a.features.put("string","Goldfish")
	FeatureMap fm = Factory.newFeatureMap();
	fm.Goldfish="goldfish"
	//fm.put("Goldfish","goldfish")
	outputAS.add(it.start,it.end,"Goldfish",fm)
	
	System.out.println("The goldfish token is is "+doc.stringFor(it))
		
}
sentences = doc.annotations["Sentence"]
sentences.findAll{
	it.features.string =="Sentence"
}.each{
	System.out.println("The sentence is "+doc.stringFor(it))
}

