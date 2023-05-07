package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.*;
import com.pfa.surveilance.api.repo.AffectationRepo;
import com.pfa.surveilance.api.repo.MatiereRepo;
import com.pfa.surveilance.api.repo.ProfRepo;
import com.pfa.surveilance.api.repo.SectionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class ProfService {

    private final ProfRepo profRepo;
    private final SectionRepo sectionRepo;
    private final MatiereRepo matiereRepo;
    private final AffectationRepo affectationRepo;



    @Autowired
    public ProfService(ProfRepo profRepo,  SectionRepo sectionRepo, MatiereRepo matiereRepo, AffectationRepo affectationRepo) {
        this.profRepo = profRepo;
        this.sectionRepo=sectionRepo;
        this.affectationRepo=affectationRepo;
        this.matiereRepo=matiereRepo;
    }

    public Prof addProf(Prof p) {

        return profRepo.save(p);
    }

    public List<Prof> findAllProf() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        System.out.println("---------------------");
        System.out.println(username);
        System.out.println("------------------------");
        return profRepo.findAll();
    }

    public Prof updateProf(Prof p) {
        return profRepo.save(p);
    }

    public List<Affectation> getAffectationsByProfUsername(String s) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        System.out.println("---------------------");
        System.out.println(username);
        System.out.println("------------------------");
        Prof prof = profRepo.findByUsername(s).orElseThrow(() -> new UserNotFoundException("User by username "  + s+ " was not found"));
        return prof.getAffectations();
    }

    public Prof findOneProf(String s){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        System.out.println("---------------------");
        System.out.println(username);
        System.out.println("------------------------");
        return profRepo.findProfByUsername(s).orElseThrow(() -> new UserNotFoundException("User by username " +username + " was not found"));
    }

    public Prof addSectionToProf(Long profId, Long sectionId) {
        Prof prof = profRepo.findById(profId)
                .orElseThrow(() -> new EntityNotFoundException("affectation not found with ID: " + profId));

        Section section = sectionRepo.findById(sectionId)
                .orElseThrow(() -> new EntityNotFoundException("Section not found with ID: " + sectionId));
        prof.getSections().add(section);
        return profRepo.save(prof);

    }
    public Prof addMatiereToProf(Long profId, Long matiereId) {
        Prof prof = profRepo.findById(profId)
                .orElseThrow(() -> new EntityNotFoundException("affectation not found with ID: " + profId));

        Matiere matiere = matiereRepo.findById(matiereId)
                .orElseThrow(() -> new EntityNotFoundException("Section not found with ID: " + matiereId));
        prof.getMatieres().add(matiere);
        return profRepo.save(prof);

    }

    @Transactional
    public void removeProf(Long id) {
        Prof professor = profRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Professor not found with id " + id));

        List<Section> sections = professor.getSections();
        sections.forEach(section -> section.getProfessors().remove(professor));
        sectionRepo.saveAll(sections);

        List<Matiere> matieres = professor.getMatieres();
        matieres.forEach(matiere -> matiere.getProfessors().remove(professor));
        matiereRepo.saveAll(matieres);

        List<Affectation> affectations = professor.getAffectations();
        affectations.forEach(affectation -> affectation.getProfessors().remove(professor));
        affectationRepo.saveAll(affectations);

        profRepo.deleteById(id);
    }
}