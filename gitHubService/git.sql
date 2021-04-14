-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 15 2021 г., 00:22
-- Версия сервера: 10.3.22-MariaDB-log
-- Версия PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `git`
--

-- --------------------------------------------------------

--
-- Структура таблицы `repos`
--

CREATE TABLE `repos` (
  `id` int(99) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stars` int(25) NOT NULL,
  `watchers` int(25) NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gitId` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `repos`
--

INSERT INTO `repos` (`id`, `name`, `stars`, `watchers`, `url`, `gitId`) VALUES
(1, 'freeCodeCamp', 322798, 322798, 'https://github.com/freeCodeCamp/freeCodeCamp', 28457823),
(9, 'free-programming-books', 182859, 182859, 'https://github.com/EbookFoundation/free-programming-books', 13491895),
(10, 'react', 166893, 166893, 'https://github.com/facebook/react', 10270250),
(11, 'coding-interview-university', 162750, 162750, 'https://github.com/jwasham/coding-interview-university', 60493101),
(12, 'tensorflow', 154871, 154871, 'https://github.com/tensorflow/tensorflow', 45717250),
(13, 'bootstrap', 149319, 149319, 'https://github.com/twbs/bootstrap', 2126244),
(14, 'ohmyzsh', 126300, 126300, 'https://github.com/ohmyzsh/ohmyzsh', 291137),
(15, 'flutter', 118264, 118264, 'https://github.com/flutter/flutter', 31792824),
(16, 'public-apis', 117372, 117372, 'https://github.com/public-apis/public-apis', 54346799),
(17, 'vscode', 114471, 114471, 'https://github.com/microsoft/vscode', 41881900),
(159, 'linux', 108994, 108994, 'https://github.com/torvalds/linux', 2325298),
(160, 'Python', 102188, 102188, 'https://github.com/TheAlgorithms/Python', 63476337),
(161, 'JavaGuide', 101884, 101884, 'https://github.com/Snailclimb/JavaGuide', 132464395),
(162, 'react-native', 94719, 94719, 'https://github.com/facebook/react-native', 29028775),
(163, 'electron', 91273, 91273, 'https://github.com/electron/electron', 9384267),
(164, 'create-react-app', 87206, 87206, 'https://github.com/facebook/create-react-app', 63537249),
(165, 'go', 84475, 84475, 'https://github.com/golang/go', 23096959),
(166, 'axios', 83431, 83431, 'https://github.com/axios/axios', 23088740),
(167, 'node', 78336, 78336, 'https://github.com/nodejs/node', 27193779),
(168, 'kubernetes', 76212, 76212, 'https://github.com/kubernetes/kubernetes', 20580498);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `repos`
--
ALTER TABLE `repos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `gitId` (`gitId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `repos`
--
ALTER TABLE `repos`
  MODIFY `id` int(99) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
