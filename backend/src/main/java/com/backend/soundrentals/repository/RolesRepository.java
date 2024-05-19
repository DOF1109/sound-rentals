package com.backend.soundrentals.repository;

import com.backend.soundrentals.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Long> {
}