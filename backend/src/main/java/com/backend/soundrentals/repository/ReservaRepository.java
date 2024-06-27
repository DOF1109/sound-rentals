package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("SELECT r.dj,COUNT(r.dj) as numReservas FROM Reserva r GROUP BY r.dj ORDER BY numReservas DESC")
     List<Dj> findTop10IdDjMasReservados();

    @Query("SELECT DISTINCT dj " +
            "FROM Dj dj " +
            "WHERE (:ciudad IS NULL OR dj.ciudad.id = :ciudad) " +
            "AND (:estilo IS NULL OR :estilo MEMBER OF dj.estilos) " +
            "AND NOT EXISTS (" +
            "    SELECT r " +
            "    FROM Reserva r " +
            "    WHERE r.dj = dj " +
            "    AND r.endDate >= :fechaInicio " +
            "    AND r.startDate <= :fechaFin" +
            ")")
    List<Dj> findReservaByDjFecha(@Param("ciudad") Long ciudad,
                                @Param("estilo") Long estilo,
                                @Param("fechaInicio") LocalDate fechaInicio,
                                @Param("fechaFin") LocalDate fechaFin);

    List<Reserva> findReservaByUsuario_Id(Long id);

    List<Reserva> findReservaByDjId(Long id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM reserva WHERE dj_id = :djId", nativeQuery = true)
    void deleteByDjId(@Param("djId") Long djId);
}
