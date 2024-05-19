-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Окт 30 2023 г., 04:36
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `attestation_book`
--

-- --------------------------------------------------------

--
-- Структура таблицы `attestation_book`
--

CREATE TABLE `attestation_book` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `student_id` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `student_group_session_id` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `mark` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `theme` text DEFAULT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `discipline`
--

CREATE TABLE `discipline` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` text NOT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `report_type`
--

CREATE TABLE `report_type` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` text NOT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `sqlite_sequence`
--

CREATE TABLE `sqlite_sequence` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL COMMENT 'TRIAL',
  `seq` text DEFAULT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` text NOT NULL COMMENT 'TRIAL',
  `student_group_id` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `student_group`
--

CREATE TABLE `student_group` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` text NOT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `student_group_session`
--

CREATE TABLE `student_group_session` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `student_group_id` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `report_type_id` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `teacher_discipline_id` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `mark_date` text DEFAULT NULL COMMENT 'TRIAL',
  `semester` int(11) NOT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` int(11) NOT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `teacher_discipline`
--

CREATE TABLE `teacher_discipline` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `teacher_id` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `discipline_id` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `username` text NOT NULL COMMENT 'TRIAL',
  `password` text NOT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `attestation_book`
--
ALTER TABLE `attestation_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk__student_0` (`student_id`) USING BTREE,
  ADD KEY `fk__student_group_session_1` (`student_group_session_id`) USING BTREE;

--
-- Индексы таблицы `discipline`
--
ALTER TABLE `discipline`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `report_type`
--
ALTER TABLE `report_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sqlite_sequence`
--
ALTER TABLE `sqlite_sequence`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sqlite_sequence_student_group_0` (`student_group_id`) USING BTREE;

--
-- Индексы таблицы `student_group`
--
ALTER TABLE `student_group`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `student_group_session`
--
ALTER TABLE `student_group_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_student_group_report_type_0` (`report_type_id`) USING BTREE,
  ADD KEY `fk_student_group_student_group_1` (`student_group_id`) USING BTREE,
  ADD KEY `fk_student_group_teacher_discipline_2` (`teacher_discipline_id`) USING BTREE;

--
-- Индексы таблицы `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_teacher_discipline_0` (`discipline_id`) USING BTREE,
  ADD KEY `fk_teacher_teacher_1` (`teacher_id`) USING BTREE;

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `attestation_book`
--
ALTER TABLE `attestation_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- AUTO_INCREMENT для таблицы `discipline`
--
ALTER TABLE `discipline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- AUTO_INCREMENT для таблицы `report_type`
--
ALTER TABLE `report_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- AUTO_INCREMENT для таблицы `sqlite_sequence`
--
ALTER TABLE `sqlite_sequence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- AUTO_INCREMENT для таблицы `student_group`
--
ALTER TABLE `student_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- AUTO_INCREMENT для таблицы `student_group_session`
--
ALTER TABLE `student_group_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- AUTO_INCREMENT для таблицы `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- AUTO_INCREMENT для таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `attestation_book`
--
ALTER TABLE `attestation_book`
  ADD CONSTRAINT `attestation_book_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attestation_book_ibfk_2` FOREIGN KEY (`student_group_session_id`) REFERENCES `student_group_session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`student_group_id`) REFERENCES `student_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student_group_session`
--
ALTER TABLE `student_group_session`
  ADD CONSTRAINT `student_group_session_ibfk_1` FOREIGN KEY (`student_group_id`) REFERENCES `student_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_group_session_ibfk_2` FOREIGN KEY (`report_type_id`) REFERENCES `report_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_group_session_ibfk_3` FOREIGN KEY (`teacher_discipline_id`) REFERENCES `teacher_discipline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  ADD CONSTRAINT `teacher_discipline_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_discipline_ibfk_2` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
