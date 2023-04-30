package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Etudiant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface EtudiantRepo extends JpaRepository <Etudiant, Long> {
    Optional<Etudiant> findEtudiantById(Long id);
    @Query("SELECT DISTINCT e FROM Etudiant e WHERE LOWER(e.username) = LOWER(:username)")
    Optional<Etudiant> findEtudiantByUsername(String username);

    void deleteEtudiantById(Long id);

    Optional<Etudiant> findByUsername(String username);

}

