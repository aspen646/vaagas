<?php

namespace App\Models;

use Exception;
use PDO;

class Vaga
{
  private static $table = 'vaga';

  //ENVIAR atributo filter mesmo que não exista nada
  public static function listarTodos(object $data)
  {
    try {
      $connPdo = new PDO(DBDRIVE . ': host=' . DBHOST . '; dbname=' . DBNAME, DBUSER, DBPASS);

      $sql = 'SELECT * FROM ' . self::$table . " WHERE deletado=0 and nome like '%" . $data->filter . "%'";
      $stmt = $connPdo->prepare($sql);

      $stmt->execute();

      http_response_code(200);
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception('Erro ao listar vagas.');
    }
  }

  public static function listarPorEmpresa(object $data)
  {
    try {
      $connPdo = new PDO(DBDRIVE . ': host=' . DBHOST . '; dbname=' . DBNAME, DBUSER, DBPASS);

      $sql = 'SELECT * FROM ' . self::$table . ' WHERE empresa_id = :empresa_id and deletado=0';
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(':empresa_id', $data->empresa_id);

      $stmt->execute();

      http_response_code(200);
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (\Exception $e) {
      http_response_code(400);
      throw new Exception('Erro ao listar vagas.');
    }
  }

  public static function listarUm(object $data)
  {
    try {
      $connPdo = new PDO(DBDRIVE . ': host=' . DBHOST . '; dbname=' . DBNAME, DBUSER, DBPASS);

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


  public static function cadastro(object $data)
  {
    $connPdo = new PDO(DBDRIVE . ': host=' . DBHOST . '; dbname=' . DBNAME, DBUSER, DBPASS);

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
    }
  }
}
