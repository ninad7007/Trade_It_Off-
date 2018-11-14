-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: sample
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orders` (
  `user_id` char(50) NOT NULL,
  `seller_id` char(50) DEFAULT NULL,
  `product_id` mediumint(9) NOT NULL,
  `product_name` char(50) DEFAULT NULL,
  `product_cost` int(11) DEFAULT NULL,
  `category` char(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('efg@gmail.com','def@gmail.com',11,'Wooden study table',7000,'furniture'),('efg@gmail.com','ghi@gmail.com',15,'Iphone 4G 7 plus 256gb storage',27000,'mobiles'),('efg@gmail.com','ghi@gmail.com',26,'Marantz NR 1509 Latest 5.2 AV receiver with Alexa',50000,'electronics'),('jkl@gmail.com','def@gmail.com',7,'RealMe 2',7000,'mobiles'),('jkl@gmail.com','ghi@gmail.com',13,'Samsung Galaxy j7 Max',7000,'mobiles'),('jkl@gmail.com','ghi@gmail.com',20,'Maroon color sofa set',27000,'furniture'),('jkl@gmail.com','ghi@gmail.com',23,'RE classic',217000,'bikes'),('mno@gmail.com','ghi@gmail.com',16,'iphone X new',70000,'mobiles'),('mno@gmail.com','ghi@gmail.com',18,'Patient bed',1000,'furniture'),('parth@gmail.com','ghi@gmail.com',19,'Brown Wooden 2-door Cabinet',7000,'furniture');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-14 12:23:45
