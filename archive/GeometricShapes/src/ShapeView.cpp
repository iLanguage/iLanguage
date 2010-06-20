/*
 * ShapeView.cpp
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#include "ShapeView.h"
#include "Shape.h"
#include "Framer.h"
#include <string>
#include <iostream>

using namespace std;

/*
 * drawBorders draws a shape with borders around it. It consists of two steps:
 * 		1:  Get a text/shape drawing using the current shapeview settings (Filled, Hallow, Info)
 * 		2:  Draw the text with borders around it
 */
string ShapeView::drawBorders() const {
	string textToFrame ="Error";
	if (fillType == ShapeView::HALLOW){
		textToFrame = shapeRecieved->toStringHollow(forground, background);
	}else if(fillType == ShapeView::FILLED){
		textToFrame = shapeRecieved->toStringFilled(forground, background);
	}else if(fillType == ShapeView::INFO){
		textToFrame = shapeRecieved->toStringInfo();
	}

	int cornerCode=shapeRecieved->getID();
	Framer framedText(textToFrame,cornerCode);
	return framedText.toString();
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
