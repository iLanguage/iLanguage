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

	genreUserQuery="An";
	yearUserQuery="2006";
	set<int> results;

	db->queryGenre(genreUserQuery,results);

	/*
	 * Print out all titles of records found
	 */
	cout<<results.size()<<" Matches found. Here is a list of titles which match your genre query: "<<genreUserQuery<<endl;
	set<int>::iterator it;
	for(it=results.begin(); it!=results.end(); it++){
		int foundRecord = *it;
		cout <<"\t"<<(db->operator[](foundRecord)).getGenre()<<":\t"<<(db->operator[](foundRecord)).getTitle()<<endl;
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
