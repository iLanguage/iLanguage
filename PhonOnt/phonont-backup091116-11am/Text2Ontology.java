
/**
 * 
 */
package com.racersystems.jracer;
import java.io.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
/**
 * @author gina
 *
 */
public class Text2Ontology {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		String s = null;
		String pythonPath = "C:\\Python26\\python.exe";
		String corporaPath ="pythonsrc\\data\\";
		String corpusFileName = "Default";
		//String[] corporaFileNames = {"English","br-phono.txt-unicode.txt"};
		String[] corporaFileNames = {"German","german-mommsen-Roemische_Geschichte-Book01.utf8.txt","English","english-1_Harry_Potter_and_the_Sorcerers_Stone.txt","French","french-1_Harry_Potter_et_la_Pierre_Philosophale.utf8.v2.txt","Romanian","romanian-ziare.0.v5sentences-cleaned.utf8.txt","Passamaquoddy","passamaquoddy-TalesFromMaliseet.utf8.txt","UrduRomanized","urdu-forum-060427aagar.aap.ke.pechey.kotta.lag.jaey.v4-notimes.txt","Spanish","spanish-1_Harry_Potter_y_la_Piedra_Filosofal-cleaned.utf8.txt","InuktitutRomanized", "InukMagazine102-104rough-inuktitut.utf8.txt","Inuktitut","assembly.nu.news-innuktitut.txt","Finnish","leipzig-fi.txt"};
		//String[] corporaFileNames = { "German","german-mommsen-Roemische_Geschichte-Book01.utf8.txt","English", "assembly.nu.news-eng-nolines.utf8textpad.utf8.v2.txt","English","english-1_Harry_Potter_and_the_Sorcerers_Stone.txt","French","french-1_Harry_Potter_et_la_Pierre_Philosophale.utf8.v2.txt","Romanian","romanian-ziare.0.v5sentences-cleaned.utf8.txt","Passamaquoddy","passamaquoddy-TalesFromMaliseet.utf8.txt","UrduRomanized","urdu-forum-060427aagar.aap.ke.pechey.kotta.lag.jaey.v4-notimes.txt","Spanish","spanish-1_Harry_Potter_y_la_Piedra_Filosofal-cleaned.utf8.txt","Spanish","spanish-blog-050301-080330blogworkorange.utf8.txt","MalayCodeSwitching","malay-060918KL.malay.blog.corpus.v3.txt","InuktitutRomanized", "InukMagazine102-104rough-inuktitut.utf8.txt","Inuktitut","assembly.nu.news-innuktitut.txt","Finnish","leipzig-fi.txt","Turkish","leipzig-tr.txt","Korean","leipzig-kr.utf8.txt"};
		//String[] corporaFileNames = { "German","german-mommsen-Roemische_Geschichte-Book01.utf8.txt","English", "assembly.nu.news-eng-nolines.utf8textpad.utf8.v2.txt","English","english-1_Harry_Potter_and_the_Sorcerers_Stone.txt","French","french-1_Harry_Potter_et_la_Pierre_Philosophale.utf8.v2.txt","Romanian","romanian-ziare.0.v5sentences-cleaned.utf8.txt","Passamaquoddy","passamaquoddy-TalesFromMaliseet.utf8.txt","UrduRomanized","urdu-forum-060427aagar.aap.ke.pechey.kotta.lag.jaey.v4-notimes.txt","Spanish","spanish-1_Harry_Potter_y_la_Piedra_Filosofal-cleaned.utf8.txt","Spanish","spanish-blog-050301-080330blogworkorange.utf8.txt","MalayCodeSwitching","malay-060918KL.malay.blog.corpus.v3.txt","InuktitutRomanized", "InukMagazine102-104rough-inuktitut.utf8.txt","Inuktitut","assembly.nu.news-innuktitut.txt","Finnish","leipzig-fi.txt","Turkish","leipzig-tr.txt"};
		
		String language = "Default";
		String letterType ="Orthographic"; //Choices: Orthographic, Phonemic(IPA,Inuktitut),  Phonetic (rare)
		//letterType = "Phonemic";
		
		String wordCountScript = "pythonsrc\\wordcount.v3.2.py";
		String wordCountOutputFile ="-words.txt";
		String letterCountScript = "pythonsrc\\findphones.v3.5.py";
		String letterCountOutputFile ="-lettersByWordCount.txt";
		String populateAboxScript = "pythonsrc\\populate-letters.v2.py";
		String AboxOutputFile ="-abox.txt";
		String combineAboxesScript="pythonsrc\\combine-Aboxes.v2.py";

		String aboxArray = "pythonsrc\\data\\phonont-header.txt "+corporaPath+"br-phono.txt-unicode.txt"+wordCountOutputFile+letterCountOutputFile+AboxOutputFile+" ";

		for (String corpus : corporaFileNames) {
			//To get the language out of the file array
			String pattern = "(.*)(\\W+)(.*)";
			Pattern r = Pattern.compile(pattern);
			Matcher m = r.matcher(corpus);
			if (!(m.find( ))) {
				continue;
			}
			//for all files, create the data files
			aboxArray=aboxArray+corporaPath+corpus+wordCountOutputFile+letterCountOutputFile+AboxOutputFile+" ";
		}
		aboxArray=aboxArray+" pythonsrc\\data\\phonont-footer.txt ";
		System.out.println("This is the args list for combining the Aboxes: "+aboxArray);

		//String removeCreatedFiles ="rm pythonsrc\\data\\br-phono.txt-unicode.txt-words.txt";//+corpusFileName+"-words";
		try{
			//http://devdaily.com/java/edu/pj/pj010016/
			for (String item : corporaFileNames) {
				//System.out.println(item);

				//To get the language out of the file array
				String pattern = "(.*)(\\W+)(.*)";
				Pattern r = Pattern.compile(pattern);
				Matcher m = r.matcher(item);
				if (!(m.find( ))) {
					System.out.println("Language is "+item);
					language = item;
					continue;
				}
				//for all files, create the data files
				System.out.println("File is "+item);
				corpusFileName = item;
				
				Process p = Runtime.getRuntime().exec(pythonPath+" "+wordCountScript+" "+corporaPath+corpusFileName);

				BufferedReader stdInput = new BufferedReader(new 
						InputStreamReader(p.getInputStream()));

				BufferedReader stdError = new BufferedReader(new 
						InputStreamReader(p.getErrorStream()));

				// read the output from the command
				//System.out.println("Here is the standard output of the command:\n");
				while ((s = stdInput.readLine()) != null) {
					System.out.println(s);
				}

				// read any errors from the attempted command
				//System.out.println("Here is the standard error of the command (if any):\n");
				while ((s = stdError.readLine()) != null) {
					System.out.println(s);
				}



				try {
					p.waitFor();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				p = Runtime.getRuntime().exec(pythonPath+" "+letterCountScript+" "+corporaPath+corpusFileName+wordCountOutputFile+" "+language+" "+letterType);

				BufferedReader stdInput2 = new BufferedReader(new 
						InputStreamReader(p.getInputStream()));

				BufferedReader stdError2 = new BufferedReader(new 
						InputStreamReader(p.getErrorStream()));

				// read the output from the command
				//System.out.println("Here is the standard output of the command:\n");
				while ((s = stdInput2.readLine()) != null) {
					System.out.println(s);
				}

				// read any errors from the attempted command
				//System.out.println("Here is the standard error of the command (if any):\n");
				while ((s = stdError2.readLine()) != null) {
					System.out.println(s);
				}


				try {
					p.waitFor();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				p = Runtime.getRuntime().exec(pythonPath+" "+populateAboxScript+" "+corporaPath+corpusFileName+wordCountOutputFile+letterCountOutputFile);

				BufferedReader stdInput3 = new BufferedReader(new 
						InputStreamReader(p.getInputStream()));

				BufferedReader stdError3 = new BufferedReader(new 
						InputStreamReader(p.getErrorStream()));

				// read the output from the command
				//System.out.println("Here is the standard output of the command:\n");
				while ((s = stdInput3.readLine()) != null) {
					System.out.println(s);
				}

				// read any errors from the attempted command
				//System.out.println("Here is the standard error of the command (if any):\n");
				while ((s = stdError3.readLine()) != null) {
					System.out.println(s);
				}

				try {
					p.waitFor();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				//Process p = Runtime.getRuntime().exec(removeCreatedFiles);


				//After running and creating all the intermediate files
			}
			
			Process p = Runtime.getRuntime().exec(pythonPath+" "+combineAboxesScript+" "+aboxArray);

			BufferedReader stdInput4 = new BufferedReader(new 
					InputStreamReader(p.getInputStream()));

			BufferedReader stdError4 = new BufferedReader(new 
					InputStreamReader(p.getErrorStream()));

			// read the output from the command
			//System.out.println("Here is the standard output of the command:\n");
			while ((s = stdInput4.readLine()) != null) {
				System.out.println(s);
			}

			// read any errors from the attempted command
			//System.out.println("Here is the standard error of the command (if any):\n");
			while ((s = stdError4.readLine()) != null) {
				System.out.println(s);
			}

			try {
				p.waitFor();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}


			System.exit(0);

		}
		catch (IOException e) {
			System.out.println("exception happened - here's what I know: ");
			e.printStackTrace();
			System.exit(-1);
		}

	}

}
