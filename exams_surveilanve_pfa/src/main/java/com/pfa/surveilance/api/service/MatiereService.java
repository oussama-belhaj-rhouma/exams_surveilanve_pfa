package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Matiere;
import com.pfa.surveilance.api.model.Prof;
import com.pfa.surveilance.api.model.Section;
import com.pfa.surveilance.api.repo.MatiereRepo;
import com.pfa.surveilance.api.repo.ProfRepo;
import com.pfa.surveilance.api.repo.SectionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class MatiereService {
    private final MatiereRepo matiereRepo;
    private final ProfRepo profRepo;

    private final SectionRepo sectionRepo;

    @Autowired
    public MatiereService(MatiereRepo matiereRepo, SectionRepo sectionRepo, ProfRepo profRepo) {

        this.matiereRepo = matiereRepo;
        this.sectionRepo=sectionRepo;
        this.profRepo=profRepo;
    }
    public Matiere addMatiere(Matiere m){
        Matiere existingSubject= matiereRepo.findMatiereByName(m.getName());

        if (existingSubject != null) {
            throw new IllegalArgumentException("Subject with name " + m.getName() + " already exists.");
        }
        else{
        return matiereRepo.save(m);}
    }
    public List<Matiere> findAllMatiere(){
        return matiereRepo.findAll();
    }
    public Matiere updateMatiere(Matiere m) {
        return matiereRepo.save(m);
    }
    public Matiere findOneMatiere(Long id){
        return matiereRepo.findMatiereById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
    @Transactional
    public void deleteMatiere(Long id) {
        Matiere m = matiereRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Matiere not found with id " + id));

        List<Section> sections = m.getSections();
        sections.forEach(section -> section.getMatieres().remove(m));
        sectionRepo.saveAll(sections);

        List<Prof> p = m.getProfessors();
        p.forEach(prof -> prof.getMatieres().remove(m));
        profRepo.saveAll(p);

        profRepo.deleteById(id);
    }
}
