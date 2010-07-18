/*
 * Database.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "Database.h"
#include <vector>
#include <map>
#include <set>
#include <string>
#include <iostream>
#include <fstream>

using namespace std;

void Database::buildIndices(){
	for(vecSizeType i=0; i<movieDatabase.size(); i++)
	{
		cout<<i<<" "<<movieDatabase[i]->getTitle()<<endl;

		/*
		 * Build a title index
		 */
		string thisTitle=movieDatabase[i]->getTitle();

		//map<string,set<int> >::iterator it;
		//it=titleIndex.find(thisTitle);
		//cout<<it.;
		if (titleIndex.count(thisTitle)==0){
			set<int> titlePositions;
			titlePositions.insert(i);
			titleIndex[thisTitle]=titlePositions;
		}else{
			cout<<endl<<"This is a duplicate title."<<endl;
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


	}
	cout<<"There are "<<titleIndex.size()<<" distinct titles."<<endl;
	cout<<"There are "<<yearIndex.size()<<" distinct years.";

		//map<int,set<int> > yearIndex;
			//map<int,set<int> > timeIndex;
			//map<int,set<int> > actorIndex;
			//map<int,set<int> > ratingIndex;
			//map<int,set<int> > genreIndex;
			/*
			 * set<int> years;
	years.insert(2);
	years.insert(1);

	yearIndex.insert(pair<int,set<int> >(2000,years) );
	years.insert(3);
	years.insert(4);
	yearIndex[1998]=years;
	yearIndex[1970]=years;
	cout<<"There are "<<yearIndex.size()<<" years in the database."<<endl;

	set<int> found = years;
	map<int, set<int> >::iterator yearIterator=yearIndex.find(2000);
	found=yearIndex.find(2000)->second;
	cout<<"The year 2000 has "<<found.size()<<" records found"<<endl;
	cout<<"The year 1998 has "<<(yearIndex.find(1998)->second).size()<<" records found"<<endl;
			 */


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
		if(line.find('|')){
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
void Database::buildYearIndex(){
	cout<<"Building an index on year."<<endl;
	set<int> years;
	years.insert(2);
	years.insert(1);

	yearIndex.insert(pair<int,set<int> >(2000,years) );
	years.insert(3);
	years.insert(4);
	yearIndex[1998]=years;
	yearIndex[1970]=years;
	cout<<"There are "<<yearIndex.size()<<" years in the database."<<endl;

	set<int> found = years;
	map<int, set<int> >::iterator yearIterator=yearIndex.find(2000);
	found=yearIndex.find(2000)->second;
	cout<<"The year 2000 has "<<found.size()<<" records found"<<endl;
	cout<<"The year 1998 has "<<(yearIndex.find(1998)->second).size()<<" records found"<<endl;
}

// The best way to overload the stream operators is not to make them members of any class, but to keep them as friends. i.e., wherever there is a need to use the stream operators, use them as friend functions with the suitable parameters.
void Database::insertRecord(string& recordAsString){
	movieDatabase.push_back(new Record(recordAsString));
}

Database::Database() {
	cout<<"Constructing a database."<<endl;

}

Database::~Database() {
	// TODO Auto-generated destructor stub
}
