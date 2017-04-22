-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema trackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `trackerdb` ;

-- -----------------------------------------------------
-- Schema trackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trackerdb` DEFAULT CHARACTER SET utf8 ;
USE `trackerdb` ;

-- -----------------------------------------------------
-- Table `gas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gas` ;

CREATE TABLE IF NOT EXISTS `gas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gallons` DOUBLE NOT NULL,
  `miles` DOUBLE NOT NULL,
  `cost` DOUBLE NOT NULL,
  `odometer` DOUBLE NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO student@localhost;
 DROP USER student@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'student'@'localhost' IDENTIFIED BY 'student';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'student'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `gas`
-- -----------------------------------------------------
START TRANSACTION;
USE `trackerdb`;
INSERT INTO `gas` (`id`, `gallons`, `miles`, `cost`, `odometer`, `date`) VALUES (1, 10, 330, 20.23, 123234, '2017-01-11');
INSERT INTO `gas` (`id`, `gallons`, `miles`, `cost`, `odometer`, `date`) VALUES (2, 10.2, 331, 19.21, 123456, '2017-01-21');
INSERT INTO `gas` (`id`, `gallons`, `miles`, `cost`, `odometer`, `date`) VALUES (3, 9.32, 301, 20.01, 123678, '2017-01-25');

COMMIT;

