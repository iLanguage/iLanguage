/*
 * OrderedProbability.h
 *
 *  Created on: Jul 3, 2010
 *      Author: gina
 */

#ifndef ORDEREDPROBABILITY_H_
#define ORDEREDPROBABILITY_H_
#include <string>
class OrderedProbability {

public:
	/*
	 * Insert an element
	 * Always at the top of the list to achieve a sorted order by frequency
	 */
	int insert(std::string value);
	int find(std::string value);
	std::string getMostProbable();
	std::string getTopProbable(int howMany);


	OrderedProbability();
	virtual ~OrderedProbability();
};

#endif /* ORDEREDPROBABILITY_H_ */
