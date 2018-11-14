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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `product_id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `product_name` char(50) DEFAULT NULL,
  `user_id` char(50) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `category` char(50) DEFAULT NULL,
  `img_url` char(200) DEFAULT NULL,
  `description` mediumtext,
  PRIMARY KEY (`product_id`),
  KEY `user_id_fk` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (14,'Xiommi redmi 5','ghi@gmail.com',7000,'mobiles','https://apollo-singapore.akamaized.net/v1/files/0wm6grc8rdx43-IN/image;s=144x108;in_;slot=1;filename=0wm6grc8rdx43-IN_.jpg','Very good condition'),(17,'iphone 6','ghi@gmail.com',27000,'mobiles','https://apollo-singapore.akamaized.net/v1/files/8fecfzkgnzgf-IN/image;s=144x108;in_;slot=1;filename=8fecfzkgnzgf-IN_.jpg','Unused phone. Very good condition.'),(21,'Brown tone twin sec sofa','ghi@gmail.com',77000,'furniture','https://apollo-singapore.akamaized.net/v1/files/voatd14p1akv1-IN/image;s=261x203;in_;slot=1;filename=voatd14p1akv1-IN_.jpg','Very good condition'),(22,'Black leather sofa','ghi@gmail.com',27000,'furniture','https://apollo-singapore.akamaized.net/v1/files/05rgpdy8fgn9-IN/image;s=261x203;in_;slot=1;filename=05rgpdy8fgn9-IN_.jpg','Beautiful sofa. Very less used.'),(24,'Scooter','ghi@gmail.com',27000,'bikes','https://apollo-singapore.akamaized.net/v1/files/vh08vhgb9c122-IN/image;s=144x108;in_;slot=1;filename=vh08vhgb9c122-IN_.jpg','Very less used'),(25,'TVS APACHE','ghi@gmail.com',60000,'bikes','https://apollo-singapore.akamaized.net/v1/files/z2i6f9ekfa6m3-IN/image;s=144x108;in_;slot=1;filename=z2i6f9ekfa6m3-IN_.jpg','Bike is in a good condition '),(27,'PS3 with 20+ games','jkl@gmail.com',7000,NULL,'https://apollo-singapore.akamaized.net/v1/files/37qiqxol32gk2-IN/image;s=144x108;in_;slot=1;filename=37qiqxol32gk2-IN_.jpg','Very good condition play station.'),(28,'Acer core i3 4gb15.6screen','jkl@gmail.com',42000,NULL,'https://apollo-singapore.akamaized.net/v1/files/xm2b365r36w42-IN/image;s=144x108;in_;slot=1;filename=xm2b365r36w42-IN_.jpg','Very good condition laptop'),(29,'Samsung Bluray DVD in mint condition','jkl@gmail.com',1000,NULL,'https://apollo-singapore.akamaized.net/v1/files/f72h4jj5a35c1-IN/image;s=144x108;in_;slot=1;filename=f72h4jj5a35c1-IN_.jpg','Unused dvd. Very good condition. '),(30,'PUBG mobile controller high quality ( wired)','jkl@gmail.com',1000,NULL,'https://apollo-singapore.akamaized.net/v1/files/2ts1mnowqvbj2-IN/image;s=144x108;in_;slot=1;filename=2ts1mnowqvbj2-IN_.jpg','Very good condition. Not much used.'),(31,'MacBook Pro','jkl@gmail.com',30000,NULL,'https://apollo-singapore.akamaized.net/v1/files/x4ekrjx09dfo2-IN/image;s=144x108;in_;slot=1;filename=x4ekrjx09dfo2-IN_.jpg','Very fast laptop. Smooth processing.'),(32,'Audi A6','jkl@gmail.com',1800000,NULL,'https://apollo-singapore.akamaized.net/v1/files/tnf5v2wsj7uv1-IN/image;s=144x108;in_;slot=2;filename=tnf5v2wsj7uv1-IN_.jpg','Excellent condition car 8 year old'),(33,'Chevrolet Beat petrol 60000 Kms 2016 year','jkl@gmail.com',350000,NULL,'https://apollo-singapore.akamaized.net/v1/files/md7apkcwjdlp1-IN/image;s=144x108;in_;slot=1;filename=md7apkcwjdlp1-IN_.jpg','Very good condition car. Cheverolet new car.'),(34,'Maruti Suzuki Wagon R 1.0 Lxi Cng 2014 Cng','mno@gmail.com',230000,NULL,'https://apollo-singapore.akamaized.net/v1/files/vrr5mbnzcso42-IN/image;s=144x108;in_;slot=1;filename=vrr5mbnzcso42-IN_.jpg','Wagon-R great family car. Very good condition.'),(35,'Fiat Punto Dynamic 1.3 2009 Diesel','mno@gmail.com',215000,NULL,'https://apollo-singapore.akamaized.net/v1/files/7murw1dk7cko3-IN/image;s=144x108;in_;slot=1;filename=7murw1dk7cko3-IN_.jpg','very nice car.  Smooth handling.'),(36,'RE classic','mno@gmail.com',75000,NULL,'https://apollo-singapore.akamaized.net/v1/files/hj41j05281x23-IN/image;s=144x108;in_;slot=1;filename=hj41j05281x23-IN_.jpg','Unused phone. Very good condition.'),(37,'Maroon color sofa set','mno@gmail.com',27000,'furniture','https://apollo-singapore.akamaized.net/v1/files/mgis4xp7topp-IN/image;s=261x203;in_;slot=1;filename=mgis4xp7topp-IN_.jpg','Very good condition');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
