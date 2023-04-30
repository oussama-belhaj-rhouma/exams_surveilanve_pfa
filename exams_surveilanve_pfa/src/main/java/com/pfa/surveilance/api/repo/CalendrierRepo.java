package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Repository

public interface CalendrierRepo extends JpaRepository<Calendrier, Long> {
    Optional<Calendrier> findCalendrierById(Long id);
    void deleteCalendrierById(Long id);

    List<Calendrier> findBySection(Section section);
}

