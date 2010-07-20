/*
 * Database.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "Database.h"
#include "MyTokenizer.h"
#include <vector>
#include <map>
#include <set>
#include <string>
#include <iostream>
#include <fstream>

using namespace std;

/*
 * Navigation Implementation
 * Uses the currentPosition to print out first, last, next, previous and current records in the database.
 */
vecSizeType Database::currentPosition=0;

void Database::first(){
	currentPosition=0;
	cout<<*movieDatabase[currentPosition];
}
void Database::next(){
	if(currentPosition<movieDatabase.size()-1){
		currentPosition++;
		cout<<*movieDatabase[currentPosition];
	}else{
		cout<<"Crossed bottom boundary. Try navigating up.";
	}
}
void Database::previous(){
	if(currentPosition>0){
		currentPosition--;
		cout<<*movieDatabase[currentPosition];
	}else{
		cout<<"Crossed top boundary. Try navigating down.";
	}
}
void Database::last(){
	currentPosition=movieDatabase.size()-1;
	cout<<*movieDatabase[currentPosition];
}
void Database::current(){
	cout<<*movieDatabase[currentPosition];
}


/*
 * Build indicies one by one, indices on fields with multiple data are run through the tokenizer to find the individual items (for example Actors contains many actors, genre contains many genres).
 * The actors and genre's are trimmed (leading and trailing whitespace) using the boost libraries however, this doesn't appear to affect the maps's ability to find and match corresponding entries.
 */
void Database::buildIndices(){
	cout<<"Building indices. "<<endl;
	for(vecSizeType i=0; i<movieDatabase.size(); i++)
	{
		//cout<<"Processing "<<i<<" "<<movieDatabase[i]->getTitle()<<endl;
		/*
		 * Build a title index
		 */
		string thisTitle=movieDatabase[i]->getTitle();
		if (titleIndex.count(thisTitle)==0){
			set<int> titlePositions;
			titlePositions.insert(i);
			titleIndex[thisTitle]=titlePositions;
		}else{
			//cout<<endl<<"This is a duplicate title."<<endl;
			(titleIndex.find(thisTitle)->second).insert(i);
		}
		//cout<<endl<<"This title's database count: "<<titlePositions.size()<<endl;

		/*
		 * Build a year index
		 */
		int thisYear = movieDatabase[i]->getYear();

		if(yearIndex.count(thisYear)==0){
			set<int> yearPositions;
			yearPositions.insert(i);
			yearIndex[thisYear]=yearPositions;
		}else{
			(yearIndex.find(thisYear)->second).insert(i);
		}
		//cout<<endl<<thisYear<<" database count: "<<(yearIndex.find(thisYear)->second).size()<<endl;

		/*
		 * Build a running time index
		 */
		int thisRunningTime = movieDatabase[i]->getRunningTime();
		if(runningTimeIndex.count(thisRunningTime)==0){
			set<int> runningTimePosition;
			runningTimePosition.insert(i);
			runningTimeIndex[thisRunningTime]=runningTimePosition;
		}else{
			(runningTimeIndex.find(thisRunningTime)->second).insert(i);
		}
		/*
		 * Build an actor index
		 */
		string actorsString = movieDatabase[i]->getActors();
		MyTokenizer actorsList(actorsString,";");
		for(vecSizeType k=0;k<actorsList.size(); k++){
			string thisActor=actorsList[k];
			MyTokenizer onlyActor(thisActor," as ");
			thisActor=onlyActor[0];
			if(actorIndex.count(thisActor)==0){
				set<int> actorPosition;
				actorPosition.insert(i);
				actorIndex[thisActor]=actorPosition;
			}else{
				(actorIndex.find(thisActor)->second).insert(i);
			}
			//cout<<"Actor added: "<<thisActor<<endl;
		}
		/*
		 * Build a rating index
		 */
		string thisRating=movieDatabase[i]->getRating();
		if (ratingIndex.count(thisRating)==0){
			set<int> ratingPositions;
			ratingPositions.insert(i);
			ratingIndex[thisRating]=ratingPositions;
		}else{
			(ratingIndex.find(thisRating)->second).insert(i);
		}
		/*
		 * Build a genre index
		 */
		string genreString=movieDatabase[i]->getGenre();
		MyTokenizer genreList(genreString,";");
		for(vecSizeType k=0;k<genreList.size(); k++){
			string thisGenre=genreList[k];
			if (genreIndex.count(thisGenre)==0){
				set<int> genrePositions;
				genrePositions.insert(i);
				genreIndex[thisGenre]=genrePositions;
				//cout<<"Genre added: "<<thisGenre<<endl;
			}else{
				(genreIndex.find(thisGenre)->second).insert(i);
			}
		}//end for each genre of this record

	}//end for loop to go through whole database
	cout<<"There are "<<titleIndex.size()<<" distinct titles."<<endl;
	cout<<"There are "<<yearIndex.size()<<" distinct years."<<endl;
	cout<<"There are "<<runningTimeIndex.size()<<" distinct running times."<<endl;
	cout<<"There are "<<actorIndex.size()<<" distinct actors."<<endl;
	cout<<"There are "<<ratingIndex.size()<<" distinct ratings."<<endl;
	cout<<"There are "<<genreIndex.size()<<" distinct genres."<<endl;
	cout<<"Finished building indices."<<endl<<endl;

}//end build indices

/*
 * Query Manager
 *

 */
void Database::queryGenre(string genreQuery, set<int> &resultSet) const{
	cout<<"Querying genres"<<endl;
	if (genreIndex.count(genreQuery)==0){
			cout<<"No results found for genre: "<<genreQuery<<endl;
		}else{
			//cout<<resultSet.size()<< " Results found for genre. "<<endl;
			resultSet = genreIndex.find(genreQuery)->second;
		}
}
void Database::importRecords(char* filename){
	fstream fileIn;
	cout<<"Please enter a database file name: (push enter to use the default file: src/dvdmoviedb.txt)";
	string temp="";
	//getline(cin,temp);
	if(temp!=""){
		filename=const_cast<char*>(temp.c_str());
	}
	cout<<"Building the movie database.";
	fileIn.open(filename,fstream::in);
	if(fileIn.fail()){
		cout<<"Sorry file not found."<<endl;
	}
	string line;
	while (true){
		if(fileIn.eof()) break;
		getline(fileIn,line);
		//remove the end of line character
		line= line.substr(0,line.size()-1);
		if(line.find("|")){
			//cout<<endl<<"Record "<<endl<<line<<endl;
			cout<<".";
			cout.flush();
			insertRecord(line);
		}else{
			cout<<endl<<"No movie record was found on this line\n"<<line<<endl;
		}
	}
	cout<<endl<<"Database loaded."<<endl;
	//cout<<*movieDatabase[movieDatabase.size()-1];
	fileIn.close();
}
vecSizeType Database::size(){
	return movieDatabase.size();
}
void Database::setDatabaseName(string newName){
	databaseName=newName;
}
string Database::getDatabaseName() const{
	return databaseName;
}
// The best way to overload the stream operators is not to make them members of any class, but to keep them as friends. i.e., wherever there is a need to use the stream operators, use them as friend functions with the suitable parameters.
void Database::insertRecord(string& recordAsString){
	movieDatabase.push_back(new Record(recordAsString));
}

Record& Database::operator[](int x){
	return *movieDatabase[x];

}
const Record& Database::operator[](int x) const {
	return *movieDatabase[x];

}
Database::Database() {
	databaseName="Unnamed Database";
	cout<<"Constructing a database."<<endl;


}

Database::~Database() {
	// TODO Auto-generated destructor stub
}
