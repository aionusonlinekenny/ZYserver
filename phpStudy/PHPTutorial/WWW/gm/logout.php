<?php
require 'auth.php';
$_SESSION=array();
session_destroy();
header('Location: login.php');
exit;
