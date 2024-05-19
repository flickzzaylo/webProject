-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 19 2024 г., 09:58
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
-- База данных: `online_compiler`
--

-- --------------------------------------------------------

--
-- Структура таблицы `discipline`
--

CREATE TABLE `discipline` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `discipline`
--

INSERT INTO `discipline` (`id`, `name`) VALUES
(1, 'Разработка веб-приложений'),
(6, 'Языки программирования');

-- --------------------------------------------------------

--
-- Структура таблицы `prog_language`
--

CREATE TABLE `prog_language` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `prog_language`
--

INSERT INTO `prog_language` (`id`, `name`) VALUES
(1, 'C++'),
(2, 'Java'),
(3, 'C#'),
(4, 'Vue.js'),
(6, 'Node.js');

-- --------------------------------------------------------

--
-- Структура таблицы `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Преподаватель'),
(2, 'Студент'),
(3, 'Администратор');

-- --------------------------------------------------------

--
-- Структура таблицы `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `teacher_discipline_id` int(11) NOT NULL,
  `prog_language_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `task`
--

INSERT INTO `task` (`id`, `teacher_discipline_id`, `prog_language_id`, `name`, `description`) VALUES
(14, 4, 6, 'Определение обработчиков маршрутов', 'В рамках данной работы требуется реализовать обработчики маршрутов, которые на запрос по некоторому адресу будут возвращать данные (или наборы данных).'),
(15, 4, 6, 'Работа с зачётной книжкой', 'В данной работе необходимо реализовать:\n1) Назначение преподавателям учебных дисциплин, которые они ведут;\n2) Формирование записей о сессии с указанием семестра;\n3) Ввод и просмотр оценок студента.'),
(26, 5, 1, 'Задание', 'Описание');

-- --------------------------------------------------------

--
-- Структура таблицы `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `teacher`
--

INSERT INTO `teacher` (`id`, `user_id`, `name`) VALUES
(5, 26, 'Попова Виктория Алексеевна'),
(6, 28, 'Кириченко Константин Дмитриевич');

-- --------------------------------------------------------

--
-- Структура таблицы `teacher_discipline`
--

CREATE TABLE `teacher_discipline` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `discipline_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `teacher_discipline`
--

INSERT INTO `teacher_discipline` (`id`, `teacher_id`, `discipline_id`) VALUES
(4, 5, 1),
(5, 6, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `testcase`
--

CREATE TABLE `testcase` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `input` text NOT NULL,
  `output` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `testcase`
--

INSERT INTO `testcase` (`id`, `task_id`, `input`, `output`) VALUES
(20, 14, 'SELECT * FROM attestation_book', ''),
(23, 14, 'SELECT * FROM discipline', ''),
(24, 14, 'SELECT * FROM user', '');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `login` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `role_id`, `login`, `password`) VALUES
(14, 3, 'admin', '$2a$10$.vfRiN6LTueeRm4VAWLAFO.l93R3ioFZHIObFFFEIdL.ICwIfuc5W'),
(19, 2, 'ZabrodinVadim', '$2a$10$irkC/bYRx/k8oKogtBAjXeZWwUWHlxAJwZJ/ZQv2kj7G8NqBTuOrq'),
(20, 2, 'SiviyDmitry', '$2a$10$s8zsG2mGpg.WY.atYaoZP.lQAaxgKncdz0JuL1rTmjlgW2f0NYeQK'),
(21, 2, 'OkunevKirill', '$2a$10$ekCawzfsmFst47qX5M6XWOC68DDkd2jZBl0L3978Lh.0WwZGmvtTa'),
(22, 2, 'IvanovIvan', '$2a$10$wL5X6ncTO59ulM2G61q0HeQ6p4MUX.ayZ0BsQoOvyv0VT0bk.7tsW'),
(23, 2, 'AbramovVadim', '$2a$10$cYfI58EPzOCN0fkSV2/Tz.212Y7EauK0yWKlYwhsimbJNqFd4mL7q'),
(24, 2, 'LebedevArtem', '$2a$10$/SdjVUD0n.azo4p2k0nQZOoe0.Nj/m26GfSehoVoeurpJoXYJnorq'),
(25, 2, 'PetrovIvan', '$2a$10$V3DHbGsSTYJawBXyEe6Pj.PAcJSG/A0C82MG.KG2Jnqz7V4QSNPBS'),
(26, 1, 'PopovaVictoria', '$2a$10$.buBgGyQC8LtVeikqNafJeEOmdlurzbrucYkXHU05OKYcnb9eXDSC'),
(27, 2, 'user', '$2a$10$TryKjWMXyvf9Vw8ARDHtGOcQ3z433CtSlyM01S/LFqFkx7.wcFVXm'),
(28, 1, 'KirichenkoK', '$2a$10$Z/.7rt4KA/Y0aryG37WvJ.g4nHnKTp66msgCVPdtP3P7zBOCuGzl.');

-- --------------------------------------------------------

--
-- Структура таблицы `user_tasks`
--

CREATE TABLE `user_tasks` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `mark` int(11) DEFAULT NULL,
  `comment` text NOT NULL,
  `file` text DEFAULT NULL,
  `mime_type` text NOT NULL,
  `isComplete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `user_tasks`
--

INSERT INTO `user_tasks` (`id`, `task_id`, `user_id`, `mark`, `comment`, `file`, `mime_type`, `isComplete`) VALUES
(37, 14, 19, 80, 'Доделать ??', '10deb2de-ff51-44e4-a032-cecb7bd72d8a.x-zip-compressed', 'application/x-zip-compressed', 1),
(38, 14, 20, NULL, '', '2741e734-aca6-4869-bddf-332e3dbb7b40.x-zip-compressed', 'application/x-zip-compressed', 0),
(39, 14, 21, NULL, '', '554dae18-dcfc-43b5-8721-4f4aeaec8783.x-zip-compressed', 'application/x-zip-compressed', 0),
(48, 15, 23, NULL, '', NULL, '', 0),
(49, 15, 22, NULL, '', NULL, '', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `discipline`
--
ALTER TABLE `discipline`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `prog_language`
--
ALTER TABLE `prog_language`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_discipline_id` (`teacher_discipline_id`),
  ADD KEY `prog_language_id` (`prog_language_id`);

--
-- Индексы таблицы `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `discipline_id` (`discipline_id`);

--
-- Индексы таблицы `testcase`
--
ALTER TABLE `testcase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Индексы таблицы `user_tasks`
--
ALTER TABLE `user_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `discipline`
--
ALTER TABLE `discipline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `prog_language`
--
ALTER TABLE `prog_language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `testcase`
--
ALTER TABLE `testcase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `user_tasks`
--
ALTER TABLE `user_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`teacher_discipline_id`) REFERENCES `teacher_discipline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_3` FOREIGN KEY (`prog_language_id`) REFERENCES `prog_language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  ADD CONSTRAINT `teacher_discipline_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_discipline_ibfk_2` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `testcase`
--
ALTER TABLE `testcase`
  ADD CONSTRAINT `testcase_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user_tasks`
--
ALTER TABLE `user_tasks`
  ADD CONSTRAINT `user_tasks_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_tasks_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
