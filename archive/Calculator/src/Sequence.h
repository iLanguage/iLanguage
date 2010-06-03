/*
 * Sequence.h
 *
 *  Created on: Jun 1, 2010
 *      Author: gina
 */

#ifndef SEQUENCE_H_
#define SEQUENCE_H_

class Sequence {
	const static bool trace = true;
	bool negative;
	char* originalString;
	int size;
	int* store;
	char* asString;


public:


	int init(char* characterInput);
	Sequence(char* characterInput);
	Sequence(const Sequence& source);//copy constructor
	Sequence& operator=(const Sequence& source); //assignment operator overload
	Sequence();
	virtual ~Sequence();

	char* getAsString();//TBD
	int getSize();
	char* getOriginalString();

	int cStringLength ( const char* input);

};

#endif /* SEQUENCE_H_ */
