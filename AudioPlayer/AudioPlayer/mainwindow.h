#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QList>
#include <QFileDialog>
#include <QDesktopServices>
#include <phonon>

namespace Ui {
    class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();
private slots:
    void playPause();
    void addFiles();
    void nextFile();
    void aboutToFinish();
    void finished();


private:
    Ui::MainWindow *ui;
    QList<Phonon::MediaSource> sources;
    Phonon::MediaObject *mediaObject;
    Phonon::AudioOutput *audioOutput;
    Phonon::MediaObject *metaInformationResolver;
};

#endif // MAINWINDOW_H
