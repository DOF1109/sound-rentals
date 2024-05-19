package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Dj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DjRepository extends JpaRepository<Dj, Long> {

    @Query("SELECT dj FROM Dj dj WHERE dj.name = :name AND dj.lastname = :lastname")
    Dj findByFullname(@Param("name") String name, @Param("lastname") String lastname);

    @Query("SELECT dj FROM Dj dj WHERE dj.email = :email")
    Dj findByEmail(@Param("email") String email);

    @Query("SELECT dj FROM Dj dj WHERE dj.dni = :dni")
    Dj findByDni(@Param("dni") Integer dni);

    List<Dj> findByEstilosId(Long styleId);
}