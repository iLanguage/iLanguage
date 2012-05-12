/*
 * NaturalLanguageMenuItem.h
 *
 *  Created on: Jul 3, 2010
 *      Author: gina
 */

#ifndef NATURALLANGUAGEMENUITEM_H_
#define NATURALLANGUAGEMENUITEM_H_
#include <string>
using namespace std;
class NaturalLanguageMenuItem {
private:

	string action;
	string arguments;
	string caller;

	int useFrequency;
public:
	static int autoincrement;
	static bool trace;
	static void setTrace(bool value);

	int getLastIdUsed();
	void setAutoincrement(int newAutoincrement);
	int getUseFrequency();
	void setUseFrequency(int newUseFrequency);

	string toString();

	NaturalLanguageMenuItem(string actionIn, string argumentsIn, string callerIn);
	NaturalLanguageMenuItem(string actionIn, string callerIn);
	NaturalLanguageMenuItem();
	virtual ~NaturalLanguageMenuItem();
};

#endif /* NATURALLANGUAGEMENUITEM_H_ */
