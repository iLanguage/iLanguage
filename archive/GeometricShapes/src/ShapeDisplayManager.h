/*
 * ShapeDisplayManager.h
 * This class stores a list of type vector<Shape *>, and provides an interactive process that allows the user to create, remove, and display shapes.
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#ifndef SHAPEDISPLAYMANAGER_H_
#define SHAPEDISPLAYMANAGER_H_
#include <vector>
#include <string>
#include "Shape.h"
#include "ShapeView.h"
using namespace std;


class ShapeDisplayManager {
public:
	void run();
	void printMenu();
	void runInteractively();
	void removeShape();
	void createShape();
	void displayShape();
	void listShapes();
	int getInt(std::string userPrompt);

	ShapeDisplayManager();
	virtual ~ShapeDisplayManager();

private:
	std::vector<Shape*> shapeList;// http://www.cplusplus.com/reference/stl/vector/
};

#endif /* SHAPEDISPLAYMANAGER_H_ */
