-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 04 sep. 2024 à 21:34
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `stage_esprit_33`
--

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add app user', 6, 'add_appuser'),
(22, 'Can change app user', 6, 'change_appuser'),
(23, 'Can delete app user', 6, 'delete_appuser'),
(24, 'Can view app user', 6, 'view_appuser'),
(25, 'Can add bloc', 7, 'add_bloc'),
(26, 'Can change bloc', 7, 'change_bloc'),
(27, 'Can delete bloc', 7, 'delete_bloc'),
(28, 'Can view bloc', 7, 'view_bloc'),
(29, 'Can add examen', 8, 'add_examen'),
(30, 'Can change examen', 8, 'change_examen'),
(31, 'Can delete examen', 8, 'delete_examen'),
(32, 'Can view examen', 8, 'view_examen'),
(33, 'Can add salle', 9, 'add_salle'),
(34, 'Can change salle', 9, 'change_salle'),
(35, 'Can delete salle', 9, 'delete_salle'),
(36, 'Can view salle', 9, 'view_salle'),
(37, 'Can add session', 10, 'add_session'),
(38, 'Can change session', 10, 'change_session'),
(39, 'Can delete session', 10, 'delete_session'),
(40, 'Can view session', 10, 'view_session'),
(41, 'Can add niveau', 11, 'add_niveau'),
(42, 'Can change niveau', 11, 'change_niveau'),
(43, 'Can delete niveau', 11, 'delete_niveau'),
(44, 'Can view niveau', 11, 'view_niveau'),
(45, 'Can add classe', 12, 'add_classe'),
(46, 'Can change classe', 12, 'change_classe'),
(47, 'Can delete classe', 12, 'delete_classe'),
(48, 'Can view classe', 12, 'view_classe'),
(49, 'Can add unite', 13, 'add_unite'),
(50, 'Can change unite', 13, 'change_unite'),
(51, 'Can delete unite', 13, 'delete_unite'),
(52, 'Can view unite', 13, 'view_unite'),
(53, 'Can add departement', 14, 'add_departement'),
(54, 'Can change departement', 14, 'change_departement'),
(55, 'Can delete departement', 14, 'delete_departement'),
(56, 'Can view departement', 14, 'view_departement'),
(57, 'Can add contrainte', 15, 'add_contrainte'),
(58, 'Can change contrainte', 15, 'change_contrainte'),
(59, 'Can delete contrainte', 15, 'delete_contrainte'),
(60, 'Can view contrainte', 15, 'view_contrainte'),
(61, 'Can add surveillance', 16, 'add_surveillance'),
(62, 'Can change surveillance', 16, 'change_surveillance'),
(63, 'Can delete surveillance', 16, 'delete_surveillance'),
(64, 'Can view surveillance', 16, 'view_surveillance'),
(65, 'Can add module', 17, 'add_module'),
(66, 'Can change module', 17, 'change_module'),
(67, 'Can delete module', 17, 'delete_module'),
(68, 'Can view module', 17, 'view_module'),
(69, 'Can add static device', 18, 'add_staticdevice'),
(70, 'Can change static device', 18, 'change_staticdevice'),
(71, 'Can delete static device', 18, 'delete_staticdevice'),
(72, 'Can view static device', 18, 'view_staticdevice'),
(73, 'Can add static token', 19, 'add_statictoken'),
(74, 'Can change static token', 19, 'change_statictoken'),
(75, 'Can delete static token', 19, 'delete_statictoken'),
(76, 'Can view static token', 19, 'view_statictoken'),
(77, 'Can add TOTP device', 20, 'add_totpdevice'),
(78, 'Can change TOTP device', 20, 'change_totpdevice'),
(79, 'Can delete TOTP device', 20, 'delete_totpdevice'),
(80, 'Can view TOTP device', 20, 'view_totpdevice'),
(81, 'Can add TOTP device', 21, 'add_totpdevice'),
(82, 'Can change TOTP device', 21, 'change_totpdevice'),
(83, 'Can delete TOTP device', 21, 'delete_totpdevice'),
(84, 'Can view TOTP device', 21, 'view_totpdevice'),
(85, 'Can add static device', 22, 'add_staticdevice'),
(86, 'Can change static device', 22, 'change_staticdevice'),
(87, 'Can delete static device', 22, 'delete_staticdevice'),
(88, 'Can view static device', 22, 'view_staticdevice'),
(89, 'Can add static token', 23, 'add_statictoken'),
(90, 'Can change static token', 23, 'change_statictoken'),
(91, 'Can delete static token', 23, 'delete_statictoken'),
(92, 'Can view static token', 23, 'view_statictoken'),
(93, 'Can add salle_examen', 24, 'add_salle_examen'),
(94, 'Can change salle_examen', 24, 'change_salle_examen'),
(95, 'Can delete salle_examen', 24, 'delete_salle_examen'),
(96, 'Can view salle_examen', 24, 'view_salle_examen'),
(97, 'Can add module_niveau', 25, 'add_module_niveau'),
(98, 'Can change module_niveau', 25, 'change_module_niveau'),
(99, 'Can delete module_niveau', 25, 'delete_module_niveau'),
(100, 'Can view module_niveau', 25, 'view_module_niveau'),
(101, 'Can add modniv', 26, 'add_modniv'),
(102, 'Can change modniv', 26, 'change_modniv'),
(103, 'Can delete modniv', 26, 'delete_modniv'),
(104, 'Can view modniv', 26, 'view_modniv');

-- --------------------------------------------------------

--
-- Structure de la table `bloc_bloc`
--

CREATE TABLE `bloc_bloc` (
  `id_bloc` int(11) NOT NULL,
  `nom_bloc` varchar(255) NOT NULL,
  `nbretage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `bloc_bloc`
--

INSERT INTO `bloc_bloc` (`id_bloc`, `nom_bloc`, `nbretage`) VALUES
(1, 'BBB', 4);

-- --------------------------------------------------------

--
-- Structure de la table `classe_classe`
--

CREATE TABLE `classe_classe` (
  `id_classe` int(11) NOT NULL,
  `NbEtudiantClasse` int(11) NOT NULL,
  `libelleClasse` varchar(255) NOT NULL,
  `id_niveau_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `classe_classe`
--

INSERT INTO `classe_classe` (`id_classe`, `NbEtudiantClasse`, `libelleClasse`, `id_niveau_id`) VALUES
(1, 31, 'CLASSE', 1);

-- --------------------------------------------------------

--
-- Structure de la table `contrainte_contrainte`
--

CREATE TABLE `contrainte_contrainte` (
  `id_contrainte` int(11) NOT NULL,
  `nom_contrainte` varchar(255) NOT NULL,
  `type_contrainte` varchar(255) NOT NULL,
  `date_debut_contrainte` date NOT NULL,
  `date_fin_contrainte` date NOT NULL,
  `status_contrainte` varchar(255) NOT NULL,
  `id_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contrainte_contrainte`
--

INSERT INTO `contrainte_contrainte` (`id_contrainte`, `nom_contrainte`, `type_contrainte`, `date_debut_contrainte`, `date_fin_contrainte`, `status_contrainte`, `id_user_id`) VALUES
(3, 'maladie', 'uregnt', '2024-08-29', '2024-08-29', '0', 10);

-- --------------------------------------------------------

--
-- Structure de la table `departement_departement`
--

CREATE TABLE `departement_departement` (
  `id_departement` int(11) NOT NULL,
  `nom_departement` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `departement_departement`
--

INSERT INTO `departement_departement` (`id_departement`, `nom_departement`) VALUES
(1, 'depPP');

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(7, 'Bloc', 'bloc'),
(12, 'Classe', 'classe'),
(4, 'contenttypes', 'contenttype'),
(15, 'Contrainte', 'contrainte'),
(14, 'Departement', 'departement'),
(18, 'django_otp', 'staticdevice'),
(19, 'django_otp', 'statictoken'),
(21, 'django_otp', 'totpdevice'),
(8, 'Examen', 'examen'),
(26, 'modniv', 'modniv'),
(17, 'Module', 'module'),
(25, 'Module_niveau', 'module_niveau'),
(11, 'Niveau', 'niveau'),
(22, 'otp_static', 'staticdevice'),
(23, 'otp_static', 'statictoken'),
(20, 'otp_totp', 'totpdevice'),
(9, 'Salle', 'salle'),
(24, 'Salle_examen', 'salle_examen'),
(10, 'Session', 'session'),
(5, 'sessions', 'session'),
(16, 'Surveillance', 'surveillance'),
(13, 'Unite', 'unite'),
(6, 'Users', 'appuser');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'Bloc', '0001_initial', '2024-08-13 18:02:46.106236'),
(2, 'Niveau', '0001_initial', '2024-08-13 18:02:46.134971'),
(3, 'Classe', '0001_initial', '2024-08-13 18:02:46.177185'),
(4, 'Departement', '0001_initial', '2024-08-13 18:02:46.185648'),
(5, 'Unite', '0001_initial', '2024-08-13 18:02:46.225241'),
(6, 'Session', '0001_initial', '2024-08-13 18:02:46.233194'),
(7, 'Module', '0001_initial', '2024-08-13 18:02:46.277639'),
(8, 'Examen', '0001_initial', '2024-08-13 18:02:46.357736'),
(9, 'Salle', '0001_initial', '2024-08-13 18:02:46.440277'),
(10, 'Surveillance', '0001_initial', '2024-08-13 18:02:46.486857'),
(11, 'Users', '0001_initial', '2024-08-13 18:02:46.575995'),
(12, 'Contrainte', '0001_initial', '2024-08-13 18:02:46.618698'),
(13, 'Contrainte', '0002_remove_contrainte_id_user', '2024-08-13 18:02:47.146184'),
(14, 'Niveau', '0002_alter_niveau_specialite', '2024-08-13 18:02:47.208416'),
(15, 'contenttypes', '0001_initial', '2024-08-13 18:02:47.238649'),
(16, 'contenttypes', '0002_remove_content_type_name', '2024-08-13 18:02:47.294556'),
(17, 'auth', '0001_initial', '2024-08-13 18:02:47.469061'),
(18, 'auth', '0002_alter_permission_name_max_length', '2024-08-13 18:02:47.508928'),
(19, 'auth', '0003_alter_user_email_max_length', '2024-08-13 18:02:47.515350'),
(20, 'auth', '0004_alter_user_username_opts', '2024-08-13 18:02:47.522847'),
(21, 'auth', '0005_alter_user_last_login_null', '2024-08-13 18:02:47.531334'),
(22, 'auth', '0006_require_contenttypes_0002', '2024-08-13 18:02:47.533573'),
(23, 'auth', '0007_alter_validators_add_error_messages', '2024-08-13 18:02:47.538330'),
(24, 'auth', '0008_alter_user_username_max_length', '2024-08-13 18:02:47.543881'),
(25, 'auth', '0009_alter_user_last_name_max_length', '2024-08-13 18:02:47.550136'),
(26, 'auth', '0010_alter_group_name_max_length', '2024-08-13 18:02:47.561739'),
(27, 'auth', '0011_update_proxy_permissions', '2024-08-13 18:02:47.580273'),
(28, 'auth', '0012_alter_user_first_name_max_length', '2024-08-13 18:02:47.588072'),
(29, 'Users', '0002_users_image_user_alter_users_roleres', '2024-08-13 18:02:47.648942'),
(30, 'Users', '0003_appuser_delete_users', '2024-08-13 18:02:47.854408'),
(31, 'admin', '0001_initial', '2024-08-13 18:02:47.925954'),
(32, 'admin', '0002_logentry_remove_auto_add', '2024-08-13 18:02:47.933973'),
(33, 'admin', '0003_logentry_add_action_flag_choices', '2024-08-13 18:02:47.944295'),
(34, 'otp_totp', '0001_initial', '2024-08-13 18:02:48.006018'),
(35, 'otp_totp', '0002_auto_20190420_0723', '2024-08-13 18:02:48.035595'),
(36, 'otp_totp', '0003_add_timestamps', '2024-08-13 18:02:48.059221'),
(37, 'sessions', '0001_initial', '2024-08-13 18:02:48.111767'),
(38, 'two_factor', '0001_initial', '2024-08-13 18:02:48.113845'),
(39, 'two_factor', '0002_auto_20150110_0810', '2024-08-13 18:02:48.115522'),
(40, 'two_factor', '0003_auto_20150817_1733', '2024-08-13 18:02:48.116756'),
(41, 'two_factor', '0004_auto_20160205_1827', '2024-08-13 18:02:48.118702'),
(42, 'two_factor', '0005_auto_20160224_0450', '2024-08-13 18:02:48.119973'),
(43, 'two_factor', '0006_phonedevice_key_default', '2024-08-13 18:02:48.120975'),
(44, 'two_factor', '0007_auto_20201201_1019', '2024-08-13 18:02:48.121972'),
(45, 'two_factor', '0008_delete_phonedevice', '2024-08-13 18:02:48.123972'),
(46, 'two_factor', '0001_squashed_0008_delete_phonedevice', '2024-08-13 18:02:48.126313'),
(47, 'Users', '0004_appuser_id_surveillance_appuser_id_unite_and_more', '2024-08-13 18:12:33.103948'),
(48, 'Contrainte', '0003_contrainte_id_user', '2024-08-25 22:50:26.157942'),
(49, 'otp_static', '0001_initial', '2024-08-27 14:02:46.956467'),
(50, 'otp_static', '0002_throttling', '2024-08-27 14:02:46.988306'),
(51, 'otp_static', '0003_add_timestamps', '2024-08-27 14:02:47.018491'),
(52, 'django_otp', '0001_initial', '2024-08-28 08:36:12.971532'),
(53, 'Contrainte', '0004_alter_contrainte_id_user', '2024-08-29 10:05:29.742319'),
(54, 'Contrainte', '0005_alter_contrainte_id_user', '2024-08-29 14:58:26.629361'),
(55, 'Users', '0005_appuser_quota', '2024-08-29 15:45:09.076674'),
(56, 'Users', '0006_alter_appuser_id_surveillance_alter_appuser_id_unite', '2024-08-29 15:51:32.932464'),
(57, 'Salle', '0002_alter_salle_id_examen', '2024-08-29 15:59:52.060336'),
(58, 'Salle', '0003_alter_salle_id_examen', '2024-08-29 16:08:10.403429'),
(59, 'Users', '0007_alter_appuser_id_surveillance_alter_appuser_id_unite', '2024-08-29 16:23:19.964866'),
(60, 'Module_niveau', '0001_initial', '2024-08-30 13:17:20.234074'),
(61, 'Salle_examen', '0001_initial', '2024-08-30 13:17:20.309148'),
(62, 'Surveillance', '0002_surveillance_user_id', '2024-08-30 13:17:20.375616'),
(63, 'Users', '0008_remove_appuser_id_surveillance_and_more', '2024-08-30 13:17:21.037466'),
(64, 'modniv', '0001_initial', '2024-09-03 21:47:13.255989'),
(65, 'modniv', '0002_modniv_delete_module_niveau', '2024-09-03 21:47:13.330688');

-- --------------------------------------------------------

--
-- Structure de la table `django_otp_staticdevice`
--

CREATE TABLE `django_otp_staticdevice` (
  `id` bigint(20) NOT NULL,
  `name` varchar(64) NOT NULL,
  `confirmed` tinyint(1) NOT NULL,
  `throttling_failure_timestamp` datetime(6) DEFAULT NULL,
  `throttling_failure_count` int(10) UNSIGNED NOT NULL CHECK (`throttling_failure_count` >= 0),
  `created_at` datetime(6) DEFAULT NULL,
  `last_used_at` datetime(6) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_otp_statictoken`
--

CREATE TABLE `django_otp_statictoken` (
  `id` bigint(20) NOT NULL,
  `token` varchar(16) NOT NULL,
  `device_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('2y0lkukx730wlkxlj25r4uba0hxup97c', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXQR:3cx_qOJNuBXOvnCjvNZkfAGmN-0fExoxGvv3mnPMPak', '2024-08-29 10:09:47.716722'),
('2yxumx5dv5yrusi8tg19mdqg5jncq195', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXzW:_5JLXUVtCAflEjmdxNVNE8y1-EJgYc_BlKKtpZMDaN8', '2024-08-29 10:46:02.126449'),
('3comd74e6zhogd5uxrlmh4kj4gtjjfhu', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seH4w:9S-cMizRSgbERRpCqR7jtVfK5uTNkGTSqNcS-t9BwjA', '2024-08-28 16:42:30.266629'),
('3eq11agysqon96n2v4zqt6arc3o3bemu', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYiY:dY7pzYzeLwFG_yA3xYueAt1ujB-SWwoACXaHilojFPA', '2024-08-29 11:32:34.338543'),
('47r23dnntv6qeajl1kmmfy1nsx6v4vwq', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seHRe:-ASYrIJITHiRxljCZddtbXiqF8u56RSPIGwDPq5T5bo', '2024-08-28 17:05:58.569380'),
('49kqlkzctpu1ls0wx1xurrc61mra3f0l', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1sdx4y:GA_idA2HmtBuqCOiq-jjjrtbs7dJ_xRF6pRhqbz2F_w', '2024-08-27 19:21:12.786076'),
('4bngvp30cnwkuyo5r3m24ygwlsay7z69', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seZK9:MJBMb9ngClqYS48IP48Vo9QicF2nQ0ro60LMc9PP5KU', '2024-08-29 12:11:25.336364'),
('6fsho7f00ijspapm164bvy05o2fm7ti6', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYjk:NKBA4-hnjmuGNbe0X3_uFNPFAz5-ApUctayYHd2xrLc', '2024-08-29 11:33:48.360322'),
('71mwxmhmffwzjasedkrhe8g3bsxyfht6', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seHsK:mZnFn_My8p9X7IYql_v0YqVinNxu3SSCd8rLUByWuwU', '2024-08-28 17:33:32.194925'),
('ag73vlvdt25d1733b86en30wh4vkeh06', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seGvc:9RpT7Ys8F3JusfokybWbjvli5SqcxPghT9rabnQwGbk', '2024-08-28 16:32:52.502148'),
('bqqg43rmdyh0rtl6np8k2qjmosllywd1', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1sdx5h:YTJBgA1xhY6WgAlTc2TcIbYFOJv-yqzRCuvGMgqvUgQ', '2024-08-27 19:21:57.043834'),
('cqepe8mzmzoetxuwct603tkhd02xwen8', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYbP:qs0_p0kgTRl3Mhlz6_gShbrvzSSSfyTc9FNM2IMEXkM', '2024-08-29 11:25:11.945343'),
('d6zwb94mov58y7mxt471vlu6kam6nj3c', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXw3:xYxZ3p63DsNlt85d_HRevyl1wbQjq9mrakdX87oyRFo', '2024-08-29 10:42:27.367089'),
('drr3db6fnay41ja9opcyydczij5hlt2u', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seHTo:n9C0tFG8EdImBCYRqHLutDSBuTreZ8kpl5l4vmq9LoI', '2024-08-28 17:08:12.281152'),
('eyld70un2rv3tsi5xk5awj0kx4mruenf', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYY6:x-YcwFk6xYX3qqbk0Vrn1MLW2lAZQnqRj3_WQO4YBZg', '2024-08-29 11:21:46.353134'),
('f1vcwg45i1o1gtg8k8y5at6he6ciuvrt', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXy6:DgvYhMnNev4sCyXyhdRb_UqVHdqalHVC_LH_KvxDRGY', '2024-08-29 10:44:34.019556'),
('fj916qduzsdscv8nwnn1rs8dqxjqgbx4', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXyq:CLdQQ5lBnWuYkJRv-StvujXOWCTl9Kj9K2l8Y0CHJOI', '2024-08-29 10:45:20.139779'),
('ggymtzc6chk2kcfdmdszysve6l0gtaqw', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seHVg:m6HtoEWOFozsUPm6gGL3GcbXbBgEeJA49NaGwo8cWPM', '2024-08-28 17:10:08.667310'),
('glfo50r8yhcr2osrr0dhd6hrg46t5eai', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYyG:35apoBjF7oAnsZ4TZYpuzHb6EfR2wEqHrUtTkWeM_SY', '2024-08-29 11:48:48.283045'),
('h5hryuiv6bddz9grnrom79pl5znvebjb', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYaG:seCpWPhls1To-bm80rf7aJRzyncXXv2pMW7wIOwovY0', '2024-08-29 11:24:00.635084'),
('hbbztxvow93yn664065hjv3typl1bbn9', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXdc:TLqai7g_VHFzsD60Pv4oUxn7UOjtwB8-5FojW6iA4HA', '2024-08-29 10:23:24.117842'),
('hhzqnla9gei66ycmz16t7r77ka6783u0', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seY0f:_MSNm3pV-U3X5ClTZop6y_qM0VdLKf2cw4DqFpn6QKk', '2024-08-29 10:47:13.236814'),
('ic9qoerdfvhyx74n479tz4qzzi4599gm', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seHtC:B2A6kHpYdE3iQ6lmvHF4yvO6YAB1vb8fYkjyXGrHnGk', '2024-08-28 17:34:26.966605'),
('iwpunqvwueyxzcxl6lrlmjnqwb0dsl9r', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seX9G:91xC0ouDhMk_e3Z2YJLmuPMfyinLKsKsrMrrpx-XTq8', '2024-08-29 09:52:02.281126'),
('j1iyqdxgnk2kxmo1ymb961ory00i08jt', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seY02:nvrisSahRAFkKNIPKl2DASjUrVK_6g7QzoAjl4VLpiY', '2024-08-29 10:46:34.404238'),
('k2ldf07fe8nlfdbu2vkslm4b3vwy43tf', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1sdx7k:ymLG8VtHErfP8i0Uw8-1VnJXiZKQGNPfFPCzt7q0YKA', '2024-08-27 19:24:04.102944'),
('klnk34fmintbm5q6rp8o7bhwru24d75u', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1sdx1g:HALY0XH-UK7xqJBRUa3-tlFUYqFnOeaVE1wPRcFvDsQ', '2024-08-27 19:17:48.712943'),
('l4wuuckgowa0f8s6pcbcur9mk33dhbul', '.eJxVjEEKwyAQAP_iuYiiG7XH3vsG2XWXmrZEiMkp9O9FyKG9zgxzqIz7VvPeZc0zq6uy6vLLCMtLliH4icuj6dKWbZ1Jj0Sftut7Y3nfzvZvULHXsQVHRMZYAoIIbJ0P6DiCn0JAKWwCQPSUYizJRisoMGFCk4wwF6s-X8wwN54:1slcip:lrJ6TaV6D4bgpvmQtfMk8kVC3HjX5s4mnIRZffzJ10g', '2024-09-17 23:14:03.272697'),
('nxna6ccmbq84nwneq9p5r3an1zpprcc4', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYKF:9Vc-rWS33eWaomk4tYibyHqm88JlG8MjB9j8QMw_CAw', '2024-08-29 11:07:27.360713'),
('o24673bdzbczgkfmxmdq0vxi8r8bhs0x', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1sdx4L:J9iGgSKLR1S3xomlOimfa8ZV6R5cWOkzD1azCqIAoso', '2024-08-27 19:20:33.691626'),
('qbh5w81269n465svirz1ds8p6rdfhizw', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seY3Y:zlnZOM6X5jiJMWRSU5sLAGneDebowe3MPci-WoMe_NM', '2024-08-29 10:50:12.070557'),
('qjub28jum106ralq4i1fgxljl894e34j', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seH6h:iLPyawCb3w_18Tv7GXt55nvBT9MT9k6MMRZ18RbYL8I', '2024-08-28 16:44:19.531072'),
('rn7injccgbo54gpp5lw7ydoji3reienh', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXCO:O-SWV99YNbl5O0NX4YuWqFVeRGX0g_QhTh-lQvin-CQ', '2024-08-29 09:55:16.290329'),
('six247dnfsv5oxtatys1l08op32j3w31', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYhg:Yhz2FBUvJlz23bBhjLE45cgIXRV1bTT2hPItpcWnO_w', '2024-08-29 11:31:40.259120'),
('ux09c66530vah8zx6pddxfzqod11syru', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seHsz:jTeEC19tnoHRUH9OtVIonUxa7P0-wlrqMmozeNkykJs', '2024-08-28 17:34:13.473612'),
('w5qdii6e5hb8ju7smhwflymhilgu4y1c', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seHXp:52sQtpB8vaVyDAI99q5AzYOayReF9ABOJ0Notnni0I8', '2024-08-28 17:12:21.455813'),
('woj6cm5nerk76u6r2z7cwsfsufuwcvye', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXvN:sowbKXRiAHLMpHiy5ZlwRtOu2zER3OLMnPocsdBZ_eM', '2024-08-29 10:41:45.296883'),
('wzqoc0k1zies6u7dofc2n6ib7gm9y4xr', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXQ5:DeYxdmOKHAgrRn33_athOSrQJ3GrAGWODiftSyFn4-U', '2024-08-29 10:09:25.511452'),
('xa0dmw5eqqbp5ru6oi79iv1p500n8e1f', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1sdxBS:TBQV9BmPRcb-iUcjr6hQyft3j-24HAfFmGcvSt29v_U', '2024-08-27 19:27:54.647800'),
('xh10kpqljl8wvp1yvuu6hxf86mo10ki3', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYkR:l_8ygaWrC0ZNwN7EiCyO6WOXFyPFBJTC2QULrAfkk6Q', '2024-08-29 11:34:31.049500'),
('xj0j4l1f4rmdxbndalepz0dnj2g0026m', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seXCe:prI7W51E7MSNJePyWbslp0yvxXw-Q6iTbsYhfkCc-Io', '2024-08-29 09:55:32.263984'),
('xv2hw83ivfe4ntmcviq0f2f88we1kipm', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seYRf:KaQZel5stU_cQrrpv9OgEc88slWyO-SO64mTbzH6x78', '2024-08-29 11:15:07.756735'),
('yhtb2rr4y0tfcw7tfsxvfwj8bmya5mos', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1seY2x:T0hr40DXB7jivVJZhSWZlwpEsSyEVTzitgpXWIoF8KY', '2024-08-29 10:49:35.433859'),
('z8kj6obcwprmd2bg38owjcgkpo7fibrq', '.eJxVjDsOwjAQBe_iGln-46Wkzxms9WdxANlSnFSIu0OkFNC-mXkvFnBba9hGWcKc2YVJdvrdIqZHaTvId2y3zlNv6zJHviv8oINPPZfn9XD_DiqO-q3JO28sISlMQgEqQTZDjB6MiFQUgPNaQ_FJ6rNVRFIaAwWSEA6tyez9AeL9N4g:1sdxH9:TDcaJ_aZuHE8c4cLmuMYEtwK1zRGsUoGGOneYYHt5jk', '2024-08-27 19:33:47.856757');

-- --------------------------------------------------------

--
-- Structure de la table `examen_examen`
--

CREATE TABLE `examen_examen` (
  `id_examen` int(11) NOT NULL,
  `nom_examen` varchar(255) NOT NULL,
  `date_examen` date NOT NULL,
  `duree_examen` int(11) NOT NULL,
  `type_examen` varchar(255) NOT NULL,
  `id_module_id` int(11) NOT NULL,
  `id_session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `modniv_modniv`
--

CREATE TABLE `modniv_modniv` (
  `idmn` int(11) NOT NULL,
  `id_module_id` int(11) NOT NULL,
  `id_niveau_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `module_module`
--

CREATE TABLE `module_module` (
  `id_module` int(11) NOT NULL,
  `nom_module` varchar(255) NOT NULL,
  `duree_module` int(11) NOT NULL,
  `id_niveau_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `module_module`
--

INSERT INTO `module_module` (`id_module`, `nom_module`, `duree_module`, `id_niveau_id`) VALUES
(5, 'GL', 24, 1);

-- --------------------------------------------------------

--
-- Structure de la table `module_niveau_module_niveau`
--

CREATE TABLE `module_niveau_module_niveau` (
  `id_module_id` int(11) NOT NULL,
  `id_niveau_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `niveau_niveau`
--

CREATE TABLE `niveau_niveau` (
  `id_niveau` int(11) NOT NULL,
  `libelleNiv` varchar(255) NOT NULL,
  `nbclasseNiv` int(11) NOT NULL,
  `specialite` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `niveau_niveau`
--

INSERT INTO `niveau_niveau` (`id_niveau`, `libelleNiv`, `nbclasseNiv`, `specialite`) VALUES
(1, 'NIV', 30, 'B'),
(2, '4', 40, 'GAMIX');

-- --------------------------------------------------------

--
-- Structure de la table `otp_static_staticdevice`
--

CREATE TABLE `otp_static_staticdevice` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `confirmed` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `throttling_failure_count` int(10) UNSIGNED NOT NULL CHECK (`throttling_failure_count` >= 0),
  `throttling_failure_timestamp` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `last_used_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `otp_static_statictoken`
--

CREATE TABLE `otp_static_statictoken` (
  `id` int(11) NOT NULL,
  `token` varchar(16) NOT NULL,
  `device_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `salle_examen_salle_examen`
--

CREATE TABLE `salle_examen_salle_examen` (
  `id_salle_id` int(11) NOT NULL,
  `date_salle` date NOT NULL,
  `id_examen_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `salle_salle`
--

CREATE TABLE `salle_salle` (
  `id_salle` int(11) NOT NULL,
  `nom_salle` varchar(255) NOT NULL,
  `capacite` int(11) NOT NULL,
  `dispo` tinyint(1) NOT NULL,
  `id_bloc_id` int(11) NOT NULL,
  `id_examen_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `salle_salle`
--

INSERT INTO `salle_salle` (`id_salle`, `nom_salle`, `capacite`, `dispo`, `id_bloc_id`, `id_examen_id`) VALUES
(5, 'a', 66, 1, 1, NULL),
(6, 'A1', 11, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `session_session`
--

CREATE TABLE `session_session` (
  `id_session` int(11) NOT NULL,
  `nom_session` varchar(255) NOT NULL,
  `type_session` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `session_session`
--

INSERT INTO `session_session` (`id_session`, `nom_session`, `type_session`) VALUES
(1, 'SES', 'TYPE'),
(2, 'Me', 'Me'),
(3, 'sess', 'ratrapage'),
(5, 'sessionn', 'decembre'),
(7, 'A', 'decembre'),
(8, 'sess', 'principale');

-- --------------------------------------------------------

--
-- Structure de la table `surveillance_surveillance`
--

CREATE TABLE `surveillance_surveillance` (
  `id_surveillance` int(11) NOT NULL,
  `date_surveillance` date NOT NULL,
  `id_salle_id` int(11) NOT NULL,
  `user_id_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `unite_unite`
--

CREATE TABLE `unite_unite` (
  `id_unite` int(11) NOT NULL,
  `nom_unite` varchar(255) NOT NULL,
  `id_departement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `unite_unite`
--

INSERT INTO `unite_unite` (`id_unite`, `nom_unite`, `id_departement_id`) VALUES
(1, 'unité', 1),
(3, 'gg', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users_appuser`
--

CREATE TABLE `users_appuser` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `cin` varchar(20) NOT NULL,
  `role` varchar(50) NOT NULL,
  `identifiant` varchar(50) DEFAULT NULL,
  `roleRes` varchar(50) DEFAULT NULL,
  `id_unite_id` int(11) DEFAULT NULL,
  `image_user` varchar(100) DEFAULT NULL,
  `quota` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users_appuser`
--

INSERT INTO `users_appuser` (`password`, `last_login`, `is_superuser`, `user_id`, `email`, `username`, `cin`, `role`, `identifiant`, `roleRes`, `id_unite_id`, `image_user`, `quota`) VALUES
('pbkdf2_sha256$600000$TDXy8nlzjJJvYQA3uw65Fi$In2iObtwlJViqHs71y4tSSBiiFB1hMeMFRFK6hfohLI=', '2024-09-03 23:14:03.270649', 0, 1, 'm@gmail.com', 'Yosr', '1155669', 'employe', NULL, NULL, NULL, 'user_images/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht_w5IXjtC.jpg', NULL),
('pbkdf2_sha256$720000$VemsZ2csOA9sQuRa7hBo5o$cO5ou+x24niJM3tG/h0Fdx7XaX8zqqE9AWF9NxIVTrI=', NULL, 0, 10, 'y@gmail.com', 'mayssa', '23456', 'enseignant', 'DFGHJ', 'cup', 1, 'user_images/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht_MVwOspN.jpg', '10'),
('pbkdf2_sha256$600000$mBS9VhvgO6JrdI5i0ijVnS$SKnDOrnDVQpPevD7YhKKWEruc6yzwkTBuBfSuKmvyig=', NULL, 0, 15, 'amel@gmail.com', 'amel', '1155669', 'enseignant', 'DFGHJ', 'ro', 1, 'user_images/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht.jpg', '10');

-- --------------------------------------------------------

--
-- Structure de la table `users_appuser_groups`
--

CREATE TABLE `users_appuser_groups` (
  `id` bigint(20) NOT NULL,
  `appuser_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users_appuser_user_permissions`
--

CREATE TABLE `users_appuser_user_permissions` (
  `id` bigint(20) NOT NULL,
  `appuser_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Index pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Index pour la table `bloc_bloc`
--
ALTER TABLE `bloc_bloc`
  ADD PRIMARY KEY (`id_bloc`);

--
-- Index pour la table `classe_classe`
--
ALTER TABLE `classe_classe`
  ADD PRIMARY KEY (`id_classe`),
  ADD KEY `Classe_classe_id_niveau_id_601ad4da_fk_Niveau_niveau_id_niveau` (`id_niveau_id`);

--
-- Index pour la table `contrainte_contrainte`
--
ALTER TABLE `contrainte_contrainte`
  ADD PRIMARY KEY (`id_contrainte`),
  ADD KEY `Contrainte_contraint_id_user_id_3af0f223_fk_Users_app` (`id_user_id`);

--
-- Index pour la table `departement_departement`
--
ALTER TABLE `departement_departement`
  ADD PRIMARY KEY (`id_departement`);

--
-- Index pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_Users_appuser_user_id` (`user_id`);

--
-- Index pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Index pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `django_otp_staticdevice`
--
ALTER TABLE `django_otp_staticdevice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_otp_staticdev_user_id_9631127e_fk_Users_app` (`user_id`);

--
-- Index pour la table `django_otp_statictoken`
--
ALTER TABLE `django_otp_statictoken`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_otp_statictok_device_id_af11c983_fk_django_ot` (`device_id`),
  ADD KEY `django_otp_statictoken_token_7f5dc543` (`token`);

--
-- Index pour la table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Index pour la table `examen_examen`
--
ALTER TABLE `examen_examen`
  ADD PRIMARY KEY (`id_examen`),
  ADD KEY `Examen_examen_id_module_id_9e5de41b_fk_Module_module_id_module` (`id_module_id`),
  ADD KEY `Examen_examen_id_session_id_66a2d6f1_fk_Session_s` (`id_session_id`);

--
-- Index pour la table `modniv_modniv`
--
ALTER TABLE `modniv_modniv`
  ADD PRIMARY KEY (`idmn`),
  ADD KEY `modniv_modniv_id_module_id_d05d0577_fk_Module_module_id_module` (`id_module_id`),
  ADD KEY `modniv_modniv_id_niveau_id_82adf302_fk_Niveau_niveau_id_niveau` (`id_niveau_id`);

--
-- Index pour la table `module_module`
--
ALTER TABLE `module_module`
  ADD PRIMARY KEY (`id_module`),
  ADD KEY `Module_module_id_niveau_id_eca73f64_fk_Niveau_niveau_id_niveau` (`id_niveau_id`);

--
-- Index pour la table `module_niveau_module_niveau`
--
ALTER TABLE `module_niveau_module_niveau`
  ADD PRIMARY KEY (`id_module_id`),
  ADD KEY `Module_niveau_module_id_niveau_id_abcb88fd_fk_Niveau_ni` (`id_niveau_id`);

--
-- Index pour la table `niveau_niveau`
--
ALTER TABLE `niveau_niveau`
  ADD PRIMARY KEY (`id_niveau`);

--
-- Index pour la table `otp_static_staticdevice`
--
ALTER TABLE `otp_static_staticdevice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `otp_static_staticdev_user_id_7f9cff2b_fk_Users_app` (`user_id`);

--
-- Index pour la table `otp_static_statictoken`
--
ALTER TABLE `otp_static_statictoken`
  ADD PRIMARY KEY (`id`),
  ADD KEY `otp_static_statictok_device_id_74b7c7d1_fk_otp_stati` (`device_id`),
  ADD KEY `otp_static_statictoken_token_d0a51866` (`token`);

--
-- Index pour la table `salle_examen_salle_examen`
--
ALTER TABLE `salle_examen_salle_examen`
  ADD PRIMARY KEY (`id_salle_id`),
  ADD KEY `Salle_examen_salle_e_id_examen_id_661875b5_fk_Examen_ex` (`id_examen_id`);

--
-- Index pour la table `salle_salle`
--
ALTER TABLE `salle_salle`
  ADD PRIMARY KEY (`id_salle`),
  ADD KEY `Salle_salle_id_bloc_id_41cac981_fk_Bloc_bloc_id_bloc` (`id_bloc_id`),
  ADD KEY `Salle_salle_id_examen_id_710dd001_fk_Examen_examen_id_examen` (`id_examen_id`);

--
-- Index pour la table `session_session`
--
ALTER TABLE `session_session`
  ADD PRIMARY KEY (`id_session`);

--
-- Index pour la table `surveillance_surveillance`
--
ALTER TABLE `surveillance_surveillance`
  ADD PRIMARY KEY (`id_surveillance`),
  ADD KEY `Surveillance_surveil_id_salle_id_14bc7bc4_fk_Salle_sal` (`id_salle_id`),
  ADD KEY `Surveillance_surveil_user_id_id_aaf61dfb_fk_Users_app` (`user_id_id`);

--
-- Index pour la table `unite_unite`
--
ALTER TABLE `unite_unite`
  ADD PRIMARY KEY (`id_unite`),
  ADD KEY `Unite_unite_id_departement_id_d7d7d2b1_fk_Departeme` (`id_departement_id`);

--
-- Index pour la table `users_appuser`
--
ALTER TABLE `users_appuser`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `Users_appuser_id_unite_id_c1365077_fk_Unite_unite_id_unite` (`id_unite_id`);

--
-- Index pour la table `users_appuser_groups`
--
ALTER TABLE `users_appuser_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_appuser_groups_appuser_id_group_id_b3b8e61e_uniq` (`appuser_id`,`group_id`),
  ADD KEY `Users_appuser_groups_group_id_adf97e6f_fk_auth_group_id` (`group_id`);

--
-- Index pour la table `users_appuser_user_permissions`
--
ALTER TABLE `users_appuser_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_appuser_user_permi_appuser_id_permission_id_492f7b0e_uniq` (`appuser_id`,`permission_id`),
  ADD KEY `Users_appuser_user_p_permission_id_c7404084_fk_auth_perm` (`permission_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT pour la table `bloc_bloc`
--
ALTER TABLE `bloc_bloc`
  MODIFY `id_bloc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `classe_classe`
--
ALTER TABLE `classe_classe`
  MODIFY `id_classe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `contrainte_contrainte`
--
ALTER TABLE `contrainte_contrainte`
  MODIFY `id_contrainte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `departement_departement`
--
ALTER TABLE `departement_departement`
  MODIFY `id_departement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT pour la table `django_otp_staticdevice`
--
ALTER TABLE `django_otp_staticdevice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `django_otp_statictoken`
--
ALTER TABLE `django_otp_statictoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `examen_examen`
--
ALTER TABLE `examen_examen`
  MODIFY `id_examen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `modniv_modniv`
--
ALTER TABLE `modniv_modniv`
  MODIFY `idmn` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `module_module`
--
ALTER TABLE `module_module`
  MODIFY `id_module` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `niveau_niveau`
--
ALTER TABLE `niveau_niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `otp_static_staticdevice`
--
ALTER TABLE `otp_static_staticdevice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `otp_static_statictoken`
--
ALTER TABLE `otp_static_statictoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `salle_salle`
--
ALTER TABLE `salle_salle`
  MODIFY `id_salle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `session_session`
--
ALTER TABLE `session_session`
  MODIFY `id_session` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `surveillance_surveillance`
--
ALTER TABLE `surveillance_surveillance`
  MODIFY `id_surveillance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `unite_unite`
--
ALTER TABLE `unite_unite`
  MODIFY `id_unite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users_appuser`
--
ALTER TABLE `users_appuser`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `users_appuser_groups`
--
ALTER TABLE `users_appuser_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users_appuser_user_permissions`
--
ALTER TABLE `users_appuser_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Contraintes pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Contraintes pour la table `classe_classe`
--
ALTER TABLE `classe_classe`
  ADD CONSTRAINT `Classe_classe_id_niveau_id_601ad4da_fk_Niveau_niveau_id_niveau` FOREIGN KEY (`id_niveau_id`) REFERENCES `niveau_niveau` (`id_niveau`);

--
-- Contraintes pour la table `contrainte_contrainte`
--
ALTER TABLE `contrainte_contrainte`
  ADD CONSTRAINT `Contrainte_contraint_id_user_id_3af0f223_fk_Users_app` FOREIGN KEY (`id_user_id`) REFERENCES `users_appuser` (`user_id`);

--
-- Contraintes pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_Users_appuser_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_appuser` (`user_id`);

--
-- Contraintes pour la table `django_otp_staticdevice`
--
ALTER TABLE `django_otp_staticdevice`
  ADD CONSTRAINT `django_otp_staticdev_user_id_9631127e_fk_Users_app` FOREIGN KEY (`user_id`) REFERENCES `users_appuser` (`user_id`);

--
-- Contraintes pour la table `django_otp_statictoken`
--
ALTER TABLE `django_otp_statictoken`
  ADD CONSTRAINT `django_otp_statictok_device_id_af11c983_fk_django_ot` FOREIGN KEY (`device_id`) REFERENCES `django_otp_staticdevice` (`id`);

--
-- Contraintes pour la table `examen_examen`
--
ALTER TABLE `examen_examen`
  ADD CONSTRAINT `Examen_examen_id_module_id_9e5de41b_fk_Module_module_id_module` FOREIGN KEY (`id_module_id`) REFERENCES `module_module` (`id_module`),
  ADD CONSTRAINT `Examen_examen_id_session_id_66a2d6f1_fk_Session_s` FOREIGN KEY (`id_session_id`) REFERENCES `session_session` (`id_session`);

--
-- Contraintes pour la table `modniv_modniv`
--
ALTER TABLE `modniv_modniv`
  ADD CONSTRAINT `modniv_modniv_id_module_id_d05d0577_fk_Module_module_id_module` FOREIGN KEY (`id_module_id`) REFERENCES `module_module` (`id_module`),
  ADD CONSTRAINT `modniv_modniv_id_niveau_id_82adf302_fk_Niveau_niveau_id_niveau` FOREIGN KEY (`id_niveau_id`) REFERENCES `niveau_niveau` (`id_niveau`);

--
-- Contraintes pour la table `module_module`
--
ALTER TABLE `module_module`
  ADD CONSTRAINT `Module_module_id_niveau_id_eca73f64_fk_Niveau_niveau_id_niveau` FOREIGN KEY (`id_niveau_id`) REFERENCES `niveau_niveau` (`id_niveau`);

--
-- Contraintes pour la table `module_niveau_module_niveau`
--
ALTER TABLE `module_niveau_module_niveau`
  ADD CONSTRAINT `Module_niveau_module_id_module_id_053188f9_fk_Module_mo` FOREIGN KEY (`id_module_id`) REFERENCES `module_module` (`id_module`),
  ADD CONSTRAINT `Module_niveau_module_id_niveau_id_abcb88fd_fk_Niveau_ni` FOREIGN KEY (`id_niveau_id`) REFERENCES `niveau_niveau` (`id_niveau`);

--
-- Contraintes pour la table `otp_static_staticdevice`
--
ALTER TABLE `otp_static_staticdevice`
  ADD CONSTRAINT `otp_static_staticdev_user_id_7f9cff2b_fk_Users_app` FOREIGN KEY (`user_id`) REFERENCES `users_appuser` (`user_id`);

--
-- Contraintes pour la table `otp_static_statictoken`
--
ALTER TABLE `otp_static_statictoken`
  ADD CONSTRAINT `otp_static_statictok_device_id_74b7c7d1_fk_otp_stati` FOREIGN KEY (`device_id`) REFERENCES `otp_static_staticdevice` (`id`);

--
-- Contraintes pour la table `salle_examen_salle_examen`
--
ALTER TABLE `salle_examen_salle_examen`
  ADD CONSTRAINT `Salle_examen_salle_e_id_examen_id_661875b5_fk_Examen_ex` FOREIGN KEY (`id_examen_id`) REFERENCES `examen_examen` (`id_examen`),
  ADD CONSTRAINT `Salle_examen_salle_e_id_salle_id_f1e30f0d_fk_Salle_sal` FOREIGN KEY (`id_salle_id`) REFERENCES `salle_salle` (`id_salle`);

--
-- Contraintes pour la table `salle_salle`
--
ALTER TABLE `salle_salle`
  ADD CONSTRAINT `Salle_salle_id_bloc_id_41cac981_fk_Bloc_bloc_id_bloc` FOREIGN KEY (`id_bloc_id`) REFERENCES `bloc_bloc` (`id_bloc`),
  ADD CONSTRAINT `Salle_salle_id_examen_id_710dd001_fk_Examen_examen_id_examen` FOREIGN KEY (`id_examen_id`) REFERENCES `examen_examen` (`id_examen`);

--
-- Contraintes pour la table `surveillance_surveillance`
--
ALTER TABLE `surveillance_surveillance`
  ADD CONSTRAINT `Surveillance_surveil_id_salle_id_14bc7bc4_fk_Salle_sal` FOREIGN KEY (`id_salle_id`) REFERENCES `salle_salle` (`id_salle`),
  ADD CONSTRAINT `Surveillance_surveil_user_id_id_aaf61dfb_fk_Users_app` FOREIGN KEY (`user_id_id`) REFERENCES `users_appuser` (`user_id`);

--
-- Contraintes pour la table `unite_unite`
--
ALTER TABLE `unite_unite`
  ADD CONSTRAINT `Unite_unite_id_departement_id_d7d7d2b1_fk_Departeme` FOREIGN KEY (`id_departement_id`) REFERENCES `departement_departement` (`id_departement`);

--
-- Contraintes pour la table `users_appuser`
--
ALTER TABLE `users_appuser`
  ADD CONSTRAINT `Users_appuser_id_unite_id_c1365077_fk_Unite_unite_id_unite` FOREIGN KEY (`id_unite_id`) REFERENCES `unite_unite` (`id_unite`);

--
-- Contraintes pour la table `users_appuser_groups`
--
ALTER TABLE `users_appuser_groups`
  ADD CONSTRAINT `Users_appuser_groups_appuser_id_3d1c10f2_fk_Users_app` FOREIGN KEY (`appuser_id`) REFERENCES `users_appuser` (`user_id`),
  ADD CONSTRAINT `Users_appuser_groups_group_id_adf97e6f_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Contraintes pour la table `users_appuser_user_permissions`
--
ALTER TABLE `users_appuser_user_permissions`
  ADD CONSTRAINT `Users_appuser_user_p_appuser_id_c090fcf0_fk_Users_app` FOREIGN KEY (`appuser_id`) REFERENCES `users_appuser` (`user_id`),
  ADD CONSTRAINT `Users_appuser_user_p_permission_id_c7404084_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
