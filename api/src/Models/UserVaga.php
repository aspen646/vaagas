<?php

namespace App\Models;

use Exception;
use PDO;

class UserVaga
{
  private static $tableAplica = 'user_aplica_vaga';
  private static $tableFavorita = 'user_favorita_vaga';

  //FAVORITAR OU 'DESAFAVORITAR' UMA VAGA
  public static function favoritar(object $data)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);

      if ($data->status == '0') { //FAVORITAR
        $sqlVerify = 'SELECT * FROM ' . self::$tableFavorita . ' WHERE user_id=:user_id and vaga_id=:vaga_id and status=0';
        $stmtVerify = $connPdo->prepare($sqlVerify);
        $stmtVerify->bindValue(':user_id', $data->user_id);
        $stmtVerify->bindValue(':vaga_id', $data->vaga_id);

        $stmtVerify->execute();

        if ($stmtVerify->rowCount() > 0) {
          http_response_code(400);
          return "Você já favoritou esta vaga.";
        } else {
          $sql = 'INSERT INTO ' . self::$tableFavorita . ' (user_id, vaga_id) VALUES (:user_id, :vaga_id)';
          $stmt = $connPdo->prepare($sql);
          $stmt->bindValue(':user_id', $data->user_id);
          $stmt->bindValue(':vaga_id', $data->vaga_id);
        }
      } else if ($data->status == '1') { //DESFAVORITAR
        $sql = 'UPDATE ' . self::$tableFavorita . ' SET status=:status WHERE user_id=:user_id and vaga_id=:vaga_id';
        $stmt = $connPdo->prepare($sql);
        $stmt->bindValue(':status', $data->status);
        $stmt->bindValue(':user_id', $data->user_id);
        $stmt->bindValue(':vaga_id', $data->vaga_id);
      }

      $stmt->execute();

      http_response_code(200);
    } catch (Exception $e) {
      throw new Exception($e);
    }
  }

  //CANDIDATAR OU 'DESCANDIDATAR' UMA VAGA
  public static function candidatar(object $data)
  {
    try {
            $connPdo = new PDO($_ENV["DBDRIVE"] . ':host=' . $_ENV["DBHOST"] . ';dbname=' . $_ENV["DBNAME"] . ';port=' . $_ENV["DBPORT"], $_ENV["DBUSER"], $_ENV["DBPASS"]);

      if ($data->status == '0') { //CANDIDATAR
        $sqlVerify = 'SELECT * FROM ' . self::$tableAplica . ' WHERE user_id=:user_id and vaga_id=:vaga_id and status=0';
        $stmtVerify = $connPdo->prepare($sqlVerify);
        $stmtVerify->bindValue(':user_id', $data->user_id);
        $stmtVerify->bindValue(':vaga_id', $data->vaga_id);

        $stmtVerify->execute();

        if ($stmtVerify->rowCount() > 0) {
          http_response_code(400);
          return "Você já candidatou a esta vaga.";
        } else {
          $sql = 'INSERT INTO ' . self::$tableAplica . ' (user_id, vaga_id) VALUES (:user_id, :vaga_id)';
          $stmt = $connPdo->prepare($sql);
          $stmt->bindValue(':user_id', $data->user_id);
          $stmt->bindValue(':vaga_id', $data->vaga_id);
        }
      } else if ($data->status == '1') { //DESCANDIDATAR
        $sql = 'UPDATE ' . self::$tableAplica . ' SET status=:status WHERE user_id=:user_id and vaga_id=:vaga_id';
        $stmt = $connPdo->prepare($sql);
        $stmt->bindValue(':status', $data->status);
        $stmt->bindValue(':user_id', $data->user_id);
        $stmt->bindValue(':vaga_id', $data->vaga_id);
      }

      $stmt->execute();

      http_response_code(200);
    } catch (Exception $e) {
      throw new Exception($e);
    }
  }
}
