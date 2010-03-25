-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 24, 2010 at 05:18 PM
-- Server version: 5.1.41
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `uuis`
--

-- --------------------------------------------------------

--
-- Table structure for table `additionalparameter`
--

CREATE TABLE IF NOT EXISTS `additionalparameter` (
  `ParameterID` int(255) NOT NULL AUTO_INCREMENT,
  `AssetID` int(255) NOT NULL,
  `ParameterName` varchar(128) NOT NULL,
  `Value` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`ParameterID`),
  KEY `AssetID` (`AssetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `additionalparameter`
--


-- --------------------------------------------------------

--
-- Table structure for table `building`
--

CREATE TABLE IF NOT EXISTS `building` (
  `BuildingID` int(255) NOT NULL AUTO_INCREMENT,
  `LocationID` int(255) NOT NULL,
  `BuildingName` varchar(128) NOT NULL,
  `Address` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`BuildingID`),
  KEY `LocationID` (`LocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `building`
--


-- --------------------------------------------------------

--
-- Table structure for table `computer`
--

CREATE TABLE IF NOT EXISTS `computer` (
  `AssetID` int(255) NOT NULL,
  `Type` varchar(64) DEFAULT NULL,
  `Processor` varchar(64) DEFAULT NULL,
  `MACAddress` varchar(64) DEFAULT NULL,
  `HardDriveCap` varchar(64) DEFAULT NULL,
  `ROM` varchar(64) DEFAULT NULL,
  `RAM` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`AssetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `computer`
--


-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `DepartmentID` int(255) NOT NULL AUTO_INCREMENT,
  `FacultyID` int(255) NOT NULL,
  `DepartmentName` varchar(128) NOT NULL,
  PRIMARY KEY (`DepartmentID`),
  KEY `FacultyID` (`FacultyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `department`
--


-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE IF NOT EXISTS `equipment` (
  `AssetID` int(255) NOT NULL,
  `UserID` int(255) NOT NULL,
  `SerialNo` varchar(64) DEFAULT NULL,
  `Type` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`AssetID`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipment`
--


-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE IF NOT EXISTS `faculty` (
  `FacultyID` int(255) NOT NULL AUTO_INCREMENT,
  `FacultyName` varchar(128) NOT NULL,
  `FacultyDean` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`FacultyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `faculty`
--


-- --------------------------------------------------------

--
-- Table structure for table `floor`
--

CREATE TABLE IF NOT EXISTS `floor` (
  `FloorID` int(255) NOT NULL AUTO_INCREMENT,
  `BuildingID` int(255) NOT NULL,
  `FloorNo` int(32) NOT NULL,
  PRIMARY KEY (`FloorID`),
  KEY `BuildingID` (`BuildingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `floor`
--


-- --------------------------------------------------------

--
-- Table structure for table `furniture`
--

CREATE TABLE IF NOT EXISTS `furniture` (
  `AssetID` int(255) NOT NULL,
  `Dimension` varchar(64) DEFAULT NULL,
  `Type` varchar(64) DEFAULT NULL,
  `Color` varchar(64) DEFAULT NULL,
  `Finish` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`AssetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `furniture`
--


-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE IF NOT EXISTS `group` (
  `GroupID` int(255) NOT NULL AUTO_INCREMENT,
  `UserID` int(255) NOT NULL,
  `LocationID` int(255) NOT NULL,
  `GroupName` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`GroupID`),
  KEY `UserID` (`UserID`),
  KEY `LocationID` (`LocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `group`
--


-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE IF NOT EXISTS `lab` (
  `LocationID` int(255) NOT NULL,
  `Responsible` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`LocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lab`
--


-- --------------------------------------------------------

--
-- Table structure for table `license`
--

CREATE TABLE IF NOT EXISTS `license` (
  `LicenseID` int(255) NOT NULL AUTO_INCREMENT,
  `UserID` int(255) NOT NULL,
  `SoftwareID` int(255) NOT NULL,
  `Key` varchar(128) NOT NULL,
  `DatePurchased` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `PONumber` varchar(64) DEFAULT NULL,
  `Type` varchar(64) NOT NULL,
  `ExpirationDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`LicenseID`),
  KEY `UserID` (`UserID`),
  KEY `SoftwareID` (`SoftwareID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `license`
--


-- --------------------------------------------------------

--
-- Table structure for table `licenseinstalledincomputer`
--

CREATE TABLE IF NOT EXISTS `licenseinstalledincomputer` (
  `LicenseID` int(255) NOT NULL,
  `AssetID` int(255) NOT NULL,
  PRIMARY KEY (`LicenseID`,`AssetID`),
  KEY `LicenseID` (`LicenseID`),
  KEY `AssetID` (`AssetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `licenseinstalledincomputer`
--


-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `LocationID` int(255) NOT NULL AUTO_INCREMENT,
  `DepartmentID` int(255) NOT NULL,
  `LocationName` varchar(128) NOT NULL,
  `Status` varchar(32) DEFAULT NULL,
  `SquareMeters` int(32) DEFAULT NULL,
  PRIMARY KEY (`LocationID`),
  KEY `DepartmentID` (`DepartmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `location`
--


-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `LogID` int(255) NOT NULL AUTO_INCREMENT,
  `UserID` int(255) NOT NULL,
  `LoginDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `LogoutDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`LogID`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `log`
--


-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE IF NOT EXISTS `office` (
  `LocationID` int(255) NOT NULL,
  PRIMARY KEY (`LocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `office`
--


-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE IF NOT EXISTS `permission` (
  `PermissionID` int(255) NOT NULL AUTO_INCREMENT,
  `PermissionName` varchar(128) NOT NULL,
  PRIMARY KEY (`PermissionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `permission`
--


-- --------------------------------------------------------

--
-- Table structure for table `physicalasset`
--

CREATE TABLE IF NOT EXISTS `physicalasset` (
  `AssetID` int(255) NOT NULL AUTO_INCREMENT,
  `LocationID` int(255) NOT NULL,
  `GroupID` int(255) NOT NULL,
  `BarCode` varchar(64) NOT NULL,
  `Owner` varchar(128) NOT NULL,
  `LegacyCode` varchar(64) DEFAULT NULL,
  `DatePurchased` timestamp NULL DEFAULT NULL,
  `WarrantyExpiration` timestamp NULL DEFAULT NULL,
  `Manufacturer` varchar(128) DEFAULT NULL,
  `Model` varchar(128) DEFAULT NULL,
  `Category` varchar(64) DEFAULT NULL,
  `Status` varchar(32) NOT NULL DEFAULT 'In-stock',
  `PONumber` varchar(64) DEFAULT NULL,
  `PRequest` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`AssetID`),
  KEY `LocationID` (`LocationID`),
  KEY `GroupID` (`GroupID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `physicalasset`
--


-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE IF NOT EXISTS `request` (
  `RequestID` int(255) NOT NULL AUTO_INCREMENT,
  `UserID` int(255) NOT NULL,
  `Category` varchar(64) NOT NULL,
  `Description` varchar(1024) DEFAULT NULL,
  `Status` varchar(32) NOT NULL DEFAULT 'Pending',
  `BarCode` varchar(64) DEFAULT NULL,
  `LocationName` varchar(128) DEFAULT NULL,
  `GroupID` int(255) DEFAULT NULL,
  `UserName` varchar(64) DEFAULT NULL,
  `CompartmentNo` int(32) DEFAULT NULL,
  `ClosureNote` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`RequestID`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `request`
--


-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `RoleID` int(255) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `role`
--


-- --------------------------------------------------------

--
-- Table structure for table `rolehaspermission`
--

CREATE TABLE IF NOT EXISTS `rolehaspermission` (
  `RoleID` int(255) NOT NULL,
  `PermissionID` int(255) NOT NULL,
  `Authorize` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`RoleID`,`PermissionID`),
  KEY `RoleID` (`RoleID`),
  KEY `PermissionID` (`PermissionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rolehaspermission`
--


-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE IF NOT EXISTS `room` (
  `LocationID` int(255) NOT NULL,
  PRIMARY KEY (`LocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `room`
--


-- --------------------------------------------------------

--
-- Table structure for table `software`
--

CREATE TABLE IF NOT EXISTS `software` (
  `SoftwareID` int(255) NOT NULL AUTO_INCREMENT,
  `Media` varchar(128) DEFAULT NULL,
  `Category` varchar(64) DEFAULT NULL,
  `VendorID` varchar(64) NOT NULL,
  `VersionID` varchar(64) NOT NULL,
  PRIMARY KEY (`SoftwareID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `software`
--


-- --------------------------------------------------------

--
-- Table structure for table `storagecompartment`
--

CREATE TABLE IF NOT EXISTS `storagecompartment` (
  `LocationID` int(255) NOT NULL,
  `UserID` int(255) NOT NULL,
  `CompartmentNo` int(32) NOT NULL,
  PRIMARY KEY (`LocationID`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `storagecompartment`
--


-- --------------------------------------------------------

--
-- Table structure for table `storageunit`
--

CREATE TABLE IF NOT EXISTS `storageunit` (
  `AssetID` int(255) NOT NULL,
  `LocationID` int(255) NOT NULL,
  `Type` varchar(64) DEFAULT NULL,
  `NumberOfCompartment` int(32) NOT NULL DEFAULT '1',
  PRIMARY KEY (`AssetID`),
  KEY `LocationID` (`LocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `storageunit`
--


-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(255) NOT NULL AUTO_INCREMENT,
  `RoleID` int(255) NOT NULL,
  `UserName` varchar(32) NOT NULL,
  `Password` varchar(32) NOT NULL,
  `FirstName` varchar(64) DEFAULT NULL,
  `LastName` varchar(64) DEFAULT NULL,
  `Email` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  KEY `RoleID` (`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `user`
--


-- --------------------------------------------------------

--
-- Table structure for table `userisindepartment`
--

CREATE TABLE IF NOT EXISTS `userisindepartment` (
  `UserID` int(255) NOT NULL,
  `DepartmentID` int(255) NOT NULL,
  PRIMARY KEY (`UserID`,`DepartmentID`),
  KEY `UserID` (`UserID`),
  KEY `DepartmentID` (`DepartmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userisindepartment`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

