INSERT INTO `users` VALUES ('1', 'Lê', 'Hưởng', 'yeuemmotdoi_09@yahoo.com', '$2y$10$8F8k8eBoX6.oJdxt.CdHhuD0Tj1/B/0GKmK5AyR5LZXYpjWtzqRuK', 'facebook', 'bHaGmH6IsEtU4dJvUPYgcPq4T5bruBFDUW6gOFOn8dpW3NecaD85FYRLY3g9', '2016-04-19 04:54:01', '2016-04-20 11:06:02', null);
INSERT INTO `users` VALUES ('2', 'Minh', 'Huong', 'kmahuong.09@gmail.com', '$2y$10$3EwXyOPrV2UHpKwplE6bIeiiWYvzSxtDk.KDubOpgUKD9jpoV6jSm', 'local', 'nV8ruT5g3XHlG8Sgap5MuQl0PVJZjQbK0dRVLqbA39x7bMvqkC4KnSGsF8lE', '2016-04-19 10:14:20', '2016-04-20 11:45:55', null);
INSERT INTO `users` VALUES ('3', 'Huong', 'QSoft', 'huonglm@qsoftvietnam.com', '$2y$10$CHpjqFgGTTjDVIOJ/ESwdexG1NOqaDlWem1BrNDCm2ggWTXnlJoCu', 'local', null, '2016-04-19 10:15:20', '2016-04-19 10:15:20', null);
INSERT INTO `users` VALUES ('4', 'Phi', 'Linh', 'linhnp@qsoftvietnam.com', '$2y$10$T2kuPkRx2M4sAj.cwd03m.jYetxkLf0JBhVnqWTMOqq/nQV9sLnsK', 'local', null, '2016-04-19 10:18:14', '2016-04-19 10:18:14', null);
INSERT INTO `users` VALUES ('5', 'Huong', 'Le', 'huonglm09@gmail.com', '$2y$10$uyPIfHyrgYE0WEBHexaEfuU/5e8YQ.crjt4aw8ZQurVq0ZsLia0EO', 'local', 'chUI8Tkb3pi0plKgZmMpvxX921XG48JH5lZybRVZH0s8U3IoLR5BSEMjlue9', '2016-04-19 10:27:10', '2016-04-20 11:40:54', null);
INSERT INTO `users` VALUES ('6', 'Phan ', 'Ha', 'phanthanhhak55hus@gmail.com', '$2y$10$T2kuPkRx2M4sAj.cwd03m.jYetxkLf0JBhVnqWTMOqq/nQV9sLnsK', 'local', null, '2016-04-19 10:27:10', '2016-04-19 10:27:10', null);
INSERT INTO `users` VALUES ('7', 'A', 'Linh', 'philinh2003@hotmail.com', '$2y$10$T2kuPkRx2M4sAj.cwd03m.jYetxkLf0JBhVnqWTMOqq/nQV9sLnsK', 'local', null, '2016-04-19 10:27:10', '2016-04-19 10:27:10', null);
INSERT INTO `users` VALUES ('8', 'The', 'Manh', 'theman2311@gmail.com', '$2y$10$T2kuPkRx2M4sAj.cwd03m.jYetxkLf0JBhVnqWTMOqq/nQV9sLnsK', 'local', null, '2016-04-19 10:27:10', '2016-04-19 10:27:10', null);
INSERT INTO `users` VALUES ('9', 'Henry', 'Tran', 'henry.tran@qsoftvietnam.com', '$2y$10$jfOXeW9aqtuP4QA0gzn1re6GEoTCsokcrNAmFISBx677PG1m4kx5q', 'local', null, '2016-03-17 17:07:27', '2016-03-17 10:38:23', null);
INSERT INTO `users` VALUES ('10', 'Vinh', 'Bao', 'themanhss@gmail.com', '$2y$10$jfOXeW9aqtuP4QA0gzn1re6GEoTCsokcrNAmFISBx677PG1m4kx5q', 'local', null, '2016-03-17 17:07:27', '2016-03-17 10:38:23', null);
INSERT INTO `users` VALUES ('11', 'Minh', 'Tien', 'tienlm1509@gmail.com', '$2y$10$vMz9jdAgjTi9zsoiuirA1upk.RRJiElNrQHCm1DSeobG2HPOtlPd2', 'local', '3u7R8hvaskK1CvVHhovxFXlfbQ9kpPtbPkUwZaln7xrBE3qMq6fjJ2kf6WUK', '2016-04-20 11:13:54', '2016-04-20 11:14:31', null);

DROP TABLE IF EXISTS `emails`;
CREATE TABLE `emails` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_user_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `to_user_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mail_subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mail_content` text COLLATE utf8_unicode_ci NOT NULL,
  `from_deleted` int(11) NOT NULL,
  `to_deleted` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;