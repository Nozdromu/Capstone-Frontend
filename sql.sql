-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresstable`
--

DROP TABLE IF EXISTS `addresstable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresstable` (
  `aid` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) DEFAULT NULL,
  `apt` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `states` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `lng` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`aid`),
  UNIQUE KEY `aid_UNIQUE` (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresstable`
--

LOCK TABLES `addresstable` WRITE;
/*!40000 ALTER TABLE `addresstable` DISABLE KEYS */;
INSERT INTO `addresstable` VALUES (1,'3000 Landerholm Cir SE','','Bellevue','WA','98006',9,1,'47.5839952','-122.1476725'),(2,'6835 SE COUGAR MOUTIAN WAY',NULL,'Bellevue','WA','98006',9,NULL,'47.5413731','-122.1270583'),(3,'13630 SE Allen Rd',NULL,'Bellevue','WA','98006',9,NULL,'47.5736942','-122.160635');
/*!40000 ALTER TABLE `addresstable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add addresstable',7,'add_addresstable'),(26,'Can change addresstable',7,'change_addresstable'),(27,'Can delete addresstable',7,'delete_addresstable'),(28,'Can view addresstable',7,'view_addresstable'),(29,'Can add auth group',8,'add_authgroup'),(30,'Can change auth group',8,'change_authgroup'),(31,'Can delete auth group',8,'delete_authgroup'),(32,'Can view auth group',8,'view_authgroup'),(33,'Can add auth group permissions',9,'add_authgrouppermissions'),(34,'Can change auth group permissions',9,'change_authgrouppermissions'),(35,'Can delete auth group permissions',9,'delete_authgrouppermissions'),(36,'Can view auth group permissions',9,'view_authgrouppermissions'),(37,'Can add auth permission',10,'add_authpermission'),(38,'Can change auth permission',10,'change_authpermission'),(39,'Can delete auth permission',10,'delete_authpermission'),(40,'Can view auth permission',10,'view_authpermission'),(41,'Can add auth user',11,'add_authuser'),(42,'Can change auth user',11,'change_authuser'),(43,'Can delete auth user',11,'delete_authuser'),(44,'Can view auth user',11,'view_authuser'),(45,'Can add auth user groups',12,'add_authusergroups'),(46,'Can change auth user groups',12,'change_authusergroups'),(47,'Can delete auth user groups',12,'delete_authusergroups'),(48,'Can view auth user groups',12,'view_authusergroups'),(49,'Can add auth user user permissions',13,'add_authuseruserpermissions'),(50,'Can change auth user user permissions',13,'change_authuseruserpermissions'),(51,'Can delete auth user user permissions',13,'delete_authuseruserpermissions'),(52,'Can view auth user user permissions',13,'view_authuseruserpermissions'),(53,'Can add django admin log',14,'add_djangoadminlog'),(54,'Can change django admin log',14,'change_djangoadminlog'),(55,'Can delete django admin log',14,'delete_djangoadminlog'),(56,'Can view django admin log',14,'view_djangoadminlog'),(57,'Can add django content type',15,'add_djangocontenttype'),(58,'Can change django content type',15,'change_djangocontenttype'),(59,'Can delete django content type',15,'delete_djangocontenttype'),(60,'Can view django content type',15,'view_djangocontenttype'),(61,'Can add django migrations',16,'add_djangomigrations'),(62,'Can change django migrations',16,'change_djangomigrations'),(63,'Can delete django migrations',16,'delete_djangomigrations'),(64,'Can view django migrations',16,'view_djangomigrations'),(65,'Can add django session',17,'add_djangosession'),(66,'Can change django session',17,'change_djangosession'),(67,'Can delete django session',17,'delete_djangosession'),(68,'Can view django session',17,'view_djangosession'),(69,'Can add garagesaletable',18,'add_garagesaletable'),(70,'Can change garagesaletable',18,'change_garagesaletable'),(71,'Can delete garagesaletable',18,'delete_garagesaletable'),(72,'Can view garagesaletable',18,'view_garagesaletable'),(73,'Can add imagetable',19,'add_imagetable'),(74,'Can change imagetable',19,'change_imagetable'),(75,'Can delete imagetable',19,'delete_imagetable'),(76,'Can view imagetable',19,'view_imagetable'),(77,'Can add itemlisttable',20,'add_itemlisttable'),(78,'Can change itemlisttable',20,'change_itemlisttable'),(79,'Can delete itemlisttable',20,'delete_itemlisttable'),(80,'Can view itemlisttable',20,'view_itemlisttable'),(81,'Can add itemtable',21,'add_itemtable'),(82,'Can change itemtable',21,'change_itemtable'),(83,'Can delete itemtable',21,'delete_itemtable'),(84,'Can view itemtable',21,'view_itemtable'),(85,'Can add ordertable',22,'add_ordertable'),(86,'Can change ordertable',22,'change_ordertable'),(87,'Can delete ordertable',22,'delete_ordertable'),(88,'Can view ordertable',22,'view_ordertable'),(89,'Can add testtable',23,'add_testtable'),(90,'Can change testtable',23,'change_testtable'),(91,'Can delete testtable',23,'delete_testtable'),(92,'Can view testtable',23,'view_testtable'),(93,'Can add usertable',24,'add_usertable'),(94,'Can change usertable',24,'change_usertable'),(95,'Can delete usertable',24,'delete_usertable'),(96,'Can view usertable',24,'view_usertable');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$390000$qSR8eHjhyy3Wu3F82tujPE$ksIa7+F3yFeUJ76Ma7tvg+kKAnvH6MnSa2FzWyjWwZ8=','2022-11-17 09:04:00.119988',1,'root','','','yileiding1990@gmail.com',1,1,'2022-11-15 04:44:26.082782');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chathistory`
--

DROP TABLE IF EXISTS `chathistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chathistory` (
  `chid` int NOT NULL AUTO_INCREMENT,
  `sender` int DEFAULT NULL,
  `reciver` int DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sendtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isread` int DEFAULT NULL,
  PRIMARY KEY (`chid`),
  UNIQUE KEY `chid_UNIQUE` (`chid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chathistory`
--

LOCK TABLES `chathistory` WRITE;
/*!40000 ALTER TABLE `chathistory` DISABLE KEYS */;
INSERT INTO `chathistory` VALUES (1,9,1,'earer','2023-02-12 10:25:13',NULL),(2,9,1,'112','2023-02-12 10:35:21',NULL),(3,9,1,'1','2023-02-12 10:36:35',NULL),(4,9,1,'12','2023-02-12 10:36:50',NULL),(5,9,1,'12','2023-02-12 10:37:21',NULL),(6,1,9,'jjkk','2023-02-12 10:37:27',NULL),(7,2,3,'ersg','2023-02-14 23:58:57',NULL),(8,3,2,'efwgfr','2023-02-14 23:58:57',NULL),(9,3,2,'rfaera','2023-02-14 23:58:57',NULL),(10,3,1,'aerftf','2023-02-14 23:58:57',NULL),(11,9,5,'erffs','2023-02-14 23:58:57',NULL),(12,5,1,'swgrs','2023-02-14 23:58:57',NULL),(13,2,3,'sfs','2023-02-14 23:58:57',NULL),(14,4,1,'fsaf','2023-02-14 23:58:57',NULL),(15,1,4,'afaef','2023-02-14 23:58:57',NULL),(16,6,1,'afafea','2023-02-14 23:58:57',NULL),(17,5,1,'frrfee','2023-02-14 23:58:57',NULL),(18,9,2,'sfvsg','2023-02-14 23:58:57',NULL),(19,9,7,'eg342','2023-02-14 23:58:57',NULL),(20,9,3,'sgsr','2023-02-14 23:58:57',NULL),(21,9,8,'efsf','2023-02-14 23:58:57',NULL),(22,5,9,'sgfsgr','2023-02-14 23:58:57',NULL),(23,3,9,'213213','2023-02-14 23:58:57',NULL),(24,2,9,'21321ewf','2023-02-14 23:58:57',NULL),(25,1,9,'rg3erg234','2023-02-14 23:58:57',NULL);
/*!40000 ALTER TABLE `chathistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'database','addresstable'),(8,'database','authgroup'),(9,'database','authgrouppermissions'),(10,'database','authpermission'),(11,'database','authuser'),(12,'database','authusergroups'),(13,'database','authuseruserpermissions'),(14,'database','djangoadminlog'),(15,'database','djangocontenttype'),(16,'database','djangomigrations'),(17,'database','djangosession'),(18,'database','garagesaletable'),(19,'database','imagetable'),(20,'database','itemlisttable'),(21,'database','itemtable'),(22,'database','ordertable'),(23,'database','testtable'),(24,'database','usertable'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-11-15 04:31:33.343594'),(2,'auth','0001_initial','2022-11-15 04:31:33.540618'),(3,'admin','0001_initial','2022-11-15 04:31:33.592625'),(4,'admin','0002_logentry_remove_auto_add','2022-11-15 04:31:33.596625'),(5,'admin','0003_logentry_add_action_flag_choices','2022-11-15 04:31:33.600626'),(6,'contenttypes','0002_remove_content_type_name','2022-11-15 04:31:33.634125'),(7,'auth','0002_alter_permission_name_max_length','2022-11-15 04:31:33.656625'),(8,'auth','0003_alter_user_email_max_length','2022-11-15 04:31:33.668128'),(9,'auth','0004_alter_user_username_opts','2022-11-15 04:31:33.672629'),(10,'auth','0005_alter_user_last_login_null','2022-11-15 04:31:33.696136'),(11,'auth','0006_require_contenttypes_0002','2022-11-15 04:31:33.698134'),(12,'auth','0007_alter_validators_add_error_messages','2022-11-15 04:31:33.701634'),(13,'auth','0008_alter_user_username_max_length','2022-11-15 04:31:33.726634'),(14,'auth','0009_alter_user_last_name_max_length','2022-11-15 04:31:33.752135'),(15,'auth','0010_alter_group_name_max_length','2022-11-15 04:31:33.762137'),(16,'auth','0011_update_proxy_permissions','2022-11-15 04:31:33.766637'),(17,'auth','0012_alter_user_first_name_max_length','2022-11-15 04:31:33.788144'),(18,'sessions','0001_initial','2022-11-15 04:31:33.802643'),(19,'database','0001_initial','2022-11-15 07:25:43.087845');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('1spzqoj6lmwiyzfklqxhc6p3iktv2m7v','.eJxVjEEOwiAQRe_C2hBoYaAu3XsGMsOAVA0kpV0Z765NutDtf-_9lwi4rSVsPS1hZnEWWpx-N8L4SHUHfMd6azK2ui4zyV2RB-3y2jg9L4f7d1Cwl2_tLE-o1JTRZ2JnxqRotDREA05F9AMQRAugsgEiJCCtdfasLFvtfRTvD-ntN_Y:1ovaoS:zKjNWdJ-4LGELMM6Os-_Q36zrugmyuQLxKzJUOYSu74','2022-12-01 09:04:00.122490');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garagesaletable`
--

DROP TABLE IF EXISTS `garagesaletable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garagesaletable` (
  `gsid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `lid` int DEFAULT NULL,
  `starttime` timestamp NULL DEFAULT NULL,
  `endtime` timestamp NULL DEFAULT NULL,
  `aid` int DEFAULT NULL,
  `_description` longtext,
  `imageid` int DEFAULT NULL,
  PRIMARY KEY (`gsid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garagesaletable`
--

LOCK TABLES `garagesaletable` WRITE;
/*!40000 ALTER TABLE `garagesaletable` DISABLE KEYS */;
INSERT INTO `garagesaletable` VALUES (1,9,1,'2022-11-15 02:50:36','2022-11-15 02:50:36',1,'a new sale',1),(2,9,2,'2022-11-23 08:00:00','2022-11-24 08:00:00',2,'',NULL),(3,9,3,'2022-11-30 08:00:00','2022-12-02 08:00:00',3,'other test',NULL);
/*!40000 ALTER TABLE `garagesaletable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagetable`
--

DROP TABLE IF EXISTS `imagetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagetable` (
  `iid` int NOT NULL AUTO_INCREMENT,
  `itid` int DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `main` int DEFAULT '0',
  PRIMARY KEY (`iid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagetable`
--

LOCK TABLES `imagetable` WRITE;
/*!40000 ALTER TABLE `imagetable` DISABLE KEYS */;
INSERT INTO `imagetable` VALUES (1,1,'static/src/1.jpg',1,1,1),(2,2,'static/src/2.jpg',1,1,1),(3,3,'static/src/3.jpg',1,1,1),(4,4,'static/src/4.jpg',1,1,1),(5,5,'static/src/5.jpg',1,1,1),(6,6,'static/src/it6.jpg',1,1,1),(7,7,'static/src/OIP.jpg',1,1,1),(8,17,'static/src/17_1.png',NULL,NULL,0),(9,18,'static/src/18_1.png',NULL,NULL,1),(10,18,'static/src/18_2.png',NULL,NULL,0),(11,18,'static/src/18_3.png',NULL,NULL,0),(12,19,'static/src/19_1.jpeg',NULL,NULL,1),(13,19,'static/src/19_2.png',NULL,NULL,0),(14,20,'static/src/20_1.jpeg',NULL,NULL,1),(15,20,'static/src/20_2.png',NULL,NULL,0),(16,21,'static/src/21_1.jpeg',NULL,NULL,1),(17,21,'static/src/21_2.png',NULL,NULL,0),(18,21,'static/src/21_3.png',NULL,NULL,0),(19,21,'static/src/21_4.png',NULL,NULL,0),(20,22,'static/src/22_1.png',NULL,NULL,1),(21,22,'static/src/22_2.png',NULL,NULL,0),(22,22,'static/src/22_3.png',NULL,NULL,0),(23,23,'static/src/23_1.png',NULL,NULL,0),(24,23,'static/src/23_2.png',NULL,NULL,0),(25,23,'static/src/23_3.png',NULL,NULL,1),(26,24,'static/src/24_1.png',NULL,NULL,1),(27,24,'static/src/24_2.png',NULL,NULL,0),(28,24,'static/src/24_3.png',NULL,NULL,0),(29,25,'static/src/25_1.png',NULL,NULL,1),(30,25,'static/src/25_2.png',NULL,NULL,0),(31,26,'static/src/26_1.png',NULL,NULL,1),(32,26,'static/src/26_2.png',NULL,NULL,0),(33,27,'static/src/27_1.png',NULL,NULL,1),(34,28,'static/src/28_1.png',NULL,NULL,1),(35,29,'static/src/29_1.png',NULL,NULL,1),(36,30,'static/src/30_1.png',NULL,NULL,1);
/*!40000 ALTER TABLE `imagetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemlisttable`
--

DROP TABLE IF EXISTS `itemlisttable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemlisttable` (
  `ltid` int NOT NULL AUTO_INCREMENT,
  `lid` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `itid` int DEFAULT NULL,
  PRIMARY KEY (`ltid`),
  UNIQUE KEY `ltid_UNIQUE` (`ltid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemlisttable`
--

LOCK TABLES `itemlisttable` WRITE;
/*!40000 ALTER TABLE `itemlisttable` DISABLE KEYS */;
/*!40000 ALTER TABLE `itemlisttable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemtable`
--

DROP TABLE IF EXISTS `itemtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemtable` (
  `itid` int NOT NULL AUTO_INCREMENT,
  `itemname` varchar(45) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `mnumber` varchar(45) DEFAULT NULL,
  `description` longtext,
  `price` decimal(6,2) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `detail` json DEFAULT NULL,
  `gsid` int DEFAULT '0',
  `posttime` timestamp NULL DEFAULT NULL,
  `imageid` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `display` int DEFAULT '1',
  PRIMARY KEY (`itid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemtable`
--

LOCK TABLES `itemtable` WRITE;
/*!40000 ALTER TABLE `itemtable` DISABLE KEYS */;
INSERT INTO `itemtable` VALUES (1,'keyboard','apple','123456','this is a keyboard',1499.99,1,NULL,2,'2022-11-15 02:50:36',1,1,1),(2,'motherboard','ikea','12ge3456','this is a motherboard',1499.99,1,NULL,1,'2022-11-15 02:50:36',2,1,1),(3,'Samsung 970 EVO Plus SSD 2TB NVMe M.2','Samsung','MZ-V7S2T0B','ALWAYS EVOLVING SSD: Faster than the 970 EVO, the 970 EVO Plus is powered by the latest V-NAND technology and firmware optimization; It maximizes the potential of NVMe bandwidth for unbeatable computing; Comes in capacities of up to 2TB, with reliability of up to 1,200 TBW.',149.99,1,NULL,1,'2022-11-15 02:50:36',3,1,1),(4,'Gaming Computer Case','Lian Li','O11DW-GB002','GB-002 can be found in the small white O11D box (located near left top back panel) Mid-tower chassis with the dual-chamber layout',148.99,1,NULL,1,'2022-11-15 02:50:36',4,1,1),(5,'asus motherboard','ikea','awfa','a asus motherboard',1.99,1,NULL,1,'2022-11-21 22:21:11',1,1,1),(6,'headset','apple','test1','this is a hedset',1.99,1,NULL,1,'2022-11-21 22:23:18',1,1,1),(7,'phone','google','test3','a phone',2.99,1,NULL,2,'2022-11-21 22:25:44',1,1,1),(8,'test3','test3','test3','new test',2.99,1,NULL,2,'2022-11-21 22:26:57',1,1,2),(9,'test3','test3','test3','new test',2.99,1,NULL,2,'2022-11-21 22:29:35',1,1,2),(10,'test3','test3','test3','new test',2.99,1,NULL,2,'2022-11-21 22:32:02',1,1,2),(11,'test4','test4','test4',NULL,1.99,1,NULL,2,'2022-11-22 07:46:16',1,1,2),(12,'test7','test7','test7','test7test7test7test7test7',20.99,1,NULL,1,'2022-11-22 07:53:37',1,1,2),(13,'t1','t1','t1','t1t1t1t1t1t1t1',30.33,1,NULL,1,'2022-11-22 08:02:13',1,1,2),(14,'t2','t2','t2','weagesgrsgs',5.99,1,NULL,2,'2022-11-22 08:02:55',1,1,2),(15,'test55','test55','test55','wewa',1.99,1,NULL,1,'2022-11-22 08:16:35',1,1,2),(16,'test555','test555','test555','wewa',1.99,1,NULL,1,'2022-11-22 08:18:07',1,1,2),(17,'test66','test66','test66','grghshrtsh',45.99,1,NULL,1,'2022-11-22 08:18:59',1,1,2),(18,'geehg','geehg','geehg','efsgger',2.36,1,NULL,1,'2022-11-22 08:22:16',1,1,2),(19,'newtest','newbrand','nom','eawrawer',2.00,1,NULL,1,'2022-11-22 10:41:40',1,1,2),(20,'newtest1','newbrand1','nom1','eawrawer',2.00,1,NULL,2,'2022-11-22 10:43:32',1,1,2),(21,'newtest12','newbrand12','nom1','eawrawer',2.00,1,NULL,1,'2022-11-22 10:44:42',1,1,2),(22,'next','brand test','module num','new test',699.00,1,NULL,2,'2022-11-22 10:51:18',1,1,2),(23,'tttttt','wwww','aaaaa','arerr',65.00,1,NULL,1,'2022-11-22 10:54:02',1,1,2),(24,'tttttt2','wwww2','aaaaa2','arerr',65.00,1,NULL,1,'2022-11-22 10:54:49',1,1,2),(25,'gsitem3','gsitem3','gsitem3','testtest',2.36,1,NULL,1,'2022-11-22 14:30:07',1,1,2),(26,'gs31','gs','gs','ttttt',69.99,1,NULL,1,'2022-11-22 14:32:25',1,1,2),(27,'aaa','aaa','aaa','111111',1.33,1,NULL,3,'2022-11-22 14:34:09',1,1,2),(28,'efsf','esf','fesf','erersrs',1.00,1,NULL,3,'2022-11-22 14:39:55',1,1,2),(29,'34','123','41','231341',1.00,1,NULL,3,'2022-11-22 14:42:00',1,1,2),(30,'3333','3333','3333','3333',3.00,2,NULL,3,'2022-11-22 14:43:54',1,1,2);
/*!40000 ALTER TABLE `itemtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordertable`
--

DROP TABLE IF EXISTS `ordertable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordertable` (
  `oid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `lid` int DEFAULT NULL,
  `ordertime` timestamp NULL DEFAULT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  `tax` decimal(6,2) DEFAULT NULL,
  `subtotal` decimal(6,2) DEFAULT NULL,
  `billing` varchar(255) DEFAULT NULL,
  `shipping` varchar(255) DEFAULT NULL,
  `cid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`oid`),
  UNIQUE KEY `oid_UNIQUE` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordertable`
--

LOCK TABLES `ordertable` WRITE;
/*!40000 ALTER TABLE `ordertable` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordertable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testtable`
--

DROP TABLE IF EXISTS `testtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testtable` (
  `ITID` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ITID`),
  UNIQUE KEY `ITID_UNIQUE` (`ITID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testtable`
--

LOCK TABLES `testtable` WRITE;
/*!40000 ALTER TABLE `testtable` DISABLE KEYS */;
INSERT INTO `testtable` VALUES (1,'abv','2'),(2,'ccv','4');
/*!40000 ALTER TABLE `testtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertable`
--

DROP TABLE IF EXISTS `usertable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertable` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `registertime` timestamp NULL DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `profilepicture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertable`
--

LOCK TABLES `usertable` WRITE;
/*!40000 ALTER TABLE `usertable` DISABLE KEYS */;
INSERT INTO `usertable` VALUES (1,'Cary','Doe','Cary.doe@gamil.com','4254254225','123456','2022-11-15 02:50:36','user123',''),(2,'Jason','Davis','Jason.Davis@gamil.com','4254254225','123456','2022-11-15 02:50:36','user124',''),(3,'Corey','Reese','Corey.Reese@gamil.com','4254254225','123456','2022-11-15 02:50:36','user125',''),(4,'Dominique','Aguirre','Dominique.Aguirre@gamil.com','4254254225','123456','2022-11-15 02:50:36','user126',''),(5,'Melissa','Rodriguez','Melissa.Rodriguez@gamil.com','4254254225','123456','2022-11-15 02:50:36','user127',''),(6,'Whitney','Green','Whitney.Green@gamil.com','4254254225','123456','2022-11-15 02:50:36','user128',''),(7,'Chase','Franklin','Franklin.doe@gamil.com','4254254225','123456','2022-11-15 02:50:36','user129',''),(8,'Lauren','Tucker','Lauren.Tucker@gamil.com','4254254225','123456','2022-11-15 02:50:36','user130',''),(9,'yilei','ding','yileiding1990@gmail.com','1234567890','123456',NULL,'yilei8888','static/src/1.jpg');
/*!40000 ALTER TABLE `usertable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test'
--
/*!50003 DROP PROCEDURE IF EXISTS `addchathistory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addchathistory`(in _sender int,in _reciver int,in _message varchar(255))
BEGIN
	insert into chathistory (sender,reciver,message) values(_sender,_reciver,_message);
    select*from chathistory where chid=LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addimage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addimage`(in _itid int,in _src varchar(200),in _main int)
BEGIN
	insert into imagetable (iid,src,main) values (_itid,_src,_main);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `additem` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `additem`(
in _itemname varchar(45),
in _brand varchar(45),
in _mnumber varchar(45),
in _description LONGTEXT,
in _price DECIMAL(6,2),
in _qty INT,
in _gsid INT,
in _imageid INT,
in _uid INT,
in _display INT,
out itemid int
)
BEGIN
insert into itemtable (itemname,brand,mnumber,description,price,qty,gsid,posttime,imageid,uid,display) values (_itemname,_brand,_mnumber,_description,_price,_qty,_gsid,NOW(),_imageid,_uid,_display);
set itemid=LAST_INSERT_ID();
select itemid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Alldata` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Alldata`()
BEGIN
	select *  from ( select * from itemtable where itemtable.display=1) as item  left join (select itid as id,src,main from imagetable where main=1) as itable on item.itid=itable.id order by item.itid desc;
    select * from imagetable;
    select * from garagesaletable as garage left join (select*from addresstable) as address on garage.aid=address.aid;
    select * from usertable;
    select*from chathistory;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create database` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create database`()
BEGIN



drop table if exists usertable;

CREATE TABLE `usertable` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `registertime` timestamp NULL DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `profilepicture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Cary","Doe","Cary.doe@gamil.com","4254254225","123456",NOW(),"user123","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Jason","Davis","Jason.Davis@gamil.com","4254254225","123456",NOW(),"user124","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Corey","Reese","Corey.Reese@gamil.com","4254254225","123456",NOW(),"user125","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Dominique","Aguirre","Dominique.Aguirre@gamil.com","4254254225","123456",NOW(),"user126","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Melissa","Rodriguez","Melissa.Rodriguez@gamil.com","4254254225","123456",NOW(),"user127","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Whitney","Green","Whitney.Green@gamil.com","4254254225","123456",NOW(),"user128","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Chase","Franklin","Franklin.doe@gamil.com","4254254225","123456",NOW(),"user129","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Lauren","Tucker","Lauren.Tucker@gamil.com","4254254225","123456",NOW(),"user130","");


drop table if exists itemtable;

CREATE TABLE `itemtable` (
  `itid` INT NOT NULL AUTO_INCREMENT,
  `itemname` VARCHAR(45) NULL,
  `brand` VARCHAR(45) NULL,
  `mnumber` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  `price` DECIMAL(6,2) NULL,
  `qty` INT NULL,
  `detail` JSON NULL,
  `gsid` INT NULL DEFAULT 0,
  `posttime` TIMESTAMP NULL,
  `imageid` INT NULL,
  `uid` INT NULL,
  `display` INT NULL DEFAULT 1,
  PRIMARY KEY (`itid`)
  );

insert into itemtable (itemname,brand,mnumber,description,price,qty,gsid,posttime,imageid,uid,display) values ("iphone","apple","123456","this is a phone","1499.99",1,1,NOW(),1,1,1);
insert into itemtable (itemname,brand,mnumber,description,price,qty,gsid,posttime,imageid,uid,display) values ("table","ikea","12ge3456","this is a table","1499.99",1,1,NOW(),1,1,1);
insert into itemtable (itemname,brand,mnumber,description,price,qty,gsid,posttime,imageid,uid,display) values ("Samsung 970 EVO Plus SSD 2TB NVMe M.2","Samsung","MZ-V7S2T0B","ALWAYS EVOLVING SSD: Faster than the 970 EVO, the 970 EVO Plus is powered by the latest V-NAND technology and firmware optimization; It maximizes the potential of NVMe bandwidth for unbeatable computing; Comes in capacities of up to 2TB, with reliability of up to 1,200 TBW.","149.99",1,1,NOW(),1,1,1);
insert into itemtable (itemname,brand,mnumber,description,price,qty,gsid,posttime,imageid,uid,display) values ("Gaming Computer Case","Lian Li","O11DW-GB002","GB-002 can be found in the small white O11D box (located near left top back panel) Mid-tower chassis with the dual-chamber layout","148.99",1,1,NOW(),1,1,1);


drop table if exists addresstable;

CREATE TABLE `addresstable` (
  `aid` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) DEFAULT NULL,
  `apt` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `states` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`aid`),
  UNIQUE KEY `aid_UNIQUE` (`aid`)
);

insert into addresstable (street,apt,city,states,zip,uid,type) values ("3000 Landerholm Cir SE","","Bellevue","WA","98006",1,1);


drop table if exists garagesaletable;

CREATE TABLE `garagesaletable` (
  `gsid` INT NOT NULL AUTO_INCREMENT,
  `uid` INT NULL,
  `lid` INT NULL,
  `starttime` TIMESTAMP NULL,
  `endtime` TIMESTAMP NULL,
  `aid` INT NULL,
  `description` LONGTEXT NULL,
  `imageid` INT NULL,
  PRIMARY KEY (`gsid`)
  );

insert into garagesaletable (uid,lid,starttime,endtime,aid,description,imageid) values (1,1,now(),now(),1,"a new sale",1);

drop table if exists itemlisttable;

CREATE TABLE `test`.`itemlisttable` (
  `ltid` INT NOT NULL AUTO_INCREMENT,
  `lid` INT NULL,
  `uid` INT NULL,
  `itid` INT NULL,
  PRIMARY KEY (`ltid`),
  UNIQUE INDEX `ltid_UNIQUE` (`ltid` ASC) VISIBLE
);

drop table if exists ordertable;

CREATE TABLE `test`.`ordertable` (
  `oid` INT NOT NULL AUTO_INCREMENT,
  `uid` INT NULL,
  `lid` INT NULL,
  `ordertime` TIMESTAMP NULL,
  `total` DECIMAL(6,2) NULL,
  `tax` DECIMAL(6,2) NULL,
  `subtotal` DECIMAL(6,2) NULL,
  `billing` VARCHAR(255) NULL,
  `shipping` VARCHAR(255) NULL,
  `cid` VARCHAR(45) NULL,
  PRIMARY KEY (`oid`),
  UNIQUE INDEX `oid_UNIQUE` (`oid` ASC) VISIBLE);

drop table if exists  imagetable;

CREATE TABLE `test`.`imagetable` (
  `itid` int NOT NULL AUTO_INCREMENT,
  `iid` int DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`itid`)
);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getgaragesale` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getgaragesale`()
BEGIN
select * from garagesaletable as garage left join (select*from addresstable) as address on garage.aid=address.aid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getitem` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getitem`(in _itid int)
BEGIN
select*from itemtable where itid=_itid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getitemimage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getitemimage`(in _itid int)
BEGIN
select*from imagetable where iid=_itid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getitemlist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getitemlist`()
BEGIN
	select *  from itemtable LEFT join (select src,iid,main from imagetable) as itable on itemtable.itid=itable.iid and itemtable.display=1 and itable.main=1 order by itemtable.itid desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getitemlistbygsid` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getitemlistbygsid`(in _gsid int)
BEGIN
	select *  from (select * from itemtable where gsid=_gsid) as item LEFT join (select src,iid,main from imagetable) as itable on item.itid=itable.iid and item.display=1 and itable.main=1 order by item.itid desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `newgaragesale` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `newgaragesale`(
in _street varchar(200),
in _city varchar(200),
in _states varchar(20),
in _zip varchar(10),
in _starttime timestamp, 
in _endtime timestamp, 
in _uid int, 
in __description longtext)
BEGIN
declare address int;
insert into addresstable (street,city,states,zip,uid) values (_street,_city,_states,_zip,_uid);

set address=LAST_INSERT_ID();

insert into garagesaletable (aid,starttime,endtime,_description,uid) values (address,_starttime,_endtime,__description,_uid);
select LAST_INSERT_ID() as aid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updatedisplay` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updatedisplay`(in _itid int,in _display int, out result int)
BEGIN
declare countRow int;
update itemtable set display=2 where itid=_itid;
SET countRow =  ROW_COUNT();
set result=countRow;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-14 19:12:33
