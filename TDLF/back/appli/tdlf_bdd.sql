-- MySQL dump 10.13  Distrib 5.1.73, for redhat-linux-gnu (x86_64)
--
-- Host: localhost    Database: tdlf_bdd
-- ------------------------------------------------------
-- Server version	5.1.73

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TDLF_League`
--

DROP TABLE IF EXISTS `TDLF_League`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TDLF_League` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `TDLFMatchId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TDLFMatchId` (`TDLFMatchId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TDLF_League`
--

LOCK TABLES `TDLF_League` WRITE;
/*!40000 ALTER TABLE `TDLF_League` DISABLE KEYS */;
/*!40000 ALTER TABLE `TDLF_League` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TDLF_Match`
--

DROP TABLE IF EXISTS `TDLF_Match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TDLF_Match` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TDLF_Match`
--

LOCK TABLES `TDLF_Match` WRITE;
/*!40000 ALTER TABLE `TDLF_Match` DISABLE KEYS */;
/*!40000 ALTER TABLE `TDLF_Match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TDLF_Player`
--

DROP TABLE IF EXISTS `TDLF_Player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TDLF_Player` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TDLF_Player`
--

LOCK TABLES `TDLF_Player` WRITE;
/*!40000 ALTER TABLE `TDLF_Player` DISABLE KEYS */;
/*!40000 ALTER TABLE `TDLF_Player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TDLF_Startup`
--

DROP TABLE IF EXISTS `TDLF_Startup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TDLF_Startup` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `TDLFTeamId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TDLFTeamId` (`TDLFTeamId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TDLF_Startup`
--

LOCK TABLES `TDLF_Startup` WRITE;
/*!40000 ALTER TABLE `TDLF_Startup` DISABLE KEYS */;
/*!40000 ALTER TABLE `TDLF_Startup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TDLF_Team`
--

DROP TABLE IF EXISTS `TDLF_Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TDLF_Team` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `TDLFPlayerId` int(10) unsigned NOT NULL,
  `TDLFLeagueId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TDLFPlayerId` (`TDLFPlayerId`),
  KEY `TDLFLeagueId` (`TDLFLeagueId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TDLF_Team`
--

LOCK TABLES `TDLF_Team` WRITE;
/*!40000 ALTER TABLE `TDLF_Team` DISABLE KEYS */;
/*!40000 ALTER TABLE `TDLF_Team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-10 13:53:47
