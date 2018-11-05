-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Nov 05, 2018 at 02:46 AM
-- Server version: 5.7.21
-- PHP Version: 7.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nueax`
--

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE `signup` (
  `EmailId` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`EmailId`, `Password`) VALUES
('p1@email.com', 'password'),
('p2@email.com', 'password'),
('p3@email.com', 'password'),
('p4@email.com', 'password'),
('p5@email.com', 'password'),
('p6@email.com', 'password');

-- --------------------------------------------------------

--
-- Table structure for table `userdata`
--

CREATE TABLE `userdata` (
  `FirstName` varchar(20) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `Contact` varchar(10) NOT NULL,
  `EmailId` varchar(30) NOT NULL,
  `DOB` date NOT NULL,
  `TimeStamp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`FirstName`, `LastName`, `Contact`, `EmailId`, `DOB`, `TimeStamp`) VALUES
('p1', 'l1', '1231231231', 'p1@email.com', '2018-11-20', '1541405818328'),
('p21', 'l2', '1231231231', 'p2@email.com', '2018-11-14', '1541408121346'),
('P3', 'L3', '1231231123', 'p3@email.com', '2018-11-13', '1541408268850'),
('p4', 'l4', '2342341212', 'p4@email.com', '2018-11-10', '1541413041905'),
('p5', 'l5', '1231231231', 'p5@email.com', '2018-11-22', '1541413200650');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `signup`
--
ALTER TABLE `signup`
  ADD PRIMARY KEY (`EmailId`);

--
-- Indexes for table `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`EmailId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
