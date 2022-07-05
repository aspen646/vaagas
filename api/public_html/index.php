<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');

require_once '../vendor/autoload.php';

// $connPdo = new PDO(DBDRIVE . ':host=' . DBHOST . ';dbname=' . DBNAME . ';port=' . DBPORT, DBUSER, DBPASS);
// $sql = "SHOW TABLES FROM " . DBNAME;
// $stmt = $connPdo->prepare($sql);
// $stmt->execute();
// var_dump($stmt->fetch(PDO::FETCH_ASSOC));

echo $_GET['url'];

// api/user/1
if ($_GET['url']) {
  $url = explode('/', $_GET['url']);
  
  if ($url[0] === 'api') {
    array_shift($url);

    $controller = 'App\Controllers\\' . ucfirst($url[0]) . 'Controller';

    array_shift($url);

    $method = strtolower($_SERVER['REQUEST_METHOD']);

    try {
      $response = call_user_func_array(array(new $controller, $method), $url);

      // http_response_code(201);
      echo json_encode(array('status' => 'success', 'data' => $response));
      exit;
    } catch (\Exception $e) {
      // http_response_code(404);
      echo json_encode(array('status' => 'error', 'data' => $e->getMessage()));
      exit;
    }
  }
}


