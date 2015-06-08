/*
 * Framer.h
 *
 *  Created on: Jun 20, 2010
 *      Author: gina
 */

#ifndef FRAMER_H_
#define FRAMER_H_
#include <string>

class Framer {
private:
	int height;
	int width;
	std::string code;
	std::string text;
	std::string framedText;
	std::string margin;
public:
	void getTextDimensions();
	void frameIt();
	std::string toString();

	Framer(std::string textIn,std::string codeIn="",std::string marginIn=" ");	//accepts the code in string format
	Framer(std::string textIn,int codeIn,std::string marginIn=" ");				//accepts the code in int format
	virtual ~Framer();
};

#endif /* FRAMER_H_ */
