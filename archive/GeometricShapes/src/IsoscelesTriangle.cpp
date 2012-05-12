/*
 * IsoscelesTriangle.cpp
 *
 *  Created on: Jun 21, 2010
 *      Author: gina
 */

#include "IsoscelesTriangle.h"
#include <iostream>
#include <sstream>
#include <cmath>
using namespace std;

double IsoscelesTriangle::geoArea() const {
	return (height * width)/2;
}
int IsoscelesTriangle::scrArea() const{
	return height * height;
}
double IsoscelesTriangle::geoPerimeter() const {
	return 2* sqrt((width*width)/4 + height * height+ width);
}
int IsoscelesTriangle::scrPerimeter() const {
	return 4*(height- 1);
}

string IsoscelesTriangle::toStringFilled(char forground, char background) const{
	stringstream filled;
		for(int i=1;i<=height;i++){
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
		return filled.str();
}
string IsoscelesTriangle::toStringHollow(char forground, char background) const{
	stringstream hallow;
	for (int i=1;i<height;i++){
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
	//print last line
	for (int k=0;k<width;k++){
		hallow<<forground;
	}
	hallow<<endl;
	return hallow.str();
}

IsoscelesTriangle::IsoscelesTriangle(int inHeight):Shape() {
	height=inHeight;
	width=2*inHeight-1;
	name="Isosceles Triangle";
	if (Shape::trace) cout<<"An isoceles triangle was created"<<endl;
}

IsoscelesTriangle::~IsoscelesTriangle() {
	// TODO Auto-generated destructor stub
}
