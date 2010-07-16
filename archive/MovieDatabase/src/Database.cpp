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

void Database::importRecords(char* filename){
	fstream fileIn;
	fileIn.open(filename,fstream::in);
	while (fileIn){
		if(fileIn.fail()) break;
		string word;
		fileIn>>word;
		cout<<word<<endl;
	}
	fileIn.close();
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
	yearIterator=yearIndex.find(2000);
	found=yearIndex.find(2000)->second;
	cout<<"The year 2000 has "<<found.size()<<" records found"<<endl;
	cout<<"The year 1998 has "<<(yearIndex.find(1998)->second).size()<<" records found"<<endl;




}

// The best way to overload the stream operators is not to make them members of any class, but to keep them as friends. i.e., wherever there is a need to use the stream operators, use them as friend functions with the suitable parameters.
void Database::insertRecord(string recordAsString){
	cout<<"Inserting a record"<<endl;
	moveieDatabase.push_back(new Record());


}

Database::Database() {
	cout<<"Constructing a database."<<endl;

}

Database::~Database() {
	// TODO Auto-generated destructor stub
}
