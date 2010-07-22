/*
 * Query.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "Query.h"

void Query::displayResults(){
	set<int>::iterator it;
	string temp;
	for(it=results.begin(); it!=results.end(); it++)
	{
		db->currentPosition=*it;
		db->current();
		cout<<"Next match (y/n)? ";
		getline(cin,temp);
		if(temp[0]=='n')
		{
			return;
		}
	}
	cout<<"No additional results."<<endl;
}

Query::Query() {
	// TODO Auto-generated constructor stub

}

Query::~Query() {
	// TODO Auto-generated destructor stub
}
