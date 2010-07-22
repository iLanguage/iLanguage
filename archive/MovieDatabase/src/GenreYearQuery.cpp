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

	genreUserQuery="myster";
	yearUserQuery=2006;
	set<int> genreResults;

	db->queryGenre(genreUserQuery,genreResults);

	/*
	 * Print out all titles of records found
	 */
	cout<<genreResults.size()<<" Matches found. Here is a list of titles which match your genre query: "<<genreUserQuery<<endl;
	set<int>::iterator it;
	for(it=genreResults.begin(); it!=genreResults.end(); it++){
		int foundRecord = *it;
		cout <<"\t"<<(db->operator[](foundRecord)).getGenre()<<":\t"<<(db->operator[](foundRecord)).getYear()<<":\t"<<(db->operator[](foundRecord)).getTitle()<<endl;
	}


	set<int> yearResults;
	set<int>::iterator itYear;
	db->queryYear(yearUserQuery, yearResults);
	for(it=genreResults.begin(); it!=genreResults.end(); it++)
	{
		for(itYear=yearResults.begin(); itYear!=yearResults.end(); itYear++){
			if (*itYear==*it){
				results.insert(*it);
			}
		}
	}//end for loop to do the intersection of the genre and the year results

	cout<<results.size()<<" Matches found. Here is a list of titles which match your genre and your year query: "<<genreUserQuery<<", "<<yearUserQuery<<endl;
	for(it=results.begin(); it!=results.end(); it++){
		int foundRecord = *it;
		cout <<"\t"<<(db->operator[](foundRecord)).getGenre()<<":\t"<<(db->operator[](foundRecord)).getYear()<<":\t"<<(db->operator[](foundRecord)).getTitle()<<endl;
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
