package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Dj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DjRepository extends JpaRepository<Dj, Long> {

}