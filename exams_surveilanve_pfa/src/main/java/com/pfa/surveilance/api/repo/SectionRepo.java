package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface SectionRepo extends JpaRepository<Section, Long> {
    Optional<Section> findSectionById(Long id);
    void deleteSectionById(Long id);
}
