/*
 * DBManager.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "DBManager.h"
#include <iostream>
using namespace std;

void DBManager::run(){
	cout<<"DBManager is turned on."<<endl;

	char* dvdDatabaseFile="src/dvdmoviedb.txt";
	movieDB.importRecords(dvdDatabaseFile);
	cout<<"The database contains "<<movieDB.size()<<" records."<<endl;
	//movieDB.insertRecord("2 Fast 2 Furious | Adventure; Thriller; Crime; Action | 2003 | Brain O'Conner (Paul Walker) runs from LA, ensuing criminal actions from the previous Fast and the Furious installment. He runs to Miami where he earns money and respect by street racing. However, he is caught by the police. Agent Bilkins, another familiar face from the first movie, offers Brian a deal. Rather than going to jail he can go undercover, working for Carter Verone. Verone is a drug lord with a high bankroll. Brian accepts under the pretence that he can pick his own partner. He travels back to his (assumably) once home and recruits childhood friend Roman Pierce (Tyrese). O'Conner and Pierce work with Monica Clemente (Eva Mendes) to try and bring down Verone. | 108 | PG-13 (Parental Guidance) | Tyrese Gibson as Roman Pearce; Paul Walker as Brian O'Conner; Cole Hauser as Carter Verone; Ludacris as Tej; Eva Mendes as Monica Fuentes; Devon Aoki as Suki; James Remar as Agent Markham; John Cenatiempo as Korpi; Corey Michael Eubanks as Max Campisi; Thom Barry as Agent Bilkins; Amaury Nolasco as Orange Julius; Michael Ealy as Slap Jack; Jin Auyeung as Jimmy; Edward Finlay as Agent Dunn; Mark Boone Junior as Detective Whitworth; Matt Gallini as Enrique; Roberto Sanchez as Roberto; Eric Etebari as Darden; Troy Brown as Paul Hackett; Sam Maloof as Joe Osborne; Roberto 'Sanz' Sanchez as Roberto; Troy Robinson as Feliz Vispone; Jose Perez as Jose; Sincerely A. Ward as Slap Jack's Girlfriend; Nievecita Dubuque as Suki's Girl; Tequilla Hill as Suki's Girl; Bettina Huffer as Suki's Girl; Phuong Tuyet Vo as Suki's Girl; Felecia Rafield as Detective; Mateo Herreros as Detective; Walter 'Duke' Foster as Detective; Zachary L. Mann as US Customs Lead Agent; Marc Macaulay as Agent; Cobette Harper as Agent; Limary Agosto as Waitress; Tony Bolano as Gardener; Tara Carroll as Seductress; Neal H. Moritz as Swerving Cop; Marianne M. Arreaga as Police Chopper Pilot; Tamara Jones as Customs Technician | 542");
	movieDB.buildIndices();

	//testNavigator();
	testQuery();

}
void DBManager::testQuery(){
	genreYearUserQuery.query();
	genreYearUserQuery.displayResults();
	ratingTimeQuery.query();
	ratingTimeQuery.displayResults();
	timeActorQuery.query();
	timeActorQuery.displayResults();
}
void DBManager::testNavigator(){
	movieDB.last();
	movieDB.next();
	movieDB.first();
	movieDB.previous();
	movieDB.next();
}

DBManager::DBManager(){
	genreYearUserQuery.setDB(movieDB);
	ratingTimeQuery.setDB(movieDB);
	timeActorQuery.setDB(movieDB);
}

DBManager::~DBManager() {
	// TODO Auto-generated destructor stub
}
