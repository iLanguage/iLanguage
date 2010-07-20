/*
 * MyTokenizer.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "MyTokenizer.h"
#include <boost/algorithm/string/trim.hpp>
#include <iostream>
#include <string>
#include <vector>
using std::string;
using std::vector;
void MyTokenizer::tokenizeIt(const string& line)
{
	typedef string::size_type StringSize;
	StringSize pos=0,start=0;
	string token;

	while((pos = line.find(delimitor, start)) != string::npos)
	{
		token =line.substr(start,pos-start);
		//trim white space off using the boost library
		boost::algorithm::trim(token);
		tokens.push_back(token);
		//std::cout<<"|"<<token<<"|"<<std::endl;
		start = pos+1;
	}
	//add last element
	token = line.substr(start);
	tokens.push_back(token);
}
/*
 * Returns a reference to the string in position k of the token list
 * Vector does range checking.
 */
string&  MyTokenizer::operator[](vecSizeType k){
	return tokens[k];
}
const string&  MyTokenizer::operator[](vecSizeType k)const{
	return tokens[k];
}
MyTokenizer::MyTokenizer(const string& line, string seperatorIn): delimitor(seperatorIn){
	tokenizeIt(line);
}

MyTokenizer::~MyTokenizer() {
	// TODO Auto-generated destructor stub
}
