/*
 * RatingTimeQuery.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "RatingTimeQuery.h"


void RatingTimeQuery::query(){
	ratingUserQuery=" ";
	timeUserQuery=-1;

	cout<<"Enter movie rating (ex: general, \" \" for all results) ";
	getline(cin,ratingUserQuery);

	cout<<"Enter movie running time,  (ex: 239, -1 for all results) ";
	cin>>timeUserQuery;

	string trash;
	getline(cin, trash);

	//ratingUserQuery="General";
	//timeUserQuery=110;

	set<int> ratingResults;
	db->queryRating(ratingUserQuery,ratingResults);

	set<int> timeResults;
	db->queryTime(timeUserQuery, timeResults);

	intersectResults(ratingResults, timeResults);
}
RatingTimeQuery::RatingTimeQuery() {
}
RatingTimeQuery::~RatingTimeQuery() {
	// TODO Auto-generated destructor stub
}
