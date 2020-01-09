-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jan 09, 2020 at 11:42 AM
-- Server version: 10.3.14-MariaDB
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lara_react_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Foods', '2019-12-30 04:42:42', '2020-01-06 03:45:38'),
(2, 'Lost Animal', '2019-12-30 04:43:22', '2020-01-04 05:36:47'),
(6, 'Animals', '2020-01-03 04:55:21', '2020-01-04 05:36:39'),
(7, 'Galaxy', '2020-01-03 04:58:19', '2020-01-03 04:58:19');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8_unicode_ci NOT NULL,
  `queue` text COLLATE utf8_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1),
(11, '2019_12_30_091823_create_categories_table', 2),
(12, '2019_12_30_091858_create_posts_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('d2b553f69f1c65bcbe0e456d31e09a5fc98599ea6a2c4a5bbc0cd70d0577788d0e21c904177c3bbd', 1, 1, 'LoginToken', '[]', 1, '2020-01-09 06:11:26', '2020-01-09 06:11:26', '2021-01-09 11:41:26'),
('8cb3cb984352b8de17c0ab0f94225271aad7f75a8e7788d2478a13e70ca93f8a4fd4a2967c0457c1', 1, 1, 'LoginToken', '[]', 1, '2020-01-09 05:50:09', '2020-01-09 05:50:09', '2021-01-09 11:20:09'),
('8e70f34d4299e5310bc91667a4d8742071667fb85e7c9c61cf05d15db24c78c2e12036a6e7acd682', 1, 1, 'LoginToken', '[]', 1, '2020-01-09 05:44:17', '2020-01-09 05:44:17', '2021-01-09 11:14:17'),
('95439c4fbc068d117dce0722598cf5f51d673aed0f586e068308e799e7536dd7ebece0ae058f982f', 1, 1, 'LoginToken', '[]', 1, '2020-01-09 05:42:16', '2020-01-09 05:42:16', '2021-01-09 11:12:16');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
CREATE TABLE IF NOT EXISTS `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
CREATE TABLE IF NOT EXISTS `oauth_clients` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'omZPxIpOi7dDyfFsQZrQGLD9Le0fEw6v7FNG3sMi', 'http://localhost', 1, 0, 0, '2019-12-28 05:12:57', '2019-12-28 05:12:57'),
(2, NULL, 'Laravel Password Grant Client', 'kJ7RN8wJyfMX2Ku2kbqTmEmyR1qsqCzT4OLtzPhC', 'http://localhost', 0, 1, 0, '2019-12-28 05:12:57', '2019-12-28 05:12:57');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
CREATE TABLE IF NOT EXISTS `oauth_personal_access_clients` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2019-12-28 05:12:57', '2019-12-28 05:12:57');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `featured_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'default.png',
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_category_id_foreign` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `category_id`, `title`, `featured_image`, `content`, `status`, `created_at`, `updated_at`) VALUES
(1, '1', 'This is Amazing Indias', 'TSlmkdYMy5MYNenKIKRgA78k4ivbkqcLsgZTZ40V.jpeg', '<b>Gevolglik</b> sal die doelwitte van stakings die produsente se verander van veeleisende stygings in lone aan die beheer van hul aandeel in die produksie', 'PUBLISH', '2019-12-30 05:03:10', '2020-01-09 03:28:13'),
(2, '1', 'Dus, al die arbeidsmag wat werk vir die samelewing is sielkundig apaties', 'default.png', 'Omdat die een eenheid is al wat nodig is om in die <b>behoeftes</b> van \'n individu te voldoen, is die addisionele eenhede verkry vir die doel van spaar Daar is geen regverdiging vir sodanige <i>optrede</i>, deur die diktatoriale argument is dat die samelewing eintlik bestaan ​​uit talle segmente, waarvan een die likwidasie van ander onderneem om slegs te bly in krag', 'DRAFT', '2019-12-30 05:04:35', '2019-12-30 05:04:35'),
(5, '6', 'Digital India is real ???', 'default.png', '<h2>Digital India is real ???</h2><p>&nbsp;</p><p>Wage-earners, however improved their wages may be, are a type of slave</p><p>The population of other races has decreased because of birth control, restrictions on marriage, and constant occupation in work, unlike the Blacks, who tend to be less obsessive about work in a climate which is continuously hot</p><p>Stress should be laid on social reality and family care in order to bring up an integrated well-educated human</p><p>Thus, these social bonds, benefits, advantages and ideals associated with them are lost wherever the family, the tribe, the nation or humankind vanish or are lost</p><p>The social relationship is, therefore, a national relationship and the national is a social relationship</p><p>Popular Conferences and People\'s Committees are the fruition of the people\'s struggle for democracy</p><p>It is right of all people for their health and recreational benefit</p>', 'DRAFT', '2020-01-06 04:14:58', '2020-01-06 05:14:17'),
(11, '1', 'This is the title 2 66dfsfsdssssss', 'default.png', '<p>Hello lorem ipsum</p>', 'PUBLISH', '2020-01-08 05:08:00', '2020-01-09 03:24:08'),
(12, '2', 'Vikash', 'default.png', '<p>This is vikash</p>', 'PUBLISH', '2020-01-09 02:35:43', '2020-01-09 02:35:43'),
(15, '2', 'kiranaananansdjknkfsssssssssssssssssssss', 'vTLZHt0wy4tTec5uwXKrZ080O66p7zcYn5fM1HdE.jpeg', '<p>xdfdf</p>', 'PUBLISH', '2020-01-09 03:31:22', '2020-01-09 03:33:40'),
(16, '1', 'This is the title 2 66dfsfsdasasassa', 'default.png', '<p>Hello lorem ipsum</p>', 'PUBLISH', '2020-01-09 05:05:50', '2020-01-09 05:05:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `profile_img` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'default.png',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `profile_img`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Vikash Admin', 'admin@gmail.com', NULL, 'f7aSLDikEWpvs4ZKroWRoXF5YIy07CIvnQpclpb8.jpeg', '$2y$10$x/lqIyU0Vd0RqgPCdnrxPOfT7HbtmWqfOH0ehouSrhunXv1SBnc2S', NULL, '2019-12-30 01:53:07', '2020-01-09 02:22:52'),
(3, 'Vivek Yadav', 'vivek@gmail.com', NULL, 'default.png', '$2y$10$LyB2zEPAxdXi3alCqJbMguF8fI.6iEPvJEarftz1HzNePve9MgvzK', NULL, '2020-01-02 02:41:35', '2020-01-02 02:41:35');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
