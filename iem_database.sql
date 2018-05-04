-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freemysqlhosting.net
-- Generation Time: May 03, 2018 at 11:01 AM
-- Server version: 5.5.58-0ubuntu0.14.04.1
-- PHP Version: 7.0.28-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12235600`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_tests`
--

CREATE TABLE `active_tests` (
  `sub_code` varchar(10) NOT NULL,
  `test_no` int(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `test_key` varchar(100) NOT NULL
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
('BCA101', 3, 1, 'BCA101_3');

-- --------------------------------------------------------

--
-- Table structure for table `admin_auth`
--

CREATE TABLE `admin_auth` (
  `u_id` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `log_as` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin_details`
--

CREATE TABLE `admin_details` (
  `user_id` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact` bigint(10) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin_log`
--

CREATE TABLE `admin_log` (
  `user_id` varchar(10) NOT NULL,
  `log_msg` varchar(500) NOT NULL,
  `log_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `u_id` varchar(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `log_as` varchar(3) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`u_id`, `email`, `password`, `log_as`) VALUES
('10401215076', 'sachinagarwal132@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'stu'),
('SD', 'soumi.it@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'tch'),
('10401215073', 'sachinagarwal141@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'stu'),
('ABH', 'abh@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'tch'),
('10401215071', '10401215071@gmail.com', '', 'stu'),
('10401215113', 'sumankanrar25@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'stu'),
('10401215070', '10401215070@gmail.com', '', 'stu'),
('10401215114', 'surbhi.kapsime214@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'stu'),
('AB', 'ankan.bhowmick@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'tch'),
('SKD', 'sumanta.deb@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'tch'),
('KR', 'krishnendu.rarhi@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'tch'),
('10301215076', 'subit.bose@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'stu'),
('10301215113', 'rahul.banerjee@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'stu'),
('SNS', 'soumindra.sanyal@gmail.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'tch'),
('admin', 'admin@admin.com', '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG', 'adm');

-- --------------------------------------------------------

--
-- Table structure for table `otp_store`
--

CREATE TABLE `otp_store` (
  `u_id` varchar(11) NOT NULL,
  `OTP` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `otp_store`
--

INSERT INTO `otp_store` (`u_id`, `OTP`) VALUES
('10401215114', '$2a$08$5kfcTQ5KWfZVv.NUTAjtTOuVkhsFeyUcNrfl8U4OHqBbqMC5lwLfy');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `user_id` varchar(50) NOT NULL,
  `test_key` varchar(50) NOT NULL,
  `score` decimal(50,0) NOT NULL,
  `total` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

CREATE TABLE `student_details` (
  `u_roll` varchar(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `u_reg` bigint(12) NOT NULL,
  `f_name` varchar(20) NOT NULL,
  `l_name` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  `dept` varchar(5) NOT NULL,
  `add_year` int(4) NOT NULL,
  `contact` bigint(10) NOT NULL
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

CREATE TABLE `subjects` (
  `sem_code` int(1) NOT NULL,
  `sub_code` varchar(10) NOT NULL,
  `sub_name` varchar(100) NOT NULL,
  `dept` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`sem_code`, `sub_code`, `sub_name`, `dept`) VALUES
(1, 'BCA101', 'Digital Electronics', 'BCA'),
(1, 'BCA102', 'Business Systems and Applications', 'BCA'),
(1, 'BCA103', 'Introduction to Programming', 'BCA'),
(1, 'BM101', 'Mathematics', 'BCA'),
(1, 'BCA104', 'PC Software', 'BCA'),
(1, 'BCA194', 'PC Software Lab', 'BCA'),
(1, 'BCA193', 'Programming Lab (C/ Pascal)', 'BCA'),
(2, 'BCA201', 'Computer Architecture and Systems Software', 'BCA'),
(2, 'BCA202', 'Information Systems Analysis & Design', 'BCA'),
(2, 'BCA203', 'Computer Programming', 'BCA'),
(2, 'BM201', 'Mathematics', 'BCA'),
(2, 'HU201', 'English Language and Communication', 'BCA'),
(2, 'BCA293', 'Programming Lab (Visual Basic)', 'BCA'),
(2, 'HU 291', 'Business Presentation and Language Lab', 'BCA'),
(3, 'BCA301', 'Operating Systems', 'BCA'),
(3, 'BCA302', 'Data Structures with C', 'BCA'),
(3, 'BCA303', 'Graphics & Internet', 'BCA'),
(3, 'BM301', 'Mathematics for Computing', 'BCA'),
(3, 'BBA301', 'Management & Accounting', 'BCA'),
(3, 'BCA393', 'Internet & Computer Graphics Lab', 'BCA'),
(3, 'BCA392', 'Programming Lab  (Data Structure with C)', 'BCA'),
(4, 'BCA401', 'Data Base Management System', 'BCA'),
(4, 'BCA402', 'Object-Oriented Programming with C++', 'BCA'),
(4, 'BCA403', 'Software Project Management and Quality Assurance', 'BCA'),
(4, 'BM401', ' Statistics, Numerical Methods & Algorithms', 'BCA'),
(4, 'HU401', 'Environment and Ecology', 'BCA'),
(4, 'BCA491', 'Database Lab (Oracle)', 'BCA'),
(4, 'BM491', 'Computing Lab', 'BCA'),
(5, 'BCA501', 'Data Communication & Computer Networks', 'BCA'),
(5, 'BCA502', 'Unix and Shell Programming', 'BCA'),
(5, 'BCA503', 'Windows Programming', 'BCA'),
(5, 'BCA E501/A', 'Elective 1', 'BCA'),
(5, 'HU501', 'Values and Ethics of Profession', 'BCA'),
(5, 'BCA591', 'Unix & Networking', 'BCA'),
(5, 'BCA592', 'Minor Project', 'BCA'),
(6, 'E601/A/B/C', 'Elective 2', 'BCA'),
(6, 'E602/A/B/C', 'Elective 3', 'BCA'),
(6, 'BCA693', 'Major project', 'BCA'),
(6, 'BCA694', 'Seminar', 'BCA'),
(6, 'BCA 695', 'Comprehensive Viva-Voce', 'BCA'),
(1, 'BBA - 101', 'English –I', 'BBA'),
(1, 'BBA - 102', 'Mathematics – I', 'BBA'),
(1, 'BBA - 103', 'Statistics – I', 'BBA'),
(1, 'BBA - 104', 'Economics - I', 'BBA'),
(1, 'BBA - 105', 'Indian Society & Culture', 'BBA'),
(1, 'BBA - 106', 'Computer Applications– I', 'BBA'),
(2, 'BBA - 201', 'English –II', 'BBA'),
(2, 'BBA - 202', 'Mathematics – II', 'BBA'),
(2, 'BBA - 203', 'Statistics – II', 'BBA'),
(2, 'BBA - 204', 'Economics - II', 'BBA'),
(2, 'BBA - 205', 'Psychology', 'BBA'),
(2, 'BBA - 206', 'Computer Applications – II', 'BBA'),
(3, 'BBA - 301', 'Principles of Management', 'BBA'),
(3, 'BBA - 302', 'Business Environment', 'BBA'),
(3, 'BBA - 303', 'Business Regulatory Framework', 'BBA'),
(3, 'BBA - 304', 'Business Economics', 'BBA'),
(3, 'BBA - 305', 'Business Communication', 'BBA'),
(3, 'BBA - 306', 'Financial Accounting', 'BBA'),
(4, 'BBA - 401', 'Production Management', 'BBA'),
(4, 'BBA - 402', 'Materials Management', 'BBA'),
(4, 'BBA - 403', 'Financial Management-I', 'BBA'),
(4, 'BBA - 404', 'Marketing Management-I', 'BBA'),
(4, 'BBA - 405', 'Human Resource Management-I', 'BBA'),
(4, 'BBA - 406', 'Management Information Systems', 'BBA'),
(5, 'BBA - 501', 'Financial Management-II', 'BBA'),
(5, 'BBA - 502', 'Marketing Management-II', 'BBA'),
(5, 'BBA - 503', 'Human Resource Management-II', 'BBA'),
(5, 'BBA - 504', 'Fundamentals of Entrepreneurship', 'BBA'),
(5, 'BBA - 505', 'Environment Management', 'BBA'),
(5, 'BBA - 506', 'Transport Management', 'BBA'),
(6, 'BBA - 601', 'Financial Management-III', 'BBA'),
(6, 'BBA - 602', 'Marketing Management-III', 'BBA'),
(6, 'BBA - 603', 'Human Resource Management-III', 'BBA'),
(6, 'BBA - 604', 'Health Care Management', 'BBA'),
(6, 'BBA - 605', 'Social Research Methods', 'BBA');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_details`
--

CREATE TABLE `teacher_details` (
  `tch_id` varchar(10) NOT NULL,
  `f_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `contact` bigint(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `facebook_id` varchar(100) NOT NULL,
  `googleplus_id` varchar(100) NOT NULL,
  `designation` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teacher_details`
--

INSERT INTO `teacher_details` (`tch_id`, `f_name`, `l_name`, `contact`, `email`, `dob`, `facebook_id`, `googleplus_id`, `designation`) VALUES
('SD', 'Soumi', 'Dutta', 9230266400, 'soumi.it@gmail.com', '0000-00-00', '', '', 'Asst. Prof'),
('ABH', 'ABHISHEK', 'Bhattacharya', 9903149600, 'abh@gmail.com', '2018-12-31', '', '', 'HOD'),
('AS', 'Abhijit', 'Sarkar', 9874563210, 'abhijit.sarkar@iemcal.com', '0000-00-00', '', '', 'Asst. Prof');

-- --------------------------------------------------------

--
-- Table structure for table `test_questions`
--

CREATE TABLE `test_questions` (
  `test_key` varchar(100) NOT NULL,
  `Q_no` varchar(10) NOT NULL,
  `Question` text NOT NULL,
  `Option1` text NOT NULL,
  `Option2` text NOT NULL,
  `Option3` text NOT NULL,
  `Option4` text NOT NULL,
  `Solution` text NOT NULL,
  `Remarks` text NOT NULL
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
('BCA101_2', '7', 'Question 7', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_2', '6', 'Question 6', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_2', '5', 'Question 5', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_2', '4', 'Question 4', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_2', '3', 'Question 3', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_2', '2', 'Question 2', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_2', '1', 'Question 1', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
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
('BCA694_2', '10', 'Question1 ', 'Op1', 'Op2', 'Op3', 'Op4', '3', 'Op3 is right because..'),
('BCA101_2', '8', 'Question 8', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_2', '9', 'Question 9', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_2', '10', 'Question 10', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '1', 'Question 1', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '2', 'Question 2', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '3', 'Question 3', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '4', 'Question 4', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '5', 'Question 5', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '6', 'Question 6', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '7', 'Question 7', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '8', 'Question 8', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '9', 'Question 9', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..'),
('BCA101_3', '10', 'Question 10', 'Option1', 'Option2', 'Option3', 'Option4', '3', 'Op3 is right because..');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_tests`
--
ALTER TABLE `active_tests`
  ADD UNIQUE KEY `test_key` (`test_key`),
  ADD KEY `fk_activetests_subjects` (`sub_code`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `otp_store`
--
ALTER TABLE `otp_store`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `OTP` (`OTP`);

--
-- Indexes for table `student_details`
--
ALTER TABLE `student_details`
  ADD PRIMARY KEY (`u_roll`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`sub_code`);

--
-- Indexes for table `teacher_details`
--
ALTER TABLE `teacher_details`
  ADD PRIMARY KEY (`tch_id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `test_questions`
--
ALTER TABLE `test_questions`
  ADD KEY `fk_testkey` (`test_key`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
