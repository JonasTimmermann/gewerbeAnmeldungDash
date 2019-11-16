package com.gewerbe.simpleProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.gewerbe.simpleProject.entity.Frage;

import java.sql.*;

public interface FrageRepository extends JpaRepository<Frage, Integer> {

@Modifying    
@Query("UPDATE Frage f SET f.frage = ?2, f.kategorie = ?3, f.antwortTyp = ?4, f.antwortOptionen = ?5, f.hinweis = ?6 WHERE f.id = ?1")
Integer updateFrage(Integer id, String frage, String kategorie, String antwortTyp, String antwortOptionen, String hinweis);





}
