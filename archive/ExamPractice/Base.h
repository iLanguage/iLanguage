#ifndef BASE_H_
#define BASE_H_


class Base{
	private:
		int x;
		int y;
	public: 
		int getX();
		void setX(int xIn);
		
		void run();
		Base();
		virtual ~Base();

};
#endif /*BASE_H_*/
