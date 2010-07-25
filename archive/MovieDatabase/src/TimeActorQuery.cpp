/*
 * TimeActorQuery.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "TimeActorQuery.h"

void TimeActorQuery::query(){
	actorUserQuery=" ";
	titleUserQuery=" ";

	cout<<"Enter an actor or part of an actor's name (ex: tom, \" \" for all results) ";
	getline(cin,actorUserQuery);

	cout<<"Enter movie title (ex:da vinci, \" \" for all results) ";
	getline(cin, titleUserQuery);

	set<int> actorResults;
	db->queryActor(actorUserQuery,actorResults);

	set<int> titleResults;
	db->queryTitle(titleUserQuery, titleResults);

	intersectResults(actorResults, titleResults);
}

TimeActorQuery::TimeActorQuery() {
}

TimeActorQuery::~TimeActorQuery() {
	// TODO Auto-generated destructor stub
}
