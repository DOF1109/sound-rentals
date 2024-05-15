package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}
