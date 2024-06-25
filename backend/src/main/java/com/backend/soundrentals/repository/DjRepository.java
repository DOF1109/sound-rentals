package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Caracteristica;
import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface DjRepository extends JpaRepository<Dj, Long> {

    @Query("SELECT dj FROM Dj dj WHERE dj.name = :name AND dj.lastname = :lastname")
    Dj findByFullname(@Param("name") String name, @Param("lastname") String lastname);

    @Query("SELECT dj FROM Dj dj WHERE dj.email = :email")
    Dj findByEmail(@Param("email") String email);

    @Query("SELECT dj FROM Dj dj WHERE dj.dni = :dni")
    Dj findByDni(@Param("dni") Integer dni);

    @Query("SELECT dj FROM Dj dj WHERE dj.ciudad.id = :id")
    List<Dj> findDjsByCity(@Param("id") Long id);

    List<Dj> findByEstilosId(Long styleId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM dj_characteristic WHERE characteristic_id = :characteristicId", nativeQuery = true)
    void removeCaracteristicaFromDjs(@Param("characteristicId")  Long characteristicId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM dj_style WHERE style_id = :styleId", nativeQuery = true)
    void removeEstiloFromDjs(@Param("styleId")  Long styleId);
}