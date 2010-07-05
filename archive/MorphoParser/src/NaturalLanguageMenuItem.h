/*
 * NaturalLanguageMenuItem.h
 *
 *  Created on: Jul 3, 2010
 *      Author: gina
 */

#ifndef NATURALLANGUAGEMENUITEM_H_
#define NATURALLANGUAGEMENUITEM_H_
#include <string>
class NaturalLanguageMenuItem {
private:
	static int autoincrement;
	std::string action;
	std::string arguments;
	std::string caller;

public:
	static bool trace;
	static void setTrace(bool value);

	int getLastIdUsed();

	NaturalLanguageMenuItem(std::string actionIn, std::string argumentsIn, std::string callerIn);
	NaturalLanguageMenuItem();
	virtual ~NaturalLanguageMenuItem();
};

#endif /* NATURALLANGUAGEMENUITEM_H_ */
