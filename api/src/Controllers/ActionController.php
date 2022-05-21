<?php

//RELAÇÃO ENTRE USUÁRIO E VAGA

namespace App\Controllers;

use App\Models\UserVaga;

class ActionController
{
  public function get()
  {
  }
  public function post($tipo)
  {
    if ($tipo == 'favoritar') {
      $data = json_decode(file_get_contents('php://input'));
      return UserVaga::favoritar($data);
    } else if ($tipo == "candidatar") {
      $data = json_decode(file_get_contents('php://input'));
      return UserVaga::candidatar($data);
    }
  }
  public function update()
  {
  }
  public function delete()
  {
  }
}
