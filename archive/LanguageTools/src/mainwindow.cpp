#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QFileDialog>
#include <QFile>
#include <QMessageBox>
#include <QTextStream>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}
void MainWindow::buttonClickHandler(){
    ui->textEditCorpus->setText("Corpus here");
}
void MainWindow::open(){
    QString fileName = QFileDialog::getOpenFileName(this);
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
    ui->textEditCorpus->setText(in.readAll());
    statusBar()->showMessage(tr("File loaded"),2000);
}
