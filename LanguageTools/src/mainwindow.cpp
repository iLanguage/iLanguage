#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QFileDialog>
#include <QFile>
#include <QMessageBox>
#include <QTextStream>
#include "tokenizer.h"
#include <QString>
#include <QtWebKit>
#include <phonon>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    //ui->webViewWordList = new QWebView(this);
    //ui->webViewWordList->load(QUrl("http://www.google.com/ncr"));
    //ui->comboBoxCollocation->addItem("according to");

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
void MainWindow::buttonClickHandler(){
    ui->textEditCorpus->setText("Corpus here");
    QString collocation=ui->comboBoxCollocation->currentText();

    //execl("/usr/bin/text2wave","hello.txt  -o /home/gina/searching.wave");
    //execl("/usr/bin/play","/home/gina/searching.wave");
    /*
    Phonon::MediaObject *music =
            Phonon::createPlayer(Phonon::MusicCategory,
                                 Phonon::MediaSource("/home/gina/searching.wav"));
    music->play();
    */
    collocation = "\""+collocation+"\"";
    ui->webViewWordList->load(QUrl("http://www.google.ca/search?&q="+collocation+"+site:gc.ca"));
}
void MainWindow::open(){
    QString fileName = QFileDialog::getOpenFileName(this);
    if (!fileName.isEmpty())
        loadFile(fileName);
}
//http://doc.trolltech.com/main-snapshot/qfiledialog.html
void MainWindow::saveAs(){
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

void MainWindow::loadFile(const QString &filename)
{

    QFile file(filename);
    if (!file.open(QFile::ReadOnly | QFile::Text)){
        QMessageBox::warning(this, tr("Tools"),tr("Cannot read file %1:\n%2.").arg(filename).arg(file.errorString()));

        return;
    }
    QTextStream in(&file);
    corpus=in.readAll();


    findSentences(corpus);
    QString formatedSentences;
    /*
     *Loop through the sentences and print them double spaced
     */
    //formatedSentences = sentences.join("\n\n");
    foreach(QString sentence, sentences){
        formatedSentences +=sentence;
        formatedSentences +=".\n\n";
    }
    ui->textEditCorpus->setText(formatedSentences);
    statusBar()->showMessage(tr("File loaded"),2000);
}
void MainWindow::findSentences(const QString &text)
{
    QString delimiter =".";

    Tokenizer sentencestokens(text,delimiter);
    sentences = sentencestokens.tokens;
    ui->textEditWordlist->setText(sentencestokens.tokens[0]);
    //http://kylescholz.com/projects/wordnet/?text=collocation
    ui->webViewWordList->load(QUrl("http://openlanguage.ca"));

}
