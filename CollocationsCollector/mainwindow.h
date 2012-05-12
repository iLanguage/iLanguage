#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QList>
#include <QFileDialog>
#include <QDesktopServices>
#include <phonon>

#include <QFile>
#include <QMessageBox>
#include <QTextStream>
#include <QString>
#include <QtWebKit>
#include <QTextCursor>
namespace Ui {
    class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    Ui::MainWindow *ui;

    QStringList sentences;
    QString corpus;
    QStringList words;
    void loadFile(const QString &filename);
    void findSentences(const QString &text);
    bool saveToFile(QString filename);
    QString currentFile;
    void setCurrentFile(const QString &fileName);
    QString strippedName(const QString &fullFileName);

    QList<Phonon::MediaSource> sources;
    Phonon::MediaObject *mediaObject;
    Phonon::AudioOutput *audioOutput;
    Phonon::MediaObject *metaInformationResolver;

private slots:
    void openFile();
    void listenExamples();
    void listenToSelectedText();
    void addFiles();
    void playNext();
    void collectExamples();
    bool saveExamples();
    bool saveAs();
    void aboutToFinish();
    void finished();
};

#endif // MAINWINDOW_H
