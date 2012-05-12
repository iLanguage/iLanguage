/*
 * ShapeDisplayManager.h
 * This class provides a user interface to the Shapes classes which allows the user to create, remove, and display shapes.
 * 	It can also run a number of tests to ensure that the connections with related classes are working properly.
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
	void runTests();
	void runObjectPoolTests();
	void removeShape();
	void createShape();
	void displayShape(int shapeID);
	void removeShape(int shapeID);
	void listShapes();
	void listShapeIds();
	int findShape(int shapeID);
	int getInt(std::string userPrompt);

	ShapeDisplayManager();
	virtual ~ShapeDisplayManager();

private:
	/*
	 * Container which allows user to add a number of shape objects into a vector.
	 * Uses:
	 * 	Cycle through the shapes
	 * 	Recycle objects to conserve memory
	 */
	std::vector<Shape*> shapeList;// http://www.cplusplus.com/reference/stl/vector/
	ShapeView shapeViewObject;
};

#endif /* SHAPEDISPLAYMANAGER_H_ */
