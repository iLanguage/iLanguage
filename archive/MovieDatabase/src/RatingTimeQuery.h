/*
 * RatingTimeQuery.h
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#ifndef RATINGTIMEQUERY_H_
#define RATINGTIMEQUERY_H_

#include "Query.h"

class RatingTimeQuery: public Query {
private:
	std::string ratingUserQuery;
	int timeUserQuery;

public:
	void query();
	RatingTimeQuery();
	virtual ~RatingTimeQuery();
};

#endif /* RATINGTIMEQUERY_H_ */
