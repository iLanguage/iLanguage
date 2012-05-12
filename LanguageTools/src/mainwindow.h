#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

namespace Ui {
    class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();
public slots:
    void buttonClickHandler();
    void open();
    void saveAs();

private:

    QStringList sentences;
    QString corpus;
    QStringList words;

    void loadFile(const QString &filename);

    void findSentences(const QString &text);
    Ui::MainWindow *ui;


private slots:
    void playPause();
    void addFile();
    void nextFile();
    void aboutToFinish();
    void finished();

private:
    QList<Phonon::MediaSource> sources;
    Phonon::MediaObject *mediaObject;
    Phonon::AudioOutput *audioOutput;
    Phonon::MediaObject *metaInformationResolver;
};

#endif // MAINWINDOW_H
