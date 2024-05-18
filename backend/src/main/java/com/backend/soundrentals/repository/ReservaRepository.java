package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("SELECT r.dj,COUNT(r.dj) as numReservas FROM Reserva r GROUP BY r.dj ORDER BY numReservas DESC")
     List<Dj> findTop10IdDjMasReservados();
}
