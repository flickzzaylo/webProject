-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 19 2024 г., 06:52
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `online_store`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `auth_permission`
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
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add comment', 7, 'add_comment'),
(26, 'Can change comment', 7, 'change_comment'),
(27, 'Can delete comment', 7, 'delete_comment'),
(28, 'Can view comment', 7, 'view_comment'),
(29, 'Can add brand', 8, 'add_brand'),
(30, 'Can change brand', 8, 'change_brand'),
(31, 'Can delete brand', 8, 'delete_brand'),
(32, 'Can view brand', 8, 'view_brand'),
(33, 'Can add goods category', 9, 'add_goodscategory'),
(34, 'Can change goods category', 9, 'change_goodscategory'),
(35, 'Can delete goods category', 9, 'delete_goodscategory'),
(36, 'Can view goods category', 9, 'view_goodscategory'),
(37, 'Can add goods', 10, 'add_goods'),
(38, 'Can change goods', 10, 'change_goods'),
(39, 'Can delete goods', 10, 'delete_goods'),
(40, 'Can view goods', 10, 'view_goods'),
(41, 'Can add cart', 11, 'add_cart'),
(42, 'Can change cart', 11, 'change_cart'),
(43, 'Can delete cart', 11, 'delete_cart'),
(44, 'Can view cart', 11, 'view_cart'),
(45, 'Can add purchase', 12, 'add_purchase'),
(46, 'Can change purchase', 12, 'change_purchase'),
(47, 'Can delete purchase', 12, 'delete_purchase'),
(48, 'Can view purchase', 12, 'view_purchase'),
(49, 'Can add sale', 13, 'add_sale'),
(50, 'Can change sale', 13, 'change_sale'),
(51, 'Can delete sale', 13, 'delete_sale'),
(52, 'Can view sale', 13, 'view_sale'),
(53, 'Can add role', 14, 'add_role'),
(54, 'Can change role', 14, 'change_role'),
(55, 'Can delete role', 14, 'delete_role'),
(56, 'Can view role', 14, 'view_role'),
(57, 'Can add wallet', 15, 'add_wallet'),
(58, 'Can change wallet', 15, 'change_wallet'),
(59, 'Can delete wallet', 15, 'delete_wallet'),
(60, 'Can view wallet', 15, 'view_wallet'),
(61, 'Can add user', 16, 'add_user'),
(62, 'Can change user', 16, 'change_user'),
(63, 'Can delete user', 16, 'delete_user'),
(64, 'Can view user', 16, 'view_user');

-- --------------------------------------------------------

--
-- Структура таблицы `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$HopLKeTi52ydi1lPPR5jwf$WKchQyVl6P6dW6R4DfeFOobHyyXBBiSN3Vp1L7XgNyI=', '2024-04-26 00:54:52.142768', 1, 'admin', '', '', '', 1, 1, '2024-04-05 01:15:16.002125');

-- --------------------------------------------------------

--
-- Структура таблицы `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `comment_comment`
--

CREATE TABLE `comment_comment` (
  `id` bigint(20) NOT NULL,
  `message` longtext NOT NULL,
  `goods_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `django_admin_log`
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

--
-- Дамп данных таблицы `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2024-04-05 01:43:05.112686', '1', 'Role object (1)', 1, '[{\"added\": {}}]', 14, 1),
(2, '2024-04-05 01:43:25.444370', '1', 'Role object (1)', 2, '[]', 14, 1),
(3, '2024-04-05 01:43:31.908992', '2', 'Role object (2)', 1, '[{\"added\": {}}]', 14, 1),
(4, '2024-04-05 01:43:56.339619', '2', 'Role object (2)', 2, '[{\"changed\": {\"fields\": [\"Name\"]}}]', 14, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(7, 'comment', 'comment'),
(5, 'contenttypes', 'contenttype'),
(8, 'goods', 'brand'),
(10, 'goods', 'goods'),
(9, 'goods', 'goodscategory'),
(11, 'purchase', 'cart'),
(12, 'purchase', 'purchase'),
(13, 'sale', 'sale'),
(6, 'sessions', 'session'),
(14, 'user', 'role'),
(16, 'user', 'user'),
(15, 'user', 'wallet');

-- --------------------------------------------------------

--
-- Структура таблицы `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-04-05 01:14:50.694432'),
(2, 'auth', '0001_initial', '2024-04-05 01:14:51.403136'),
(3, 'admin', '0001_initial', '2024-04-05 01:14:51.592183'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-04-05 01:14:51.607191'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-04-05 01:14:51.623336'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-04-05 01:14:51.701586'),
(7, 'auth', '0002_alter_permission_name_max_length', '2024-04-05 01:14:51.779889'),
(8, 'auth', '0003_alter_user_email_max_length', '2024-04-05 01:14:51.795512'),
(9, 'auth', '0004_alter_user_username_opts', '2024-04-05 01:14:51.811830'),
(10, 'auth', '0005_alter_user_last_login_null', '2024-04-05 01:14:51.883308'),
(11, 'auth', '0006_require_contenttypes_0002', '2024-04-05 01:14:51.883308'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2024-04-05 01:14:51.898729'),
(13, 'auth', '0008_alter_user_username_max_length', '2024-04-05 01:14:51.914427'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2024-04-05 01:14:51.932512'),
(15, 'auth', '0010_alter_group_name_max_length', '2024-04-05 01:14:51.946065'),
(16, 'auth', '0011_update_proxy_permissions', '2024-04-05 01:14:51.961894'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2024-04-05 01:14:51.993570'),
(18, 'user', '0001_initial', '2024-04-05 01:14:52.198479'),
(19, 'goods', '0001_initial', '2024-04-05 01:14:52.424136'),
(20, 'comment', '0001_initial', '2024-04-05 01:14:52.582000'),
(21, 'purchase', '0001_initial', '2024-04-05 01:14:52.910141'),
(22, 'sale', '0001_initial', '2024-04-05 01:14:52.925921'),
(23, 'sessions', '0001_initial', '2024-04-05 01:14:52.989223'),
(24, 'purchase', '0002_rename_owner_cart_user_rename_buyer_purchase_user', '2024-04-05 02:26:57.959247');

-- --------------------------------------------------------

--
-- Структура таблицы `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('6cy2temwv4mbmgpg49fnt84dxyw1k4cw', '.eJxVjEEOwiAQRe_C2pACAwWX7j0DmYFBqoYmpV0Z765NutDtf-_9l4i4rTVunZc4ZXEWSpx-N8L04LaDfMd2m2Wa27pMJHdFHrTL65z5eTncv4OKvX5rstqhL5Y9oVGjLZm9CSEY8EGB1qwM2LFAJpsBBw4AFBw6sJT04J14fwDRnDcp:1rsYb9:V4JfslRY4gtYx7xcbfud_V4ues8SNiSgUCp0Mx9BBCk', '2024-04-19 01:42:31.185087'),
('ejlmkadeeed224270m9l9phevnk77fm7', '.eJxVjMsOwiAQRf-FtSGDw0Ncuu83kGGgUjWQlHZl_HfbpAvd3nPOfYtA61LC2vMcpiSuQonT7xaJn7nuID2o3pvkVpd5inJX5EG7HFrKr9vh_h0U6mWrGZSJXmnjICkdo2GnGV22HgEJiWy64BkS4AhsePO0ixnRWzajYS8-X8UeNzQ:1s09rY:PRIQYiDZA-EOeWQp1e74nVzJ9LprCZg7PhjGqNAWxJI', '2024-05-10 00:54:52.147951');

-- --------------------------------------------------------

--
-- Структура таблицы `goods_brand`
--

CREATE TABLE `goods_brand` (
  `id` bigint(20) NOT NULL,
  `name` longtext NOT NULL,
  `icon` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `goods_goods`
--

CREATE TABLE `goods_goods` (
  `id` bigint(20) NOT NULL,
  `name` longtext NOT NULL,
  `price` double NOT NULL,
  `rating` int(11) NOT NULL,
  `description` longtext NOT NULL,
  `image` longtext DEFAULT NULL,
  `brand_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `goods_goodscategory`
--

CREATE TABLE `goods_goodscategory` (
  `id` bigint(20) NOT NULL,
  `name` longtext NOT NULL,
  `icon` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `purchase_cart`
--

CREATE TABLE `purchase_cart` (
  `id` bigint(20) NOT NULL,
  `goods_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `purchase_purchase`
--

CREATE TABLE `purchase_purchase` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `goods_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `sale_sale`
--

CREATE TABLE `sale_sale` (
  `id` bigint(20) NOT NULL,
  `amount` int(11) NOT NULL,
  `begin_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `user_role`
--

CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL,
  `name` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user_role`
--

INSERT INTO `user_role` (`id`, `name`) VALUES
(1, 'Moderator'),
(2, 'Customer'),
(3, 'fdg');

-- --------------------------------------------------------

--
-- Структура таблицы `user_user`
--

CREATE TABLE `user_user` (
  `id` bigint(20) NOT NULL,
  `name` longtext NOT NULL,
  `login` longtext NOT NULL,
  `password` longtext NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `wallet_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `user_wallet`
--

CREATE TABLE `user_wallet` (
  `id` bigint(20) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Индексы таблицы `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Индексы таблицы `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Индексы таблицы `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Индексы таблицы `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Индексы таблицы `comment_comment`
--
ALTER TABLE `comment_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_comment_goods_id_b975aa59_fk_goods_goods_id` (`goods_id`),
  ADD KEY `comment_comment_user_id_6078e57b_fk_user_user_id` (`user_id`);

--
-- Индексы таблицы `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Индексы таблицы `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Индексы таблицы `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Индексы таблицы `goods_brand`
--
ALTER TABLE `goods_brand`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `goods_goods`
--
ALTER TABLE `goods_goods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goods_goods_brand_id_d27ef2d8_fk_goods_brand_id` (`brand_id`),
  ADD KEY `goods_goods_category_id_da3507dd_fk_goods_goodscategory_id` (`category_id`);

--
-- Индексы таблицы `goods_goodscategory`
--
ALTER TABLE `goods_goodscategory`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `purchase_cart`
--
ALTER TABLE `purchase_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_cart_goods_id_623ca5ed_fk_goods_goods_id` (`goods_id`),
  ADD KEY `purchase_cart_user_id_ade6d4db_fk_user_user_id` (`user_id`);

--
-- Индексы таблицы `purchase_purchase`
--
ALTER TABLE `purchase_purchase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_purchase_goods_id_597954a1_fk_goods_goods_id` (`goods_id`),
  ADD KEY `purchase_purchase_user_id_9ecb2dde_fk_user_user_id` (`user_id`);

--
-- Индексы таблицы `sale_sale`
--
ALTER TABLE `sale_sale`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_user`
--
ALTER TABLE `user_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wallet_id` (`wallet_id`),
  ADD KEY `user_user_role_id_aee6bf52_fk_user_role_id` (`role_id`);

--
-- Индексы таблицы `user_wallet`
--
ALTER TABLE `user_wallet`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT для таблицы `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `comment_comment`
--
ALTER TABLE `comment_comment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `goods_brand`
--
ALTER TABLE `goods_brand`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `goods_goods`
--
ALTER TABLE `goods_goods`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `goods_goodscategory`
--
ALTER TABLE `goods_goodscategory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `purchase_cart`
--
ALTER TABLE `purchase_cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `purchase_purchase`
--
ALTER TABLE `purchase_purchase`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `sale_sale`
--
ALTER TABLE `sale_sale`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `user_user`
--
ALTER TABLE `user_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `user_wallet`
--
ALTER TABLE `user_wallet`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Ограничения внешнего ключа таблицы `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Ограничения внешнего ключа таблицы `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Ограничения внешнего ключа таблицы `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Ограничения внешнего ключа таблицы `comment_comment`
--
ALTER TABLE `comment_comment`
  ADD CONSTRAINT `comment_comment_goods_id_b975aa59_fk_goods_goods_id` FOREIGN KEY (`goods_id`) REFERENCES `goods_goods` (`id`),
  ADD CONSTRAINT `comment_comment_user_id_6078e57b_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Ограничения внешнего ключа таблицы `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Ограничения внешнего ключа таблицы `goods_goods`
--
ALTER TABLE `goods_goods`
  ADD CONSTRAINT `goods_goods_brand_id_d27ef2d8_fk_goods_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `goods_brand` (`id`),
  ADD CONSTRAINT `goods_goods_category_id_da3507dd_fk_goods_goodscategory_id` FOREIGN KEY (`category_id`) REFERENCES `goods_goodscategory` (`id`);

--
-- Ограничения внешнего ключа таблицы `purchase_cart`
--
ALTER TABLE `purchase_cart`
  ADD CONSTRAINT `purchase_cart_goods_id_623ca5ed_fk_goods_goods_id` FOREIGN KEY (`goods_id`) REFERENCES `goods_goods` (`id`),
  ADD CONSTRAINT `purchase_cart_user_id_ade6d4db_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Ограничения внешнего ключа таблицы `purchase_purchase`
--
ALTER TABLE `purchase_purchase`
  ADD CONSTRAINT `purchase_purchase_goods_id_597954a1_fk_goods_goods_id` FOREIGN KEY (`goods_id`) REFERENCES `goods_goods` (`id`),
  ADD CONSTRAINT `purchase_purchase_user_id_9ecb2dde_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`);

--
-- Ограничения внешнего ключа таблицы `user_user`
--
ALTER TABLE `user_user`
  ADD CONSTRAINT `user_user_role_id_aee6bf52_fk_user_role_id` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`),
  ADD CONSTRAINT `user_user_wallet_id_16add087_fk_user_wallet_id` FOREIGN KEY (`wallet_id`) REFERENCES `user_wallet` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
