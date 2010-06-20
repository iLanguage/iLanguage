/*
 * ShapeView.cpp
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#include "ShapeView.h"
#include "Shape.h"
#include <string>
#include <sstream>
#include <iostream>
using namespace std;

string ShapeView::drawBorders() const {
	char VBAR = static_cast<char>(179);// vertical bar
	VBAR = '-';//the char codes dont work on my mac, see if it works on other OS or what the problem is later
	char HBAR = static_cast<char>(196);// horizontal bar
	HBAR = '|';
	const char BR = static_cast<char>(217);// bottom right
	const char TL = static_cast<char>(218);// top left
	const char TR = static_cast<char>(191);// top right
	const char BL = static_cast<char>(192);// bottom left

	string textToFrame ="Error";
	if (fillType == ShapeView::HALLOW){
		textToFrame = shapeRecieved->toStringHollow();
	}else if(fillType == ShapeView::FILLED){
		textToFrame = shapeRecieved->toStringFilled();
	}else if(fillType == ShapeView::INFO){
		textToFrame = shapeRecieved->toStringInfo();
	}

	int width=0;
	int height=0;
	getTextDimensions(height, width,textToFrame);

	stringstream framedItem;
	framedItem<<'+'<<shapeRecieved->getID();
	for (int i =0; i < width-1; i++)
		framedItem<<VBAR;
	framedItem<<'+'<<endl;

	istringstream stringIn(textToFrame);
	string junk;
	while(getline(stringIn,junk)){
		framedItem<<HBAR<<junk;
		for (int j=junk.length();j<width;j++){
			framedItem<<" ";
		}
		framedItem<<HBAR<<endl;
	}

	framedItem<<'+';
	for (int i =0; i < width; i++)
		framedItem<<VBAR;
	framedItem<<'+'<<endl;


	return framedItem.str();
}
void ShapeView::getTextDimensions(int& h, int& w,string textIn){
	if (Shape::trace) cout<<"Getting the dimensions (height, width) of the text"<<endl;
	istringstream stringIn(textIn);
	h=0;
	w=0;
	string junk;
	while (getline(stringIn,junk)){
		h++;
		if (w<junk.length())
			w=junk.length();
	}
}

void ShapeView::setFillType(int ft){

	if (ft == ShapeView::HALLOW){
		if (Shape::trace) cout <<"The fill type was set to HALLOW"<<endl;
		fillType = ShapeView::HALLOW;
	}else if(ft == ShapeView::FILLED){
		if (Shape::trace) cout <<"The fill type was set to FILLED"<<endl;
		fillType = ShapeView::FILLED;
	}else if(ft == ShapeView::INFO){
		if (Shape::trace) cout <<"The fill type was set to INFO"<<endl;
		fillType = ShapeView::INFO;
	}

}

void ShapeView::setForground(char fg){
	forground = fg;
}
void ShapeView::setBackground(char bg){
	background = bg;
}
void ShapeView::setShape(const Shape* shapeToDraw){
	shapeRecieved=shapeToDraw;
	fillType=FILLED;
	background=' ';
	forground='*';
}

ShapeView& ShapeView::operator =(const Shape* shapeToDraw){
	shapeRecieved=shapeToDraw;
}
ShapeView& ShapeView::operator =(const ShapeView &svIn){
	if(Shape::trace) cout<<endl<<"Resetting a shape view object from an existing shape view object."<<endl;
	shapeRecieved=svIn.shapeRecieved;
	fillType=svIn.fillType;
	background=svIn.background;
	forground=svIn.forground;
}
ShapeView::ShapeView(const ShapeView &svIn){
	if(Shape::trace) cout<<endl<<"Creating a shape view object from an existing shape view object."<<endl;
	shapeRecieved=svIn.shapeRecieved;
	fillType=svIn.fillType;
	background=svIn.background;
	forground=svIn.forground;
}
ShapeView::ShapeView(const Shape* shapeToDraw) {
	if(Shape::trace) cout<<endl<<"Creating a shape view object."<<endl;
	setShape(shapeToDraw);
}
ShapeView::~ShapeView() {
}
