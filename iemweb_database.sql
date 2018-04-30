-- phpMyAdmin SQL Dump
-- version 4.0.10.18
-- https://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Apr 28, 2018 at 11:49 AM
-- Server version: 5.6.35
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `iemweb_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_tests`
--

CREATE TABLE IF NOT EXISTS `active_tests` (
  `sub_code` varchar(10) NOT NULL,
  `test_no` int(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `test_key` varchar(100) NOT NULL,
  UNIQUE KEY `test_key` (`test_key`),
  KEY `fk_activetests_subjects` (`sub_code`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `active_tests`
--

INSERT INTO `active_tests` (`sub_code`, `test_no`, `is_active`, `test_key`) VALUES
('BCA693', 1, 1, 'BCA693_1'),
('BCA693', 2, 1, 'BCA693_2'),
('BCA694', 1, 1, 'BCA694_1'),
('BCA694', 2, 1, 'BCA694_2'),
('BCA101', 2, 1, 'BCA101_2'),
('BCA101', 1, 1, 'BCA101_1'),

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE IF NOT EXISTS `auth` (
  `u_id` varchar(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `log_as` varchar(3) NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`u_id`, `email`, `password`, `log_as`) VALUES
('10401215076', 'sachinagarwal132@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'stu'),
('SD', 'sachinagarwal141@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'tch');

-- --------------------------------------------------------

--
-- Table structure for table `otp_store`
--

CREATE TABLE IF NOT EXISTS `otp_store` (
  `u_id` varchar(11) NOT NULL,
  `OTP` varchar(200) NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `OTP` (`OTP`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE IF NOT EXISTS `results` (
  `user_id` varchar(50) NOT NULL,
  `test_key` varchar(50) NOT NULL,
  `score` decimal(50,0) NOT NULL,
  `total` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

CREATE TABLE IF NOT EXISTS `student_details` (
  `u_roll` varchar(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `u_reg` bigint(12) NOT NULL,
  `f_name` varchar(20) NOT NULL,
  `l_name` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  `dept` varchar(5) NOT NULL,
  `add_year` int(4) NOT NULL,
  `contact` bigint(10) NOT NULL,
  PRIMARY KEY (`u_roll`),
  KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_details`
--

INSERT INTO `student_details` (`u_roll`, `email`, `u_reg`, `f_name`, `l_name`, `dob`, `dept`, `add_year`, `contact`) VALUES
('10401215076', 'sachinagarwal132@gmail.com', 151041010076, 'SACHIN', 'AGARWAL', '1996-09-14', 'BCA', 2015, 8981235526);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE IF NOT EXISTS `subjects` (
  `sem_code` int(1) NOT NULL,
  `sub_code` varchar(10) NOT NULL,
  `sub_name` varchar(100) NOT NULL,
  PRIMARY KEY (`sub_code`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`sem_code`, `sub_code`, `sub_name`) VALUES
(1, 'BCA101', 'Digital Electronics'),
(1, 'BCA102', 'Business Systems and Applications'),
(1, 'BCA103', 'Introduction to Programming'),
(1, 'BM101', 'Mathematics'),
(1, 'BCA104', 'PC Software'),
(1, 'BCA194', 'PC Software Lab'),
(1, 'BCA193', 'Programming Lab (C/ Pascal)'),
(2, 'BCA201', 'Computer Architecture and Systems Software'),
(2, 'BCA202', 'Information Systems Analysis & Design'),
(2, 'BCA203', 'Computer Programming'),
(2, 'BM201', 'Mathematics'),
(2, 'HU201', 'English Language and Communication'),
(2, 'BCA293', 'Programming Lab (Visual Basic)'),
(2, 'HU 291', 'Business Presentation and Language Lab'),
(3, 'BCA301', 'Operating Systems'),
(3, 'BCA302', 'Data Structures with C'),
(3, 'BCA303', 'Graphics & Internet'),
(3, 'BM301', 'Mathematics for Computing'),
(3, 'BBA301', 'Management & Accounting'),
(3, 'BCA393', 'Internet & Computer Graphics Lab'),
(3, 'BCA392', 'Programming Lab  (Data Structure with C)'),
(4, 'BCA401', 'Data Base Management System'),
(4, 'BCA402', 'Object-Oriented Programming with C++'),
(4, 'BCA403', 'Software Project Management and Quality Assurance'),
(4, 'BM401', ' Statistics, Numerical Methods & Algorithms'),
(4, 'HU401', 'Environment and Ecology'),
(4, 'BCA491', 'Database Lab (Oracle)'),
(4, 'BM491', 'Computing Lab'),
(5, 'BCA501', 'Data Communication & Computer Networks'),
(5, 'BCA502', 'Unix and Shell Programming'),
(5, 'BCA503', 'Windows Programming'),
(5, 'BCA E501/A', 'Elective 1'),
(5, 'HU501', 'Values and Ethics of Profession'),
(5, 'BCA591', 'Unix & Networking'),
(5, 'BCA592', 'Minor Project'),
(6, 'E601/A/B/C', 'Elective 2'),
(6, 'E602/A/B/C', 'Elective 3'),
(6, 'BCA693', 'Major project'),
(6, 'BCA694', 'Seminar'),
(6, 'BCA 695', 'Comprehensive Viva-Voce');

-- --------------------------------------------------------

--
-- Table structure for table `super_auth`
--

CREATE TABLE IF NOT EXISTS `super_auth` (
  `u_id` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `log_as` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teacher_details`
--

CREATE TABLE IF NOT EXISTS `teacher_details` (
  `tch_id` varchar(10) NOT NULL,
  `f_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `contact` bigint(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `facebook_id` varchar(100) NOT NULL,
  `googleplus_id` varchar(100) NOT NULL,
  `designation` varchar(10) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`tch_id`),
  KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teacher_details`
--

INSERT INTO `teacher_details` (`tch_id`, `f_name`, `l_name`, `contact`, `email`, `facebook_id`, `googleplus_id`, `designation`, `is_admin`) VALUES
('SD', 'Soumi', 'Dutta', 9230266400, 'soumi.it@gmail.com', '', '', 'Asst. Prof', 1),
('ABH', 'Abhishek', 'Bhattacharya', 1234567890, 'abhishek.bhattacharya@iemcal.com', '', '', 'HOD', 1),
('AS', 'Abhijit', 'Sarkar', 9874563210, 'abhijit.sarkar@iemcal.com', '', '', 'Asst. Prof', 0);

-- --------------------------------------------------------

--
-- Table structure for table `test_questions`
--

CREATE TABLE IF NOT EXISTS `test_questions` (
  `test_key` varchar(100) NOT NULL,
  `Q_no` varchar(10) NOT NULL,
  `Question` text NOT NULL,
  `Option1` text NOT NULL,
  `Option2` text NOT NULL,
  `Option3` text NOT NULL,
  `Option4` text NOT NULL,
  `Solution` text NOT NULL,
  `Remarks` text NOT NULL,
  KEY `fk_testkey` (`test_key`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test_questions`
--

INSERT INTO `test_questions` (`test_key`, `Q_no`, `Question`, `Option1`, `Option2`, `Option3`, `Option4`, `Solution`, `Remarks`) VALUES
('BCA101_1', '1', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because.'),
('BCA101_1', '2', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because.'),
('BCA101_1', '3', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because.'),
('BCA101_1', '4', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because.'),
('BCA101_1', '5', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because.'),
('BCA101_1', '6', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA101_1', '7', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA101_1', '8', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA101_1', '9', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA101_1', '10', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_1', '1', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_1', '2', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_1', '3', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_1', '4', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_1', '5', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_1', '6', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_1', '7', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_1', '8', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_1', '9', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_1', '10', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_2', '1', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_2', '2', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_2', '3', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_2', '4', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_2', '5', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_2', '6', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_2', '7', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_2', '8', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA693_2', '9', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA693_2', '10', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA101_2', '1', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA101_2', '2', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA101_2', '3', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA101_2', '4', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA101_2', '5', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA101_2', '6', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA101_2', '7', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA101_2', '8', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA101_2', '9', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA101_2', '10', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_1', '1', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_1', '2', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_1', '3', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_1', '4', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_1', '5', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_1', '6', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_1', '7', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_1', '8', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_1', '9', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_1', '10', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_2', '1', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_2', '2', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_2', '3', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_2', '4', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_2', '5', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_2', '6', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_2', '7', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_2', '8', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA694_2', '9', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '2', 'Op2 is right because..'),
('BCA694_2', '10', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
