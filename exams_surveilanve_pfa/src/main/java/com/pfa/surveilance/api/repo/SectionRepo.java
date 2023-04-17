package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface SectionRepo extends JpaRepository<Section, Long> {
    Optional<Section> findSectionById(Long id);
    @Query("SELECT DISTINCT s FROM Section s WHERE LOWER(s.sectionName) = LOWER(:sectionName)")
    Section findSectionBySectionName(String sectionName);

    void deleteSectionById(Long id);
}
