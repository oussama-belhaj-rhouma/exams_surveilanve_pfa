package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.*;

import com.pfa.surveilance.api.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AffectationService {
    private final AffectationRepo affectationRepo;
    private final MatiereRepo matiereRepo;
    private final SalleRepo salleRepo;
    private final SectionRepo sectionRepo;
    private final ProfRepo profRepo;
    private final EmailService emailService;



    @Autowired
    public AffectationService(AffectationRepo affectationRepo, EmailService emailService, ProfRepo profRepo, MatiereRepo matiereRepo, SalleRepo salleRepo,SectionRepo sectionRepo) {
        this.affectationRepo = affectationRepo;
        this.matiereRepo=matiereRepo;
        this.salleRepo=salleRepo;
        this.sectionRepo=sectionRepo;
        this.profRepo=profRepo;
        this.emailService=emailService;
    }
    public Affectation addAffectation(Affectation affectation){
        return affectationRepo.save(affectation);
    }
    public List<Affectation> findAllAffectation(){
        return affectationRepo.findAll();
    }
    public Affectation updateAffectation(Affectation affectation) {
        return affectationRepo.save(affectation);
    }


    public Affectation findOneAffectation(Long id){
        return affectationRepo.findAffectaionById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
    public Affectation addMatiereToAffectation(Long affectationId, Long matieretId) {
        Affectation affectation = affectationRepo.findById(affectationId)
                .orElseThrow(() -> new EntityNotFoundException("affectation not found with ID: " + affectationId));

        Matiere matiere = matiereRepo.findMatiereById(matieretId)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found with ID: " + matieretId));
        affectation.setMatiere(matiere);
         return affectationRepo.save(affectation);

    }

    public Affectation addSalleToAffectation(Long affectationId, Long salleId) {
        Affectation affectation = affectationRepo.findById(affectationId)
                .orElseThrow(() -> new EntityNotFoundException("affectation not found with ID: " + affectationId));

        Salle salle = salleRepo.findSalleById(salleId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + salleId));
        affectation.setSalle(salle);
        return affectationRepo.save(affectation);

    }

    public Affectation addSectionToAffectation(Long affectationId, Long sectionId) {
        Affectation affectation = affectationRepo.findById(affectationId)
                .orElseThrow(() -> new EntityNotFoundException("affectation not found with ID: " + affectationId));

        Section section = sectionRepo.findSectionById(sectionId)
                .orElseThrow(() -> new EntityNotFoundException("Section not found with ID: " + sectionId));
        affectation.setSection(section);
        return affectationRepo.save(affectation);

    }

    public  Affectation addProfToAffectation(Long affectationId, Long profId) {
        Affectation affectation = affectationRepo.findById(affectationId)
                .orElseThrow(() -> new EntityNotFoundException("affectation not found with ID: " + affectationId));

        Prof professor = profRepo.findById(profId)
                .orElseThrow(() -> new EntityNotFoundException("professor not found with ID: " + profId));
        affectation.getProfessors().add(professor);

        Affectation savedAffectation = affectationRepo.save(affectation);
        emailService.sendEmail(professor.getEmail(), "this is the subject", "this is the body");
        return savedAffectation;
    }


    public void deleteAffectation(Long id){
        affectationRepo.deleteAffectaionById(id);
    }
}
