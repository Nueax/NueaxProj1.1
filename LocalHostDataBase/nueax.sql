-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Oct 07, 2018 at 12:21 AM
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
  `FirstName` varchar(20) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `EmailId` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`FirstName`, `LastName`, `EmailId`, `Password`) VALUES
('vikas', 'rana', 'vikas2510@gmail.com', 'password'),
('Person1', 'Last2', 'p2@gmail.com', 'password'),
('ABC', 'DEF', 'ABC@gmail.com', 'password'),
('PQR', 'STU', 'PQR@gmail.com', 'password'),
('', '', '', ''),
('Hello', 'Person', 'HP@gmail.com', 'Password');

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
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`FirstName`, `LastName`, `Contact`, `EmailId`, `DOB`, `Timestamp`) VALUES
('Fire', 'Base', '1231231231', 'FB@gmail.com', '2018-09-03', '2018-09-08 06:30:26'),
('Hello1', 'Person', '1231231', 'HP@gmail.com', '2018-09-11', '2018-09-12 08:07:00'),
('Vikas', 'Rana', '9736049872', 'vikas2510@gmail.com', '1995-10-25', '2018-10-07 06:44:05'),
('vikas', 'rana', '8699645902', 'vikaskumar24@gmail.com', '1995-12-12', '2018-10-07 05:52:50'),
('Sheldon', 'Cooper', '1234567891', 'vikasrana2510@gmail.com', '2018-09-02', '2018-09-02 10:58:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`EmailId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
