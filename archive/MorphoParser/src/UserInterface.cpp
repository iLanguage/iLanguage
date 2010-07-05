/*
 * UserInterface.cpp
 *
 *  Created on: Jul 3, 2010
 *      Author: gina
 */

#include "UserInterface.h"
#include "Framer.h"
#include "NaturalLanguageMenuItem.h"
#include <string>
#include <iostream>
using namespace std;

void UserInterface::run(){
	runInteractively();
}
void UserInterface::printMainMenu(){
	string menu= "Choose one of the following operations:\n"
				"set language\n"
				"quit \n";
	Framer framedMenu(menu,"Main Menu","    ");
	cout<<framedMenu.toString();
	menuList.push_back(new NaturalLanguageMenuItem);

}
void UserInterface::runInteractively(){
	printMainMenu();
}
void parseInput(){
}
void addMenuItem(){

}
void UserInterface::printLanguageMenu(){
}
UserInterface::UserInterface() {
	// TODO Auto-generated constructor stub

}

UserInterface::~UserInterface() {
	// TODO Auto-generated destructor stub
}
