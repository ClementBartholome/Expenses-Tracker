<?php 

spl_autoload_register(function($className) {
    if (file_exists("backend/Controllers/" . $className . ".php")) {
        require_once "backend/Controllers/" . $className . ".php";
    } else if (file_exists("backend/Models/" . $className . ".php")) {
        require_once "backend/Models/" . $className . ".php";
    }  else if (file_exists("backend/Routes/" . $className . ".php")) {
        require_once "backend/Routes/" . $className . ".php";
    }   else if (file_exists("backend/Config/" . $className . ".php")) {
        require_once "backend/Config/" . $className . ".php";
    }
});