/*
 * Rhombus.cpp
 *
 *  Created on: Jun 22, 2010
 *      Author: gina
 */

#include "Rhombus.h"
#include <iostream>
#include <sstream>
#include <cmath>
using namespace std;

double Rhombus::geoArea() const {
	return (height * height)/2;
}
int Rhombus::scrArea() const{
	double n=height/2;
	return 2*n*(n+1)+1;
}
double Rhombus::geoPerimeter() const {
	return 2* sqrt(2*height);
}
int Rhombus::scrPerimeter() const {
	return 2*(height- 1);
}

string Rhombus::toStringFilled(char forground, char background) const{
	stringstream filled;
		for(int i=1;i<=(height+1)/2;i++){
			int count =0;
			//pad backgrounds
			for(int k=i;k<height;k++){
				filled<<background;
			}
			//print foreground
			while(count<2*i-1){
				filled<<forground;
				count++;
			}
			//pad background
			for(int k=i;k<height;k++){
				filled<<background;
			}
			filled<<endl;
		}
		for(int i=height/2;i>0;i--){
			int count=0;
			//pad background
			for(int k=height;k>i;k--){
				filled<<background;
			}
			//print forground
			while(count<2*i-1){
				filled<<forground;
				count++;
			}
			//pad background
			for(int k=height;k>i;k--){
				filled<<background;
			}
			filled<<endl;
		}
		return filled.str();
}
string Rhombus::toStringHollow(char forground, char background) const{
	stringstream hallow;
	for (int i=1;i<(height+1)/2+1;i++){
		int count=0;
		//pad backgrounds
		for (int k=i;k<height;k++){
			hallow<<background;
		}
		//print foreground
		while(count<2*i-1){
			if(count==0 ||count==2*i-2)
				hallow<<forground;
			else
				hallow<<background;
			count++;
		}
		//pad background
		for (int k=i;k<height;k++){
			hallow<<background;
		}
		hallow<<endl;
	}
	for(int i=height/2;i>0;i--){
		int count=0;
		//pad background
		for(int k=height;k>i;k--){
			hallow<<background;
		}
		//print forground
		while(count<2*i-1){
			if(count==0 ||count==2*i-2)
				hallow<<forground;
			else
				hallow<<background;
			count++;
		}
		//pad background
		for(int k=height;k>i;k--){
			hallow<<background;
		}
		hallow<<endl;
	}
	return hallow.str();
}

Rhombus::Rhombus(int diagonal):Shape() {
	if(diagonal%2!=1){
		cout<<"Please enter a odd number, using a size 1 larger than what you entered."<<endl;
		diagonal=diagonal+1;
	}
	height=diagonal;
	width=diagonal;
	name="Rhombus";
	if (Shape::trace) cout<<"A rhombus was created"<<endl;
}
Rhombus::~Rhombus() {
}
