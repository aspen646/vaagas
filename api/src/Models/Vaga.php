<?php

namespace App\Models;

use Exception;
use PDO;

class Vaga
{
  private static $table = 'vaga';

  //LISTAR TODAS AS VAGAS COM FILTRO
  //ENVIAR atributo filter mesmo que não exista nada
  public static function listarTodos(object $data = null)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);

      if (!$data) {
        $sql = "SELECT vaga.id, vaga.empresa_id, vaga.nome, vaga.salario, vaga.cidade, vaga.estado, vaga.resumo, vaga.requisitos, vaga.data, user.nome as empresa FROM `vaga` inner join user on user.id=vaga.empresa_id WHERE vaga.deletado=0";
        // $sql = 'SELECT * FROM ' . self::$table . " WHERE deletado=0";
        $stmt = $connPdo->prepare($sql);
      } else {
        $sql = "SELECT vaga.id, vaga.empresa_id, vaga.nome, vaga.salario, vaga.cidade, vaga.estado, vaga.resumo, vaga.requisitos, vaga.data, user.nome as empresa FROM `vaga` inner join user on user.id=vaga.empresa_id WHERE vaga.deletado=0 and vaga.nome like '%" . $data->filter . "%'";
        // $sql = 'SELECT * FROM ' . self::$table . " WHERE deletado=0 and nome like '%" . $data->filter . "%'";
        $stmt = $connPdo->prepare($sql);
      }

      $stmt->execute();

      http_response_code(200);
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception($e);
    }
  }

  //LISTAR VAGAS DE UMA EMPRESA
  public static function listarPorEmpresa(string $id)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);

      $sql = 'SELECT * FROM ' . self::$table . ' WHERE empresa_id = :empresa_id and deletado=0';
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(':empresa_id', $id);

      $stmt->execute();

      http_response_code(200);
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception('Erro ao listar vagas.');
    }
  }

  //LISTAR UMA VAGA
  public static function listarUm(object $data)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);

      $sql = 'SELECT * FROM ' . self::$table . " WHERE deletado=0 and id=:id";
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(':id', $data->id);
      
      $stmt->execute();
      
      http_response_code(200);
      return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception('Erro ao listar vagas.');
    }
  }
  
  //LISTAR VAGAS FAVORITADAS
  public static function listarFavoritos(object $data)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);
      $sql = 'SELECT user.id as user_id, v.id as vaga_id, v.empresa_id, v.nome, v.salario, v.cidade, v.estado, v.resumo, v.requisitos FROM user INNER JOIN user_favorita_vaga as ufv ON user.id = ufv.user_id and ufv.status=0 INNER JOIN vaga as v ON ufv.vaga_id = v.id and v.deletado=0 where user.id=:idUser' ;
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(':idUser', $data->user_id);

      $stmt->execute();

      http_response_code(200);
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception('Erro ao listar vagas.');
    }
  }
  
  //LISTAR VAGAS APLICADAS PELO USER
  public static function listarVagasAplicadas(object $data)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);
      $sql = 'select user.id as user_id, v.id as vaga_id, v.empresa_id, v.nome, v.salario, v.cidade, v.estado, v.resumo, v.requisitos  from user INNER JOIN user_aplica_vaga as uaa ON user.id=uaa.user_id and uaa.status=0 INNER JOIN vaga as v ON uaa.vaga_id=v.id and deletado=0 where uaa.user_id=:idUser' ;
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(':idUser', $data->user_id);

      $stmt->execute();

      http_response_code(200);
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception('Erro ao listar vagas.');
    }
  }
  
  //LISTAR QUEM CANDIDATOU A UMA VAGA
  public static function listarCandidatosVaga(string $idVaga, string $idEmpresa)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);
      $sql = 'select user.id as user_id, v.id as vaga_id, v.empresa_id, user.nome, user.email from user INNER JOIN user_aplica_vaga as uaa ON user.id=uaa.user_id and uaa.status=0 INNER JOIN vaga as v ON uaa.vaga_id=v.id and deletado=0 where v.empresa_id=:empresa_id and v.id=:vaga_id;' ;
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(':empresa_id', $idEmpresa);
      $stmt->bindValue(':vaga_id', $idVaga);

      $stmt->execute();

      http_response_code(200);
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception('Erro ao listar vagas.');
    }
  }

  // CADASTRAR VAGA
  public static function cadastro(object $data)
  {
          $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);

    $sql = 'SELECT * FROM ' . self::$table . ' WHERE empresa_id = :empresa_id and nome = :nome ';
    $vagaExistsQuery = $connPdo->prepare($sql);
    $vagaExistsQuery->bindValue(':empresa_id', $data->empresa_id);
    $vagaExistsQuery->bindValue(':nome', $data->nome);

    $vagaExistsQuery->execute();

    if ($vagaExistsQuery->rowCount() > 0) {
      http_response_code(400);
      throw new Exception("Já existe uma vaga com este nome.");
    } else {
      $sql = 'INSERT INTO ' . self::$table . ' (empresa_id, nome, salario, cidade, estado, resumo, requisitos ) VALUES (?, ?, ?, ?, ?, ?, ?)';
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(1, $data->empresa_id);
      $stmt->bindValue(2, $data->nome);
      $stmt->bindValue(3, $data->salario);
      $stmt->bindValue(4, $data->cidade);
      $stmt->bindValue(5, $data->estado);
      $stmt->bindValue(6, $data->resumo);
      $stmt->bindValue(7, $data->requisitos);

      $stmt->execute();

      http_response_code(201);
      return 'Vaga criada com sucesso.';
    }
  }

  //EDITAR VAGA
  public static function editar(object $data)
  {
    try {
      if (isset($data->id) && isset($data->empresa_id)) {
              $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);

        $sql = 'UPDATE ' . self::$table . ' SET nome=:nome, salario=:salario, cidade=:cidade, estado=:estado, resumo=:resumo, requisitos=:requisitos WHERE id=:id and empresa_id=:empresa_id';
        $stmt = $connPdo->prepare($sql);
        $stmt->bindValue(':nome', $data->nome);
        $stmt->bindValue(':salario', $data->salario);
        $stmt->bindValue(':cidade', $data->cidade);
        $stmt->bindValue(':estado', $data->estado);
        $stmt->bindValue(':resumo', $data->resumo);
        $stmt->bindValue(':requisitos', $data->requisitos);
        $stmt->bindValue(':id', $data->id);
        $stmt->bindValue(':empresa_id', $data->empresa_id);

        $stmt->execute();

        http_response_code(200);
        return 'Dados editados com sucesso.';
      } else {
        http_response_code(400);
        throw new Exception("Você não está logado, entre e tente novamente.");
      }
    } catch (\Exception $e) {
      throw new Exception($e);
    }
  }

  //SELECIONAR DADOS DA VAGA PARA EDIÇÃO
  public static function selectEditar(int $id)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);

      $sql = 'SELECT * FROM ' . self::$table . " WHERE deletado=0 and id=:id";
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(':id', $id);

      $stmt->execute();

      http_response_code(200);
      return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception('Erro ao editar.');
    }
  }

  //DELETAR VAGA
  public static function deletar(int $id, int $empresa_id)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);

      $sql = 'UPDATE ' . self::$table . ' SET deletado=1 WHERE id=:id and empresa_id=:empresa_id';
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(':id', $id);
      $stmt->bindValue(':empresa_id', $empresa_id);

      $stmt->execute();

      http_response_code(200);
      return $stmt->fetch(PDO::FETCH_ASSOC);
      // return 'Vaga deletada com sucesso.';
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception('Erro ao deletar vaga.');
    }
  }
}
