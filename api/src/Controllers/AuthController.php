<?php

namespace App\Controllers;

use App\Models\User;

class AuthController
{
  public function get($email, $senha, $tipo)
  {
    // $data = new \stdClass();
    // $data->email = $email;
    // $data->senha = $senha;
    // $data->tipo = $tipo;

    // $data = json_decode(file_get_contents('php://input'));
    // return User::login($data);
  }

  public function post($tipo)
  {
    if ($tipo === "cadastro") {
      $data = json_decode(file_get_contents('php://input'));
      return User::cadastro($data);
    } else if ($tipo === "login") {
      $data = json_decode(file_get_contents('php://input'));
      return User::login($data);
    }
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
