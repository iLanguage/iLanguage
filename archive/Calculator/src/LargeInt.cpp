/*
 * LargeInt.cpp
 *
 *  Created on: Jun 1, 2010
 *      Author: gina
 */

#include "LargeInt.h"
#include <string>
#include <iostream>
#include "Sequence.h"
using namespace std;

LargeInt::LargeInt(int n) : value(n){
	if (trace) cout<<"Created an empty LargeInt of size "<<n<<endl;

}


LargeInt::LargeInt(char* characterInput):value(characterInput){

	if (trace)cout<<"Creating a largeint"<<endl;
	//if declared here rather than above in intialization list, the result is a local variable which is pretty useless.
	//Sequence value2(characterInput);
}

void LargeInt::setValue(char* characterInput){
	Sequence temp(characterInput);
	value = temp;
	if (trace) cout<<"Resetting the value to "<<characterInput<<endl;
}

LargeInt::LargeInt(const LargeInt & source): value(source.value){
	if (trace) cout<<"Copying a  large int to a new one"<<endl;
}

LargeInt& LargeInt::operator =(const LargeInt & source){
	if (trace) cout<<"Assigning a  large int to a previously initialized large int"<<endl;
	if (this != &source){
		value  = source.value;
	}
	return *this;
}

LargeInt& LargeInt::Add( LargeInt &input){
	int temp = input.getSize();
	if (trace) cout<<endl<<"Checking the size of the accumulator..."<<getSize()<<
			"\nChecking the size of the input...\t\t"<<input.getSize()<<endl;
	if (trace) cout<<endl<<"Checking the originalstring of the accumulator..."<<getOriginalString()<<
				"\nChecking the originalstring of the input...\t\t"<<input.getOriginalString()<<endl;



	int maxsize = 0;
	Sequence x;
	Sequence y;
	//copy the values of the two operands into holders x (longer) and y (shorter)
	if ( input.getSize() > getSize() ){
		if (trace) cout<<"The input is longer than the accumulator."<<endl;
		maxsize = input.getSize();
		 x = input.value;
		 y = value;
	}else {
		if (trace) cout<< "The accumulator is longer than the input."<<endl;
		maxsize = getSize();
		 x = value;
		 y = input.value;
	}
	char* holder = x.getAsString();
	char* anotherHolder = y.getAsString();
	cout<<"Adding \n " <<holder<<endl<<"+"<<anotherHolder<<endl;


	//check if need a larger result to absorb the carry
	int calculatedSize=0;
	if(x.getElement(0)==0){
		if (trace) cout<<"The longest operand already has enough space to absorb a carry, creating a result of the same size."<<endl;
		calculatedSize = x.getSize();
	}else{
		if (trace) cout<<"Making a longer result array in case there is a carry."<<endl;
		calculatedSize = x.getSize()+1;
	}
	LargeInt result(calculatedSize);
	//in case the extra place value won't be used, initialize it to 0
	result.value.setElement(0, 0);


	int carry=0;
	//for the places starting at zero, going until the size of the smaller operand
	for(int i=0; i<y.getSize();i++){
		if (trace) cout<<"Adding "<<x.getValueAtPosition(i)<< " to "<<y.getValueAtPosition(i)<<endl;

		//calculate the addition in that position
		carry = x.getValueAtPosition(i)+ y.getValueAtPosition(i);

		//put the carry into the result.
		if(trace) cout<<" "<<i<<" place of result was: "<<result.value.getValueAtPosition(i)<<endl;
		if(carry<baseSystem){//if the carry fits in the base system, put it in the result.
			result.value.setPosition(i, carry);
		}else{//if the carry is too big substract the basesystem and star the whileloop below
			result.value.setPosition(i, carry-baseSystem);
		}
		if(trace) cout<<" "<<i<<" place of result is now: "<<result.value.getValueAtPosition(i)<<endl;

		/*
		 * While loop to do multiple carries as the result of 1 addition. eg, 999+1 results in 1 addition that causes 2 carrys.
		 * Part 1: put the carry-baseSystem into x
		 * Part 2: add one to the next higher position
		 *
		 * Repeat until the carry fits.
		 */
		int keepCarrying=0;
		while(carry>=baseSystem){
				//put the remainder into the position higher to the left
				if(trace) cout<<" "<<i+keepCarrying<<" place of x was: "<<x.getValueAtPosition(i+keepCarrying)<<endl;
				x.setPosition(i+keepCarrying, carry-baseSystem);
				if(trace) cout<<" "<<i+keepCarrying<<" place of x is now: "<<x.getValueAtPosition(i+keepCarrying)<<endl;

				//now add one to the next higher position of x as long as youre not at the end of x
				keepCarrying++;
				if(i+keepCarrying >= x.getSize()){
					if (trace)cout<<"Ran out of x to carry over, setting the carry to 0+1"<<endl;
					carry=0+1;

				}else{
					carry = x.getValueAtPosition(i+keepCarrying)+1;
				}
				if(trace) cout<<" "<<i+keepCarrying<<" place of x plus 1 would be: "<<carry<<endl; //if carry is too big this will loop again
				if (carry<baseSystem){ //if carry fits in x, put it in, if it doesnt fit the loop will break it up into a carry and a remainder
					x.setPosition(i+keepCarrying, carry);
				}
		}

	}//end for loop for size of y

	//for the higher digits of the longer opperand, copy the digits.
	for(int k=y.getSize(); k<=x.getSize(); k++)
	{
		//TBD if the element is bigger than the carry, carry again.
		if(trace) cout<<" "<<k<<" place of x: "<<x.getValueAtPosition(k)<<endl;
		result.value.setPosition(k, x.getValueAtPosition(k));
		if(trace) cout<<" "<<k<<" copied to place of result is now: "<<result.value.getValueAtPosition(k)<<endl;

	}

	cout<<"="<<result.getAsStringy()<<endl;
	value = result.value;

	return result;//question, why isnt this *result


}//end add

/*
LargeInt::Subtract(LargeInt& input){

	if(trace) cout<<"First comparing numbers to see if the result is negative. "<<endl;
	LargeInt result(12);

	return result;
}
*/


//LargeInt::LargeInt() {
	// TODO Auto-generated constructor stub

//}

LargeInt::~LargeInt() {


	// TODO Auto-generated destructor stub
}

int LargeInt::getSize(){
	return value.getSize();

}

char* LargeInt::getOriginalString(){
	return value.getOriginalString();
}

char* LargeInt::getAsStringy(){
	return value.getAsString();
}
