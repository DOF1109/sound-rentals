package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstiloRepository extends JpaRepository<Estilo, Long> {
}
