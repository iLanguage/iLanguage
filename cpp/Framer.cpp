/*
 * Framer.cpp
 *
 *  Created on: Jun 20, 2010
 *      Author: gina
 */
#include "Framer.h"
#include <iostream>
#include <sstream>
#include <string>

void Framer::getTextDimensions(){
	height=0;
	width=0;

	std::istringstream stringIn(text);
	std::string junk;
	while (std::getline(stringIn,junk)){
		height++; //count the number of lines in the text to get the height
		if (width<junk.length())
			width=junk.length();//find the longest line to get the width
	}
	height=height+2*(margin.length());
	width=width+2*(margin.length());
}
void Framer::frameIt(){
	char VBAR = static_cast<char>(179);// vertical bar
	VBAR = '-';//the char codes dont work on my mac, see if it works on other OS or what the problem is later
	char HBAR = static_cast<char>(196);// horizontal bar
	HBAR = '|';
	const char BR = static_cast<char>(217);// bottom right
	const char TL = static_cast<char>(218);// top left
	const char TR = static_cast<char>(191);// top right
	const char BL = static_cast<char>(192);// bottom left



	int adjustedTopWidth=width;
	std::string topCornerCode;
	if(code !=""){
		topCornerCode=code;
		adjustedTopWidth= width-topCornerCode.length();
	}

	std::stringstream framedStream;
	framedStream<<'+'<<topCornerCode;

	//print top line
	for (int i=0; i<adjustedTopWidth; i++)
		framedStream<<VBAR;
	framedStream<<'+'<<std::endl;

	//print top margin, same height as the length of margin itself
	for(int k=0;k<margin.length(); k++){
		framedStream<<HBAR;
		for (int j=0; j<width; j++){
			framedStream<<" ";						//pad the lines to place the HBAR correctly
		}
		framedStream<<HBAR<<std::endl;
	}

	std::istringstream stringIn(text);
	std::string line;
	while(std::getline(stringIn,line)){
		framedStream<<HBAR<<margin<<line;
		for (int j=line.length()+2*margin.length(); j<width; j++){
			framedStream<<" ";						//pad the lines to place the HBAR correctly
		}
		framedStream<<margin<<HBAR<<std::endl;
	}

	//print bottom margin, same height as the length of margin itself
	for(int k=0;k<margin.length(); k++){
		framedStream<<HBAR;
		for (int j=0; j<width; j++){
			framedStream<<" ";						//pad the lines to place the HBAR correctly
		}
		framedStream<<HBAR<<std::endl;
	}

	framedStream<<'+';
	for (int i=0; i<width; i++)
		framedStream<<VBAR;
	framedStream<<'+'<<std::endl;

	framedText = framedStream.str();

}

std::string Framer::toString(){
	getTextDimensions();
	frameIt();
	return framedText;
}

Framer::Framer(std::string textIn,std::string codeIn,std::string marginIn) {
	margin=marginIn;
	height=0;
	width=0;
	text=textIn;
	code=codeIn;
	framedText="";
}
Framer::Framer(std::string textIn, int codeIn, std::string marginIn){
	margin=marginIn;
	height=0;
	width=0;
	text=textIn;
	framedText="";
	//turn the code int into a string
	std::stringstream codeStream;
	codeStream<<codeIn;
	code = codeStream.str();
}
Framer::~Framer() {
	// TODO Auto-generated destructor stub
}
