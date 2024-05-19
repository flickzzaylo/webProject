-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 11 2023 г., 16:35
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

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
  `theme` text DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `discipline`
--

CREATE TABLE `discipline` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` text NOT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `discipline`
--

INSERT INTO `discipline` (`id`, `name`) VALUES
(1, 'Разработка Веб-Приложений'),
(2, 'Структуры Данных');

-- --------------------------------------------------------

--
-- Структура таблицы `report_type`
--

CREATE TABLE `report_type` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` text NOT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `sqlite_sequence`
--

CREATE TABLE `sqlite_sequence` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL COMMENT 'TRIAL',
  `seq` text DEFAULT NULL COMMENT 'TRIAL',
  `trial708` char(1) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` text NOT NULL COMMENT 'TRIAL',
  `student_group_id` int(11) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `student`
--

INSERT INTO `student` (`id`, `name`, `student_group_id`) VALUES
(1, 'Касаткина Анастасия', 1),
(2, 'Забродин Вадим', 2),
(3, 'Сивый Дмитрий', 2),
(4, 'test', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `student_group`
--

CREATE TABLE `student_group` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` text NOT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `student_group`
--

INSERT INTO `student_group` (`id`, `name`) VALUES
(1, '2362-ДБ'),
(2, '2361-ДБ\r\n\r\n');

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
  `semester` int(11) NOT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `name` text NOT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `teacher`
--

INSERT INTO `teacher` (`id`, `name`) VALUES
(1, 'Попова Виктория Алексеевна'),
(2, 'Кириченко Константин Дмитриевич');

-- --------------------------------------------------------

--
-- Структура таблицы `teacher_discipline`
--

CREATE TABLE `teacher_discipline` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `teacher_id` int(11) DEFAULT NULL COMMENT 'TRIAL',
  `discipline_id` int(11) DEFAULT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `teacher_discipline`
--

INSERT INTO `teacher_discipline` (`id`, `teacher_id`, `discipline_id`) VALUES
(1, 1, 1),
(2, 2, NULL),
(3, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL COMMENT 'TRIAL',
  `username` text NOT NULL COMMENT 'TRIAL',
  `password` text NOT NULL COMMENT 'TRIAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'VadimZabrodin', 'i2w2p5p6'),
(3, 'DmitrySiviy', 'qwe123');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `attestation_book`
--
ALTER TABLE `attestation_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `student_group_session_id` (`student_group_session_id`);

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
  ADD KEY `student_group_id` (`student_group_id`);

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
  ADD KEY `student_group_id` (`student_group_id`),
  ADD KEY `report_type_id` (`report_type_id`),
  ADD KEY `teacher_discipline_id` (`teacher_discipline_id`);

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
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `discipline_id` (`discipline_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL', AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `student_group`
--
ALTER TABLE `student_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `student_group_session`
--
ALTER TABLE `student_group_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL';

--
-- AUTO_INCREMENT для таблицы `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'TRIAL', AUTO_INCREMENT=4;

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
