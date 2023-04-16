package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface MatiereRepo extends JpaRepository<Matiere, Long> {
    Optional<Matiere> findMatiereById(Long id);
    void deleteMatiereById(Long id);
}
