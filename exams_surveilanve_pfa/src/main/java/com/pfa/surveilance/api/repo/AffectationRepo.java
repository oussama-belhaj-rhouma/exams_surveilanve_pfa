package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.model.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface AffectationRepo extends JpaRepository<Affectation, Long> {
    Optional<Affectation> findAffectaionById(Long id);
    void deleteAffectaionById(Long id);
    void addAffectationToCalendrierById(Long id);

}
