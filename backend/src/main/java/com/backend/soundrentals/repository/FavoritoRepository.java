package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM favorite WHERE dj_id = :djId", nativeQuery = true)
    void deleteByDjId(@Param("djId") Long djId);
}
