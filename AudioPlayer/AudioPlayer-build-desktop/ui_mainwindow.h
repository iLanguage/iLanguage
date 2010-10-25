/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created: Mon Oct 25 11:12:32 2010
**      by: Qt User Interface Compiler version 4.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtGui/QAction>
#include <QtGui/QApplication>
#include <QtGui/QButtonGroup>
#include <QtGui/QGridLayout>
#include <QtGui/QHeaderView>
#include <QtGui/QMainWindow>
#include <QtGui/QMenuBar>
#include <QtGui/QPushButton>
#include <QtGui/QStatusBar>
#include <QtGui/QToolBar>
#include <QtGui/QVBoxLayout>
#include <QtGui/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QGridLayout *gridLayout;
    QVBoxLayout *verticalLayout;
    QPushButton *pushButtonAdd;
    QPushButton *pushButtonPlay;
    QPushButton *pushButtonNext;
    QMenuBar *menuBar;
    QToolBar *mainToolBar;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QString::fromUtf8("MainWindow"));
        MainWindow->resize(66, 194);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QString::fromUtf8("centralWidget"));
        gridLayout = new QGridLayout(centralWidget);
        gridLayout->setSpacing(6);
        gridLayout->setContentsMargins(11, 11, 11, 11);
        gridLayout->setObjectName(QString::fromUtf8("gridLayout"));
        verticalLayout = new QVBoxLayout();
        verticalLayout->setSpacing(6);
        verticalLayout->setObjectName(QString::fromUtf8("verticalLayout"));
        pushButtonAdd = new QPushButton(centralWidget);
        pushButtonAdd->setObjectName(QString::fromUtf8("pushButtonAdd"));
        QIcon icon;
        icon.addFile(QString::fromUtf8("../../../../../../usr/share/icons/gnome/32x32/actions/player_eject.png"), QSize(), QIcon::Normal, QIcon::Off);
        pushButtonAdd->setIcon(icon);

        verticalLayout->addWidget(pushButtonAdd);

        pushButtonPlay = new QPushButton(centralWidget);
        pushButtonPlay->setObjectName(QString::fromUtf8("pushButtonPlay"));
        QIcon icon1;
        icon1.addFile(QString::fromUtf8("../../../../../../usr/share/icons/gnome/32x32/actions/gtk-media-play-ltr.png"), QSize(), QIcon::Normal, QIcon::Off);
        pushButtonPlay->setIcon(icon1);

        verticalLayout->addWidget(pushButtonPlay);

        pushButtonNext = new QPushButton(centralWidget);
        pushButtonNext->setObjectName(QString::fromUtf8("pushButtonNext"));
        QIcon icon2;
        icon2.addFile(QString::fromUtf8("../../../../../../usr/share/icons/gnome/32x32/actions/media-skip-forward.png"), QSize(), QIcon::Normal, QIcon::Off);
        pushButtonNext->setIcon(icon2);

        verticalLayout->addWidget(pushButtonNext);


        gridLayout->addLayout(verticalLayout, 0, 0, 1, 1);

        MainWindow->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(MainWindow);
        menuBar->setObjectName(QString::fromUtf8("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 66, 25));
        MainWindow->setMenuBar(menuBar);
        mainToolBar = new QToolBar(MainWindow);
        mainToolBar->setObjectName(QString::fromUtf8("mainToolBar"));
        MainWindow->addToolBar(Qt::TopToolBarArea, mainToolBar);
        statusBar = new QStatusBar(MainWindow);
        statusBar->setObjectName(QString::fromUtf8("statusBar"));
        MainWindow->setStatusBar(statusBar);

        retranslateUi(MainWindow);
        QObject::connect(pushButtonAdd, SIGNAL(clicked()), MainWindow, SLOT(addFiles()));
        QObject::connect(pushButtonNext, SIGNAL(clicked()), MainWindow, SLOT(nextFile()));
        QObject::connect(pushButtonPlay, SIGNAL(clicked()), MainWindow, SLOT(playPause()));

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", 0, QApplication::UnicodeUTF8));
        pushButtonAdd->setText(QString());
        pushButtonPlay->setText(QString());
        pushButtonNext->setText(QString());
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
