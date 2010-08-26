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
};

#endif // MAINWINDOW_H
