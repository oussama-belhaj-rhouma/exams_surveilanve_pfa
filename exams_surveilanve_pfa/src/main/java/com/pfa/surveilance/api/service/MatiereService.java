package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Matiere;
import com.pfa.surveilance.api.repo.MatiereRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class MatiereService {
    private final MatiereRepo matiereRepo;
    @Autowired
    public MatiereService(MatiereRepo matiereRepo) {

        this.matiereRepo = matiereRepo;
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
    public void deleteMatiere(Long id){
        matiereRepo.deleteMatiereById(id);
    }
}
