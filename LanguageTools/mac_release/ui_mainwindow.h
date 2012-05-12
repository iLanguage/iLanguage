/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created: Thu Aug 26 19:45:42 2010
**      by: Qt User Interface Compiler version 4.6.3
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtGui/QAction>
#include <QtGui/QApplication>
#include <QtGui/QButtonGroup>
#include <QtGui/QComboBox>
#include <QtGui/QHeaderView>
#include <QtGui/QLabel>
#include <QtGui/QMainWindow>
#include <QtGui/QMenu>
#include <QtGui/QMenuBar>
#include <QtGui/QPushButton>
#include <QtGui/QStatusBar>
#include <QtGui/QTabWidget>
#include <QtGui/QTextEdit>
#include <QtGui/QWidget>
#include <QtWebKit/QWebView>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QAction *action_Open;
    QAction *actionExport_Wordlist;
    QAction *actionExport_Selected_Wordlist;
    QWidget *centralWidget;
    QTabWidget *tabWidgetWordlist;
    QWidget *tab;
    QTextEdit *textEditCorpus;
    QWidget *tab_2;
    QTextEdit *textEditWordlist;
    QWebView *webViewWordList;
    QComboBox *comboBoxCollocation;
    QLabel *label;
    QPushButton *pushButtonLoad;
    QMenuBar *menuBar;
    QMenu *menuFile;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QString::fromUtf8("MainWindow"));
        MainWindow->resize(739, 541);
        action_Open = new QAction(MainWindow);
        action_Open->setObjectName(QString::fromUtf8("action_Open"));
        actionExport_Wordlist = new QAction(MainWindow);
        actionExport_Wordlist->setObjectName(QString::fromUtf8("actionExport_Wordlist"));
        actionExport_Selected_Wordlist = new QAction(MainWindow);
        actionExport_Selected_Wordlist->setObjectName(QString::fromUtf8("actionExport_Selected_Wordlist"));
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QString::fromUtf8("centralWidget"));
        tabWidgetWordlist = new QTabWidget(centralWidget);
        tabWidgetWordlist->setObjectName(QString::fromUtf8("tabWidgetWordlist"));
        tabWidgetWordlist->setGeometry(QRect(0, 0, 731, 451));
        tabWidgetWordlist->setMovable(true);
        tab = new QWidget();
        tab->setObjectName(QString::fromUtf8("tab"));
        textEditCorpus = new QTextEdit(tab);
        textEditCorpus->setObjectName(QString::fromUtf8("textEditCorpus"));
        textEditCorpus->setGeometry(QRect(10, 10, 411, 251));
        tabWidgetWordlist->addTab(tab, QString());
        tab_2 = new QWidget();
        tab_2->setObjectName(QString::fromUtf8("tab_2"));
        textEditWordlist = new QTextEdit(tab_2);
        textEditWordlist->setObjectName(QString::fromUtf8("textEditWordlist"));
        textEditWordlist->setGeometry(QRect(0, 70, 201, 341));
        webViewWordList = new QWebView(tab_2);
        webViewWordList->setObjectName(QString::fromUtf8("webViewWordList"));
        webViewWordList->setGeometry(QRect(210, 20, 511, 391));
        webViewWordList->setUrl(QUrl("about:blank"));
        comboBoxCollocation = new QComboBox(tab_2);
        comboBoxCollocation->setObjectName(QString::fromUtf8("comboBoxCollocation"));
        comboBoxCollocation->setGeometry(QRect(0, 40, 191, 21));
        comboBoxCollocation->setEditable(true);
        comboBoxCollocation->setInsertPolicy(QComboBox::InsertAtTop);
        label = new QLabel(tab_2);
        label->setObjectName(QString::fromUtf8("label"));
        label->setGeometry(QRect(0, 0, 701, 16));
        tabWidgetWordlist->addTab(tab_2, QString());
        pushButtonLoad = new QPushButton(centralWidget);
        pushButtonLoad->setObjectName(QString::fromUtf8("pushButtonLoad"));
        pushButtonLoad->setGeometry(QRect(240, 450, 191, 41));
        MainWindow->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(MainWindow);
        menuBar->setObjectName(QString::fromUtf8("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 739, 22));
        menuFile = new QMenu(menuBar);
        menuFile->setObjectName(QString::fromUtf8("menuFile"));
        MainWindow->setMenuBar(menuBar);
        statusBar = new QStatusBar(MainWindow);
        statusBar->setObjectName(QString::fromUtf8("statusBar"));
        MainWindow->setStatusBar(statusBar);

        menuBar->addAction(menuFile->menuAction());
        menuFile->addAction(action_Open);
        menuFile->addAction(actionExport_Wordlist);
        menuFile->addAction(actionExport_Selected_Wordlist);

        retranslateUi(MainWindow);
        QObject::connect(pushButtonLoad, SIGNAL(clicked()), MainWindow, SLOT(buttonClickHandler()));
        QObject::connect(action_Open, SIGNAL(triggered()), MainWindow, SLOT(open()));

        tabWidgetWordlist->setCurrentIndex(1);


        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", 0, QApplication::UnicodeUTF8));
        action_Open->setText(QApplication::translate("MainWindow", "&Open...", 0, QApplication::UnicodeUTF8));
        actionExport_Wordlist->setText(QApplication::translate("MainWindow", "Export Wordlist", 0, QApplication::UnicodeUTF8));
        actionExport_Selected_Wordlist->setText(QApplication::translate("MainWindow", "Export Selected Wordlist", 0, QApplication::UnicodeUTF8));
        tabWidgetWordlist->setTabText(tabWidgetWordlist->indexOf(tab), QApplication::translate("MainWindow", "Corpus", 0, QApplication::UnicodeUTF8));
        label->setText(QApplication::translate("MainWindow", "Type a word or expresion and then press Collect Examples. You can drag and drop sentences to your wordlist.", 0, QApplication::UnicodeUTF8));
        tabWidgetWordlist->setTabText(tabWidgetWordlist->indexOf(tab_2), QApplication::translate("MainWindow", "Wordlist", 0, QApplication::UnicodeUTF8));
        pushButtonLoad->setText(QApplication::translate("MainWindow", "Collect Examples...", 0, QApplication::UnicodeUTF8));
        menuFile->setTitle(QApplication::translate("MainWindow", "File", 0, QApplication::UnicodeUTF8));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
