--
-- Table structure for table `memos`
--
DROP TABLE IF EXISTS `memos`;
CREATE TABLE `memos` (
  `data_id` int NOT NULL AUTO_INCREMENT ,
  `emp_data_id` int NOT NULL ,
  `assign_memo` text ,
  `hr_memo` text ,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`data_id`) -- ,
--  CONSTRAINT `memos_ibfk_1` FOREIGN KEY (`emp_data_id`) REFERENCES `m_employees` (`data_id`)
);