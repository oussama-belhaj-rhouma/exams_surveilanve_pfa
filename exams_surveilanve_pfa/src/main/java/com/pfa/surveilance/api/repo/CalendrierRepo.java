package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Calendrier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface CalendrierRepo extends JpaRepository<Calendrier, Long> {
    Optional<Calendrier> findCalendrierById(Long id);
    void deleteCalendrierById(Long id);
}
