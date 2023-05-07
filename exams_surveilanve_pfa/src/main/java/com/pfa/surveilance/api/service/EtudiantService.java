package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.*;
import com.pfa.surveilance.api.model.Etudiant;
import com.pfa.surveilance.api.repo.CalendrierRepo;
import com.pfa.surveilance.api.repo.EtudiantRepo;
import com.pfa.surveilance.api.repo.ProfRepo;
import com.pfa.surveilance.api.repo.SectionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EtudiantService {
    private final EtudiantRepo etudiantRepo;
    private final SectionRepo sectionRepo;
    private final CalendrierRepo calendrierRepo;

    @Autowired
    public EtudiantService(EtudiantRepo etudiantRepo,CalendrierRepo calendrierRepo, SectionRepo sectionRepo) {

        this.etudiantRepo = etudiantRepo;
        this.sectionRepo=sectionRepo;
        this.calendrierRepo=calendrierRepo;
    }

    public Etudiant addEtudiant(Etudiant e) {
        return etudiantRepo.save(e);
    }

    public List<Etudiant> findAllEtudiant() {

        return etudiantRepo.findAll();
    }

    public Etudiant updateEtudiant(Etudiant p) {
        return etudiantRepo.save(p);
    }


    public Etudiant findOneEtudiant(String s){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        System.out.println("---------------------");
        System.out.println(username);
        System.out.println("------------------------");
        return etudiantRepo.findEtudiantByUsername(s).orElseThrow(() -> new UserNotFoundException("User by username " +username+  " was not found"));
    }

    @Transactional
    public void deleteEtudiant(Long id) {
        Etudiant etudiant = etudiantRepo.findById(id).orElseThrow(() -> new RuntimeException("Etudiant not found with id " + id));
        etudiant.setSection(null);
        etudiantRepo.save(etudiant);
        etudiantRepo.delete(etudiant);
    }

    public Etudiant addSectionToEtudiant(Long etudiantId, Long sectionId) {
        Etudiant etudiant = etudiantRepo.findById(etudiantId)
                .orElseThrow(() -> new EntityNotFoundException("etudiant not found with ID: " + etudiantId));

        Section section = sectionRepo.findSectionById(sectionId)
                .orElseThrow(() -> new EntityNotFoundException("Section not found with ID: " + sectionId));
        etudiant.setSection(section);
        return etudiantRepo.save(etudiant);

    }

    public List<Calendrier> getCalendrier(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        System.out.println("---------------------");
        System.out.println(username);
        System.out.println("------------------------");
        Etudiant e = etudiantRepo.findByUsername(username).orElseThrow(() -> new UserNotFoundException("User by username "  + " was not found"));
       // e.getSection().getCalendriers();
         List<Calendrier>calendriers=  calendrierRepo.findBySection(e.getSection());
        return calendriers;


    }
}