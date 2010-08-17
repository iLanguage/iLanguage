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

private:

    void loadFile(const QString &filename);
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
