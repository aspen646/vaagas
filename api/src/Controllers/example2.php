<?php

namespace App\Controllers;

use App\Models\User;

class UserController
{
  public function get($email, $senha)
  {
    if ($email && $senha) {
      return User::login($email, $senha);
    }
  }
  public function post()
  {
    return json_decode(file_get_contents('php://input'));
  }
  public function update()
  {
  }
  public function delete()
  {
  }
}
