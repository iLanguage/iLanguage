/*
 * GenreYearQuery.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "GenreYearQuery.h"
#include <string>
#include <algorithm>
#include <iterator>
#include <iostream>
using namespace std;

void GenreYearQuery::query(){
	cout<<"Enter movie genre: ";
	//getline(cin,genreUserQuery);
	cout<<"Enter movie year: ";
	//getline(cin,yearUserQuery);

	genreUserQuery="War";
	yearUserQuery="2000";
	set<int> results;
	//db.first();
	db->queryGenre(genreUserQuery,results);
	/*Print all indices found
	 * http://www.java2s.com/Tutorial/Cpp/0500__STL-Algorithms-Non-modifying-sequence-operations/Usestdcopytoprintallelementsinaset.htm
	 */
	ostream_iterator< int > output( cout, " " );
	copy(results.begin(), results.end(), output);
	cout<<endl;

	/*
	 * Print out all titles of records found
	 */
	cout<<results.size()<<" Matches found. Here is a list of titles which match your genre query: "<<genreUserQuery<<endl;
	set<int>::iterator it;
	for(it=results.begin(); it!=results.end(); it++){
		int foundRecord = *it;
		cout <<"\t"<<(db->operator[](foundRecord)).getTitle()<<endl;
		//int position=results.begin();
		//cout<<db[position];
	}




}
void GenreYearQuery::setDB(const Database &databaseToQuery){
	db=&databaseToQuery;
	cout<<"Setting db to "<<databaseToQuery.getDatabaseName()<<endl;
}

GenreYearQuery::GenreYearQuery() {
	cout<<"Constructing a query for the combo of genre and year."<<endl;
}

GenreYearQuery::~GenreYearQuery() {
}
