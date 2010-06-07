/*
 * Sequence.h
 *
 *  Created on: Jun 1, 2010
 *      Author: gina
 */

#ifndef SEQUENCE_H_
#define SEQUENCE_H_

class Sequence {
	const static bool trace = false;
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
	explicit Sequence(int n=10);

	//Sequence();
	virtual ~Sequence();

	char* getAsString();//TBD
	int getSize();
	char* getOriginalString();
	void setElement(int i, int newValue);
	int getElement(int i);
	void printEach();
	void printValue();

	void setPosition(int i, int newValue);
	int getValueAtPosition(int i);


	int cStringLength ( const char* input);

};

#endif /* SEQUENCE_H_ */
