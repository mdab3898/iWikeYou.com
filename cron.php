<?php

require(__DIR__ . '/application/bootstrap.php');
require(__DIR__ . '/application/vendor/autoload.php');
require(__DIR__ . '/application/environment.php');
require(__DIR__ . '/application/vendor/yiisoft/yii2/Yii.php');

$config = require(__DIR__ . '/application/config/console.php');
$application = new yii\console\Application($config);

// protect with password
if (env('CRON_SECRET') !== false) {
    $secret = $_GET['secret'] ?? null;
    if ($secret !== env('CRON_SECRET')) {
        die("Access denied");
    }
} else {
    die("CRON_SECRET key required (.env file). See https://youdate.hauntd.me/documentation/cron.html for more details");
}

$action = isset($_GET['action']) ? $_GET['action'] : null;
$availableCommands = ['cron/hourly', 'cron/daily', 'queue/run'];

// when pcntl_signal function is not allowed
Yii::$container->set(\yii\queue\db\Command::class, ['isolate' => false]);

if (in_array($action, $availableCommands)) {
    $application->runAction($action);
} else {
    die("$action not supported");
}
