package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.model.Salle;
import com.pfa.surveilance.api.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface SalleRepo extends JpaRepository<Salle, Long> {
    Optional<Salle> findSalleById(Long id);
    void deleteSalleById(Long id);
}
