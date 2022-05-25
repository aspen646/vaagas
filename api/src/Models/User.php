<?php

namespace App\Models;

use Exception;
use PDO;

class User
{
  private static $table = 'user';

  //LOGIN USUARIO/EMPRESA
  public static function login(object $data = null)
  {
    try{
      $connPdo = new PDO(DBDRIVE . ': host=' . DBHOST . '; dbname=' . DBNAME, DBUSER, DBPASS);

      $sql = 'SELECT * FROM ' . self::$table . ' WHERE email = :email and senha = :senha and tipo = :tipo';
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(':email', $data->email);
      $stmt->bindValue(':senha', $data->senha);
      $stmt->bindValue(':tipo', $data->tipo);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(200);
        return $stmt->fetch(PDO::FETCH_ASSOC);
      } else {
        http_response_code(400);
        throw new Exception("Email ou senha incorretos.");
      }

    }catch(\Exception $e){
      throw new Exception ($e);
    }
  }

  //CADASTRO USUARIO/EMPRESA
  public static function cadastro(object $data)
  {
    $connPdo = new PDO(DBDRIVE . ': host=' . DBHOST . '; dbname=' . DBNAME, DBUSER, DBPASS);

    $sql = 'SELECT * FROM ' . self::$table . ' WHERE email = :email';
    $userExistsQuery = $connPdo->prepare($sql);
    $userExistsQuery->bindValue(':email', $data->email);
    $userExistsQuery->execute();

    if ($userExistsQuery->rowCount() > 0) {
      http_response_code(400);
      throw new Exception("Email já cadastrado.");
    } else {
      $sql = 'INSERT INTO ' . self::$table . ' (nome, cpfCnpj, email, senha, tipo) VALUES (?, ?, ?, ?, ?)';
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(1, $data->nome);
      $stmt->bindValue(2, $data->cpfCnpj);
      $stmt->bindValue(3, $data->email);
      $stmt->bindValue(4, $data->senha);
      $stmt->bindValue(5, $data->tipo);

      $stmt->execute();

      http_response_code(201);
      return 'Usuário cadastrado com sucesso.';
    }
  }

  //EDITAR USUARIO
  public static function editar(object $data)
  {
    if (isset($data->id)) {
      $connPdo = new PDO(DBDRIVE . ': host=' . DBHOST . '; dbname=' . DBNAME, DBUSER, DBPASS);

      $sql = 'UPDATE ' . self::$table . ' SET nome=?, cpfCnpj=?, senha=? WHERE id=?';
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(1, $data->nome);
      $stmt->bindValue(2, $data->cpfCnpj);
      $stmt->bindValue(3, $data->senha);
      $stmt->bindValue(4, $data->id);

      $stmt->execute();

      http_response_code(200);
      return 'Dados editados com sucesso.';
    } else {
      http_response_code(400);
      throw new Exception("Você não está logado, entre e tente novamente.");
    }
  }

  //BUSCAR DADOS DO USUARIO PARA EDITAR
  public static function selectEditar(int $id)
  {
    try {
      $connPdo = new PDO(DBDRIVE . ': host=' . DBHOST . '; dbname=' . DBNAME, DBUSER, DBPASS);

      $sql = 'SELECT * FROM ' . self::$table . ' WHERE id=?';
      $stmt = $connPdo->prepare($sql);
      $stmt->bindValue(1, $id);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(200);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
      } else {
        http_response_code(400);
        throw new Exception("Esse usuário não existe.");
      }
    } catch (\Exception $e) {
      throw new Exception($e);
    }
  }
}
