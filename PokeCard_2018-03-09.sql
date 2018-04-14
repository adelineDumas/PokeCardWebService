# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Hôte: 127.0.0.1 (MySQL 5.5.5-10.1.26-MariaDB)
# Base de données: PokeCard
# Temps de génération: 2018-03-09 07:51:31 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table ami
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ami`;

CREATE TABLE `ami` (
  `id_friendship` int(11) NOT NULL AUTO_INCREMENT,
  `login_user1` varchar(250) DEFAULT NULL,
  `login_user2` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_friendship`),
  KEY `FK_AmiUser1` (`login_user1`),
  KEY `FK_AmiUser2` (`login_user2`),
  CONSTRAINT `FK_AmiUser1` FOREIGN KEY (`login_user1`) REFERENCES `user` (`login_user`),
  CONSTRAINT `FK_AmiUser2` FOREIGN KEY (`login_user2`) REFERENCES `user` (`login_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ami` WRITE;
/*!40000 ALTER TABLE `ami` DISABLE KEYS */;

INSERT INTO `ami` (`id_friendship`, `login_user1`, `login_user2`)
VALUES
	(1,'test','toto'),
	(2,'tata','test'),
	(3,'toto','johan');

/*!40000 ALTER TABLE `ami` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table collection_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `collection_user`;

CREATE TABLE `collection_user` (
  `id_ligne` int(11) NOT NULL AUTO_INCREMENT,
  `login_user` varchar(250) DEFAULT NULL,
  `id_pokemon` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_ligne`),
  KEY `FK_CollectionUser` (`login_user`),
  CONSTRAINT `FK_CollectionUser` FOREIGN KEY (`login_user`) REFERENCES `user` (`login_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `collection_user` WRITE;
/*!40000 ALTER TABLE `collection_user` DISABLE KEYS */;

INSERT INTO `collection_user` (`id_ligne`, `login_user`, `id_pokemon`)
VALUES
	(81,'toz',563),
	(83,'toz',694),
	(84,'toz',442),
	(85,'toz',721),
	(86,'toz',378),
	(88,'toz',522),
	(89,'toz',256),
	(91,'toz',291),
	(92,'toz',495),
	(94,'toz',603),
	(128,'toz',577),
	(131,'toz',1),
	(132,'titi',251),
	(135,'toz',684),
	(137,'toz',60),
	(138,'toz',107),
	(140,'toz',508),
	(141,'toz',481),
	(142,'toz',72),
	(143,'toz',478),
	(144,'toz',561),
	(145,'toz',52),
	(146,'toz',489),
	(147,'toz',550),
	(148,'toz',501),
	(149,'toz',409),
	(150,'toz',197),
	(151,'toz',240),
	(152,'toz',322),
	(153,'toz',216),
	(154,'toz',562),
	(156,'toto',559),
	(157,'toto',127),
	(158,'toto',15),
	(159,'toto',166),
	(160,'toto',666),
	(161,'toto',681),
	(162,'toto',272),
	(163,'toto',319),
	(164,'toto',706),
	(165,'toto',308),
	(166,'toto',423),
	(167,'toto',627),
	(168,'toto',361),
	(169,'toto',436),
	(230,'titi',12),
	(232,'tata',517),
	(233,'tata',154),
	(234,'tata',282),
	(235,'tata',246),
	(237,'tata',651),
	(238,'tata',450),
	(239,'tata',390),
	(240,'tata',241),
	(241,'tata',108),
	(242,'tata',368),
	(243,'tata',592),
	(244,'tata',439),
	(245,'tata',294),
	(246,'tata',643),
	(247,'tata',85),
	(248,'toto',237),
	(249,'test',495),
	(250,'test',454),
	(251,'test',689),
	(252,'test',320),
	(253,'test',251),
	(254,'test',556),
	(255,'test',533),
	(256,'test',626),
	(257,'test',618),
	(258,'test',701),
	(259,'test',225),
	(260,'test',361),
	(261,'test',612),
	(262,'test',644),
	(263,'test',587),
	(264,'deline',60),
	(265,'deline',3),
	(266,'deline',701),
	(267,'deline',406),
	(268,'deline',24),
	(269,'deline',719),
	(270,'deline',308),
	(271,'deline',472),
	(272,'deline',526),
	(273,'deline',208),
	(274,'deline',255),
	(275,'deline',199),
	(276,'deline',388),
	(277,'deline',6),
	(278,'deline',293);

/*!40000 ALTER TABLE `collection_user` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table requete_echange
# ------------------------------------------------------------

DROP TABLE IF EXISTS `requete_echange`;

CREATE TABLE `requete_echange` (
  `id_ligne` int(11) NOT NULL AUTO_INCREMENT,
  `login_user` varchar(250) NOT NULL,
  `id_pokemon` int(11) NOT NULL,
  `nom_pokemon` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  PRIMARY KEY (`id_ligne`),
  KEY `FK_RequeteEchangeUser` (`login_user`),
  CONSTRAINT `FK_RequeteEchangeUser` FOREIGN KEY (`login_user`) REFERENCES `user` (`login_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Affichage de la table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `login_user` varchar(250) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `mail` varchar(250) DEFAULT NULL,
  `points` int(250) NOT NULL DEFAULT '0',
  `avatar` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`login_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`login_user`, `password`, `mail`, `points`, `avatar`)
VALUES
	('deline','9cf95dacd226dcf43da376cdb6cbba7035218921','deline@gmail.com',999990,'https://static.zerochan.net/Pikachu.full.1452733.jpg'),
	('jo','9cf95dacd226dcf43da376cdb6cbba7035218921','jo@albion.fr',10,'http://www.guildi.com/library/logos/games/albion-online.png'),
	('johan','9cf95dacd226dcf43da376cdb6cbba7035218921','johan@johan.fr',10,'http://www.hameaudeschamps.fr/images/webcam.png'),
	('miaou','wfgfdwgfxhdhhfhfdxhfxxhdhd','fff',0,NULL),
	('nico','9cf95dacd226dcf43da376cdb6cbba7035218921','nico@nico.ni',10,'http://www.petitnicolas.com/images/files/pn_home.jpg'),
	('rayan','9cf95dacd226dcf43da376cdb6cbba7035218921','mrsatan@dbz.com',10,'https://vignette.wikia.nocookie.net/dragonball/images/d/d1/Mr_Satan_Artwork.png/revision/latest/scale-to-width-down/310?cb=20170904190549&path-prefix=fr'),
	('tata','9cf95dacd226dcf43da376cdb6cbba7035218921','jfjdhd',1,NULL),
	('test','9cf95dacd226dcf43da376cdb6cbba7035218921','test@gmail.com',0,NULL),
	('titi','9cf95dacd226dcf43da376cdb6cbba7035218921','titi@gmail.com',3,NULL),
	('toto','9cf95dacd226dcf43da376cdb6cbba7035218921','test@mail.com',2,NULL),
	('toz','9cf95dacd226dcf43da376cdb6cbba7035218921','toz@toz.toz',10,NULL);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
