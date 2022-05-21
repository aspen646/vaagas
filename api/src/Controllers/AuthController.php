<?php

namespace App\Controllers;

use App\Models\User;

class AuthController
{
  public function get()
  {
    $data = json_decode(file_get_contents('php://input'));
    return User::login($data);
  }

  public function post()
  {
    $data = json_decode(file_get_contents('php://input'));
    return User::cadastro($data);
  }

  public function put($id = null)
  {
    if ($id) {
      return User::selectEditar($id);
    }

    $data = json_decode(file_get_contents('php://input'));

    return User::editar($data);
  }
  
  public function delete()
  {
  }
}
