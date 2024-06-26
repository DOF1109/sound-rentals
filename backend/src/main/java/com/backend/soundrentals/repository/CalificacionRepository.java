package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Calificacion;
import com.backend.soundrentals.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM rating WHERE reserva_id = :reservaId", nativeQuery = true)
    void deleteByReservaId(@Param("reservaId") Long djId);
}
