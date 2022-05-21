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
      } else if ($tipo === 'favoritos') {
        $data = json_decode(file_get_contents('php://input'));
        return Vaga::listarFavoritos($data);
      } else if ($tipo === 'candidatos') {
        $data = json_decode(file_get_contents('php://input'));
        return Vaga::listarCandidatosVaga($data);
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

  public function put($id = null)
  {
    if ($id) {
      return Vaga::selectEditar($id);
    }

    $data = json_decode(file_get_contents('php://input'));

    return Vaga::editar($data);
  }

  public function delete($id, $empresa_id)
  {
    return Vaga::deletar($id, $empresa_id);
  }
}
