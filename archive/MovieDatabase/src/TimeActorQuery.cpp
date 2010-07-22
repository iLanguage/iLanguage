/*
 * TimeActorQuery.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "TimeActorQuery.h"

void TimeActorQuery::query(){
	cout<<"Enter an actor or part of an actor's name (ex: tom) ";
	//getline(cin,actorUserQuery);

	cout<<"Enter movie running time (ex:143) ";
	//cin>>timeUserQuery;
	string trash;
	//getline(cin, trash);

	actorUserQuery="tom";
	timeUserQuery=143;

	set<int> actorResults;
	db->queryActor(actorUserQuery,actorResults);

	set<int> timeResults;
	db->queryTime(timeUserQuery, timeResults);

	intersectResults(actorResults, timeResults);
}

TimeActorQuery::TimeActorQuery() {
}

TimeActorQuery::~TimeActorQuery() {
	// TODO Auto-generated destructor stub
}
