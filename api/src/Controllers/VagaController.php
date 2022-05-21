<?php

namespace App\Controllers;

use App\Models\Vaga;

class VagaController
{
  public function get($tipo = null)
  {
    if ($tipo) {
      if ($tipo === 'todos') {
        $data = json_decode(file_get_contents('php://input'));
        // return 'caiu no todos';
        return Vaga::listarTodos($data);
      } else if ($tipo === 'empresa') {
        $data = json_decode(file_get_contents('php://input'));
        return Vaga::listarPorEmpresa($data);
      }
    } else {
      $data = json_decode(file_get_contents('php://input'));
      return Vaga::listarUm($data);
    }
  }
  public function post()
  {
    $data = json_decode(file_get_contents('php://input'));
    return Vaga::cadastro($data);
  }
  public function update()
  {
  }
  public function delete()
  {
  }
}
