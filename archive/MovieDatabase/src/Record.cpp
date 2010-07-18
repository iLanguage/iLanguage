/*
 * Record.cpp
 *
 *  Created on: Jul 14, 2010
 *      Author: gina
 */

#include "Record.h"
#include "MyTokenizer.h"
#include <string>
#include <iostream>
#include <boost/regex.hpp>
using namespace std;

istream& operator>>(istream& istr, Record& r){
	string line;
	istr>> line;
	MyTokenizer tokenized(line, '|');
	r.vectorToRecord(tokenized.tokens);
	return istr;
}
ostream& operator<<(ostream& ostr, Record& r){
	ostr<<"Title: "<<r.title<<endl<<endl;
	ostr<<"Genre: "<<r.genre<<endl<<endl;
	ostr<<"Movie Release Date: "<<r.year<<endl<<endl;
	ostr<<"Plot:"<<endl<<r.plot<<endl<<endl;
	ostr<<"Running Time: "<<r.runningTime<<endl<<endl;
	ostr<<"Audience Rating: "<<r.rating<<endl<<endl;

	MyTokenizer actorsList(r.actors, ';');
	ostr<<"Actor(s):"<<endl;
	for(vecSizeType i=0; i<actorsList.size(); i++){
		ostr<<"\t\t"<<actorsList[i]<<endl;
	}
	ostr<<endl;

	ostr<<"ID: "<<r.id<<endl<<endl;
	return ostr;
}
void Record::vectorToRecord(const vector<string>& tokenized){
	title=tokenized[0];
	genre=tokenized[1];
	year=atoi(tokenized[2].c_str());
	plot=tokenized[3];
	runningTime=atoi(tokenized[4].c_str());
	rating=tokenized[5];
	actors=tokenized[6];
	id= atoi(tokenized[7].c_str());
}

int Record::getId(){return id;}
string Record::getTitle(){return title;}
string Record::getGenre(){return genre;}
int Record::getYear(){return year;}
string Record::getPlot(){return plot;}
int Record::getRunningTime(){return runningTime;}
string Record::getRating(){return rating;}
string Record::getActors(){return actors;}

void Record::setId(int idIn){id=idIn;}
void Record::setTitle(string titleIn){title=titleIn;}
void Record::setGenre(string genreIn){genre=genreIn;}
void Record::setYear(int yearIn){year=yearIn;}
void Record::setPlot(string plotIn){plot=plotIn;}
void Record::setRunningTime(int runningTimeIn){runningTime=runningTimeIn;}
void Record::setRating(string ratingIn){rating=ratingIn;}
void Record::setActors(string actorsIn){actors=actorsIn;}

Record::Record(){

};

Record::Record(string& stringRecord) {
	//cout<<"Creating a movie record"<<endl;
	string sampleRecordAsString="2 Fast 2 Furious |"
			" Adventure; Thriller; Crime; Action |"
			" 2003 |"
			" Brain O'Conner (Paul Walker) runs from LA, ensuing criminal actions "
			"from the previous Fast and the Furious installment. He runs to Miami "
			"where he earns money and respect by street racing. However, he is caught "
			"by the police. Agent Bilkins, another familiar face from the first movie, "
			"offers Brian a deal. Rather than going to jail he can go undercover, working "
			"for Carter Verone. Verone is a drug lord with a high bankroll. Brian accepts "
			"under the pretence that he can pick his own partner. He travels back to his "
			"(assumably) once home and recruits childhood friend Roman Pierce (Tyrese). "
			"O'Conner and Pierce work with Monica Clemente (Eva Mendes) to try and bring "
			"down Verone. | "
			"108 | "
			"PG-13 (Parental Guidance) | "
			"Tyrese Gibson as Roman Pearce; Paul Walker as Brian O'Conner; Cole Hauser"
			" as Carter Verone; Ludacris as Tej; Eva Mendes as Monica Fuentes; Devon Aoki "
			"as Suki; James Remar as Agent Markham; John Cenatiempo as Korpi; Corey Michael"
			" Eubanks as Max Campisi; Thom Barry as Agent Bilkins; Amaury Nolasco as Orange "
			"Julius; Michael Ealy as Slap Jack; Jin Auyeung as Jimmy; Edward Finlay as Agent"
			" Dunn; Mark Boone Junior as Detective Whitworth; Matt Gallini as Enrique; Roberto "
			"Sanchez as Roberto; Eric Etebari as Darden; Troy Brown as Paul Hackett; Sam Maloof"
			" as Joe Osborne; Roberto 'Sanz' Sanchez as Roberto; Troy Robinson as Feliz Vispone; "
			"Jose Perez as Jose; Sincerely A. Ward as Slap Jack's Girlfriend; Nievecita Dubuque "
			"as Suki's Girl; Tequilla Hill as Suki's Girl; Bettina Huffer as Suki's Girl; "
			"Phuong Tuyet Vo as Suki's Girl; Felecia Rafield as Detective; Mateo Herreros as"
			" Detective; Walter 'Duke' Foster as Detective; Zachary L. Mann as US Customs Lead "
			"Agent; Marc Macaulay as Agent; Cobette Harper as Agent; Limary Agosto as Waitress; "
			"Tony Bolano as Gardener; Tara Carroll as Seductress; Neal H. Moritz as Swerving Cop;"
			" Marianne M. Arreaga as Police Chopper Pilot; Tamara Jones as Customs Technician | "
			"542";

	MyTokenizer tokenized(stringRecord, '|');
	vectorToRecord(tokenized.tokens);
}

Record::~Record() {
	// TODO Auto-generated destructor stub
}
