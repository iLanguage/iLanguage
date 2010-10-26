#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <fstream>

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

    setCurrentFile("untitled.txt");
    ui->setupUi(this);
    ui->textEditCollocationsList->setText("Drag and drop sentences here.");
}

MainWindow::~MainWindow()
{
    delete ui;
}



void MainWindow::collectExamples()
{

    QString collocation=ui->comboBoxCollocations->currentText();
    collocation = "\""+collocation+"\"";
    ui->webViewWordList->load(QUrl("http://www.google.ca/search?&q="+collocation+"+site:gc.ca"));
}

bool MainWindow::saveToFile(QString fileName){
    /*std::ofstream file(filename.c_str());
    QString QsaveText =  ui->textEditCollocationsList->toPlainText();
    std::string saveText = "hello";
    file << saveText << "\n";
    */
    QFile file(fileName);
    if (!file.open(QFile::WriteOnly | QFile::Text)) {
        QMessageBox::warning(this, tr("Application"),
                tr("Cannot write file %1:\n%2.")
                .arg(fileName)
                .arg(file.errorString()));
        return false;
    }

    QTextStream out(&file);
    QApplication::setOverrideCursor(Qt::WaitCursor);
    out << ui->textEditCollocationsList->toPlainText();
    QApplication::restoreOverrideCursor();

    setCurrentFile(fileName);
    return true;

}
bool MainWindow::saveAs()
{
    QString fileName = QFileDialog::getSaveFileName(this);
    if (fileName.isEmpty())
        return false;

    return saveToFile(fileName);
}
bool MainWindow::saveExamples()
{
    QString fileName = QFileDialog::getSaveFileName(this, tr("Save File"),
                               "/home/gina/Music/untitled_collocations_list.txt",
                               tr("Text (*.doc *.txt *.html)"));
    if (fileName == "" || fileName == NULL){
        return false;
    }
    //QFile file(fileName);

    if (currentFile.isEmpty()) {
        return saveAs();
    } else {
        return saveToFile(fileName);
    }


    //    QFileDialog dialog(this);
    //    dialog.setFileMode(QFileDialog::AnyFile);
    //    dialog.setNameFilter(tr("Text (*.doc *.txt *.pdf *.xml *.docx)"));
    //    dialog.setViewMode(QFileDialog::Detail);
    //    //setDirectory("/Users/gina/Documents/");
    //    dialog.saveState();
    //    QString fileNames;
    //     if (dialog.exec())
    //         fileNames = dialog.selectedFiles();
    //         QFile file(fileNames[0]);
}
void MainWindow::listenToSelectedText()
{
    QString echoToText = "echo '";

    QTextCursor cursor = ui->textEditCollocationsList->textCursor();
    if(!cursor.hasSelection()){
       cursor.select(QTextCursor::WordUnderCursor);
       //qDebug()<<"Don't have selection";
   }
    QString toRead = cursor.selectedText();
    //corpus = "I will read the corpus for you one more time.";// ui->textEditCollocationsList->selectedText;
    echoToText.append(toRead);
    echoToText.append("' > /home/gina/Music/something.txt");
    system(echoToText.toAscii().constData());
    //system("echo 'Hi, i can read your examples for you. Just click on the listen button below.' > /home/gina/Music/something.txt");
    system("text2wave /home/gina/Music/something.txt -o /home/gina/Music/something.wav");
    system("lame -V2 /home/gina/Music/something.wav /home/gina/Music/something.mp3");
    system("mpg123 /home/gina/Music/something.mp3");
}
void MainWindow::listenExamples()
{
    /*
     Create a switch to turn the play button into a pause button if the audio is playing and vice versa
     */
    switch (mediaObject->state()){
    case Phonon::PlayingState:
        mediaObject->pause();
        //to tell the user that it is "playing"
        ui->pushButtonListen->setChecked(false);
        break;
    case Phonon::PausedState:
        mediaObject->play();
        break;
    case Phonon::StoppedState:
        mediaObject->play();
        break;
        //if no files have been addded to the play list
    case Phonon::LoadingState:
        ui->pushButtonListen->setChecked(false);
        break;

    }
}
void MainWindow::openFile()
{
    QString fileName = QFileDialog::getOpenFileName(this,tr("Select a text file"),
                                                    QDesktopServices::storageLocation(QDesktopServices::MusicLocation));
    if (!fileName.isEmpty())
        loadFile(fileName);
}

void MainWindow::loadFile(const QString &filename)
{

    QFile file(filename);
    if (!file.open(QFile::ReadOnly | QFile::Text)){
        QMessageBox::warning(this, tr("Tools"),tr("Cannot read file %1:\n%2.").arg(filename).arg(file.errorString()));

        return;
    }
    QTextStream in(&file);
    corpus=in.readAll();

    ui->textEditCollocationsList->setText(corpus);
    statusBar()->showMessage(tr("File loaded"),2000);
}
void MainWindow::findSentences(const QString &text)
{
  //
}

void MainWindow::setCurrentFile(const QString &fileName)
{
    currentFile = fileName;

    //ui->textEditCollocationsList->document()->setModified(false);
    /*setWindowModified(false);

    QString shownName;
    if (currentFile.isEmpty())
        shownName = "untitled.txt";
    else
        shownName = strippedName(currentFile);

    setWindowTitle(tr("%1[*] - %2").arg(shownName).arg(tr("Collocations Collector")));
    */
}

QString MainWindow::strippedName(const QString &fullFileName)
{
    return QFileInfo(fullFileName).fileName();
}

void MainWindow::addFiles()
{

    /* use desktop services to help take the file window to where teh system has declared that music files
       are, ie my music
     */
    QStringList files = QFileDialog::getOpenFileNames(this, tr("Select Music Files"),
        QDesktopServices::storageLocation(QDesktopServices::MusicLocation));

    //pop up the play button because adding files will (in this case) automatically stop the play back(?)
    ui->pushButtonListen->setChecked(false);
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

void MainWindow::playNext()
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
        ui->pushButtonListen->setChecked(false);
    }
}
void MainWindow::finished()
{
    ui->pushButtonListen->setChecked(false);
}
