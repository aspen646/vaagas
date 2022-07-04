<?php

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
// echo $_ENV["DBNAME"];

// $dbdrive = $_ENV["DBNAME"];

//MySQL
const DBDRIVE = 'mysql';
const DBHOST = 'localhost';
const DBNAME = 'vaagas';
const DBUSER = 'root';
CONST DBPORT = '3307';
const DBPASS = '';