#include "mainwindow.h"
#include "ui_mainwindow.h"

//standard initializing method
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    //setting up phonon
    /*audioOutput object we're creating is known as an audio sink in Phonon terms,
        MusicCategory is for an equalizer or something liekt that that depends on the file
        being listened to.
        it communicates with the audio driver directly.
      */
    audioOutput = new Phonon::AudioOutput(Phonon::MusicCategory, this);
    /* MediaObject adds functionality that would be needed from an objet of media, ie play, pause rewind.
     */
    mediaObject = new Phonon::MediaObject(this);
    /* meta information resolver points to the current file
     */
    metaInformationResolver = new Phonon::MediaObject(this);
    /* Phonon uses a graph framework, so that objects are nodes in a graph and have to be connected to create a stream.
       this line connects the mediaobjet above to the audiooutput that drives the actual audio drivers
     */
    Phonon::createPath(mediaObject, audioOutput);

    //launch the gui for the application
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::playPause()
{
    /*
     Create a switch to turn the play button into a pause button if the audio is playing and vice versa
     */
    switch (mediaObject->state()){
    case Phonon::PlayingState:
        mediaObject->pause();
        //to tell the user that it is "playing"
        ui->pushButtonPlay->setChecked(false);
        break;
    case Phonon::PausedState:
        mediaObject->play();
        break;
    case Phonon::StoppedState:
        mediaObject->play();
        break;
        //if no files have been addded to the play list
    case Phonon::LoadingState:
        ui->pushButtonPlay->setChecked(false);
        break;

    }
}

void MainWindow::addFiles()
{

    /* use desktop services to help take the file window to where teh system has declared that music files
       are, ie my music
     */
    QStringList files = QFileDialog::getOpenFileNames(this, tr("Select Music Files"),
        QDesktopServices::storageLocation(QDesktopServices::MusicLocation));

    //pop up the play button because adding files will (in this case) automatically stop the play back(?)
    ui->pushButtonPlay->setChecked(false);
    if (files.isEmpty())
        return;
    int index = sources.size();
    foreach (QString string, files){
        Phonon::MediaSource source(string);
        sources.append(source);
    }
    if (!sources.isEmpty()){
        /* set metainformation resolver to point to the first file
         */
        metaInformationResolver->setCurrentSource(sources.at(index));
        /* set the media object to also point to the first file (through the metaInformationResolver
         */
        mediaObject->setCurrentSource(metaInformationResolver->currentSource());
    }
}
void MainWindow::nextFile()
{
    /*as long as there are still sons left in the source list,
        stop playing,
        adance the media object pointer to the next in the play list
        start playing
    */
    int index = sources.indexOf(mediaObject->currentSource()) +1;
    if (sources.size() > index){
        mediaObject->stop();
        mediaObject->setCurrentSource(sources.at(index));
        mediaObject->play();
    }
}

void MainWindow::aboutToFinish()
{
    /*enques the next file unless there are no more files left.
      */
    int index = sources.indexOf(mediaObject->currentSource()) + 1;
    if (sources.size() > index){
        mediaObject->enqueue(sources.at(index));
    } else {
        ui->pushButtonPlay->setChecked(false);
    }
}
void MainWindow::finished()
{
    ui->pushButtonPlay->setChecked(false);
}
