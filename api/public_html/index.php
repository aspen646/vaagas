<?php
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: X-Requested-With");
// header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD, TRACE, CONNECT');
// header('Content-Type: application/json');
// header('Access-Control-Max-Age: 86400');

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Headers: *');
// header('Access-Control-Allow-Methods: *');
// header('Content-Type: application/json');

require_once '../vendor/autoload.php';

// Allow from any origin
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    //Just exit with 200 OK with the above headers for OPTIONS method
    exit(0);
}
//From here, handle the request as it is ok

// $connPdo = new PDO(DBDRIVE . ':host=' . DBHOST . ';dbname=' . DBNAME . ';port=' . DBPORT, DBUSER, DBPASS);
// $sql = "SHOW TABLES FROM " . DBNAME;
// $stmt = $connPdo->prepare($sql);
// $stmt->execute();
// var_dump($stmt->fetch(PDO::FETCH_ASSOC));

// echo $_GET['url'];

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
