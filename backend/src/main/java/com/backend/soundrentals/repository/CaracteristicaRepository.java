package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Caracteristica;
import com.backend.soundrentals.entity.Estilo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
}
