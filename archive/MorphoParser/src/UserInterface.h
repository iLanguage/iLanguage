/*
 * UserInterface.h
 *
 *  Created on: Jul 3, 2010
 *      Author: gina
 */

#ifndef USERINTERFACE_H_
#define USERINTERFACE_H_
#include <vector>
#include "NaturalLanguageMenuItem.h"
using namespace std;
class UserInterface {
private:
	vector<NaturalLanguageMenuItem*> menuList;
public:

	void parseInput();
	void addMenuItem();

	void runInteractively();
	void printLanguageMenu();
	void run();
	int getInt(string prompt);
	void printMainMenu();
	UserInterface();
	virtual ~UserInterface();
};

#endif /* USERINTERFACE_H_ */
