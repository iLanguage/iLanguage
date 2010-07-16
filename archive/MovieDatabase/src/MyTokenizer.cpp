/*
 * MyTokenizer.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "MyTokenizer.h"
#include <iostream>
#include <string>
using namespace std;
void MyTokenizer::tokenizeIt()
{
	typedef string::size_type StringSize;

	cout<< "tokenizing"<<endl;
	StringSize pos=0,start=0;
	pos = s.find(seperator, start);

	while(pos != string::npos)
	{
		vec.push_back(s.substr(start, pos-1));
		start = pos+1;
		pos = s.find(seperator, start);
	}
	vec.push_back(s.substr(start));
}
string MyTokenizer::operator[](int k){
	return vec[k];
}

MyTokenizer::MyTokenizer(string str, char seperatorIn): s(str), seperator(seperatorIn){
	tokenizeIt();
}

MyTokenizer::~MyTokenizer() {
	// TODO Auto-generated destructor stub
}
