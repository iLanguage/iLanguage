/*
 * MyTokenizer.h
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#ifndef MYTOKENIZER_H_
#define MYTOKENIZER_H_
#include <string>
#include <vector>
using namespace std;

class MyTokenizer {
private:
	string s;
	vector<string> vec;
	char seperator;
	void tokenizeIt();

public:
	int size(){return vec.size();}
	string operator[](int k);			//return kth element in the vector
	MyTokenizer(string str, char seperator=' ');
	virtual ~MyTokenizer();
};

#endif /* MYTOKENIZER_H_ */
