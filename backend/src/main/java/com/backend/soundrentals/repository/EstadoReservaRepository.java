package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.EstadoReserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstadoReservaRepository extends JpaRepository<EstadoReserva, Long> {
}