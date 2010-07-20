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
using std::string;
using std::vector;
//creating an alias for the size of a vector, rather than an int
typedef vector<string>::size_type vecSizeType;

class MyTokenizer {
private:
	string originalstring;

	string delimitor;
	void tokenizeIt(const string& line);

public:
	vector<string> tokens;
	/*
	 * return the number of tokens found
	 */
	vecSizeType size()const{return tokens.size();}
	/*
	 * return the kth element in the tokens
	 */
	string& operator[](vecSizeType k);
	//returns a const for use as read only version of subscript operator
	const string& operator[](vecSizeType k) const;

	/*
	 * Constructor: accept a string by reference to avoid copying, as well as a delimiting character
	 * 	by default the delimiter is spaces.
	 */
	MyTokenizer(const string& line, string delimitorIn=" ");

	MyTokenizer(){};
	virtual ~MyTokenizer();
};

#endif /* MYTOKENIZER_H_ */
