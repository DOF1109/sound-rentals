package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
}
