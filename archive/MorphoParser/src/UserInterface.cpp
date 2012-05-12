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
#include <sstream>
using namespace std;

void UserInterface::run(){
	runInteractively();
}
void UserInterface::printMainMenu(){
	stringstream menu;
	for(int i=0; i<menuList.size(); i++){
		menu<<i<<" "<<menuList.at(i)->toString()<<"\n";
	}
	Framer framedMenu(menu.str(),"Main Menu","    ");
	cout<<framedMenu.toString();

}
void UserInterface::runInteractively(){
	bool stop=false;
	while(!stop){
		printMainMenu();
		int menuNumber = getInt("Please enter a number corresponding to the menu item: ");
		switch (menuNumber){
		case 1:
			cout<<"You choose 1";
			stop=true;
		default:
			cout<<"Your menu choice was invalid."<<endl;
		}//end switch
	}//end while
}
void parseInput(){
}
void addMenuItem(){

}
void UserInterface::printLanguageMenu(){
}
UserInterface::UserInterface() {
	menuList.push_back(new NaturalLanguageMenuItem("Quit","UserInterface"));
	menuList.push_back(new NaturalLanguageMenuItem("Print","menu","UserInterface"));
}

UserInterface::~UserInterface() {
	// TODO Auto-generated destructor stub
}
int UserInterface::getInt(string prompt) // definition of getInt(string) from FAQ
{
	cout << prompt;
	int x;
	cin >> x;
	while ( ! cin )
	{
		cin.clear();
		string badinput;
		getline(cin, badinput);
		cerr << "Expected an integer but found " << badinput << endl << prompt;
		cin >> x;
	}
	// Optionally clear the remaining characters in the input stream;
	// for example, for a user input '123xyz', 123 is extracted to x and,
	// here we choose to discard 'xyz' which is still in the input stream
	string leftover;
	getline(cin, leftover);
	return x; // ignore leftover
}
