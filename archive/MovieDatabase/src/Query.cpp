/*
 * Query.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "Query.h"
#include <string>
#include <algorithm>
#include <iterator>
#include <iostream>
using namespace std;

/*
 * Takes two sets of integers, finds the intersection and puts the intersection into the results set, which is used to store the results of queries.
 */
void Query::intersectResults(const set<int> &firstSet, const set<int> &secondSet){

	//preserve the previous result in a storage variable
	previousResults=results;
	results.empty();
	set<int>::iterator it;
	set<int>::iterator itTwo;

	for(it=firstSet.begin(); it!=firstSet.end(); it++)
	{
		for(itTwo=secondSet.begin(); itTwo!=secondSet.end(); itTwo++){
			if (*itTwo==*it){
				results.insert(*it);
			}
		}
	}//end for loop to do the intersection of the genre and the year results

}
/*
 * Display the first match to a query, then provide the user to display additional results one by one.
 */
void Query::displayResults(){
	cout<<"Displaying query results:"<<endl;
	set<int>::iterator it;
	string temp;
	for(it=results.begin(); it!=results.end(); it++)
	{
		db->currentPosition=*it;
		cout<<endl<<endl;
		db->current();
		cout<<"-------------------------------------------------------------"<<endl<<endl;
		cout<<"Next match (y/n)? ";
		getline(cin,temp);
		if(temp[0]=='n')
		{
			return;
		}
	}
	cout<<"No additional results."<<endl;
}

void Query::setDB(const Database &databaseToQuery){
	db=&databaseToQuery;
	//cout<<"Setting db to "<<databaseToQuery.getDatabaseName()<<endl;
}
Query::Query() {
	// TODO Auto-generated constructor stub
}
Query::~Query() {
	// TODO Auto-generated destructor stub
}
