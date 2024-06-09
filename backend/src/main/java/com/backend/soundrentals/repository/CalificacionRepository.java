package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Calificacion;
import com.backend.soundrentals.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {
}
