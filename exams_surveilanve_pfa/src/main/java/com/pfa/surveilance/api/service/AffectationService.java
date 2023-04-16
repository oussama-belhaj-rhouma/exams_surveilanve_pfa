package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Affectation;

import com.pfa.surveilance.api.repo.AffectationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AffectationService {
    private final AffectationRepo affectationRepo;
    @Autowired
    public AffectationService(AffectationRepo affectationRepo) {
        this.affectationRepo = affectationRepo;
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


    public void deleteAffectation(Long id){
        affectationRepo.deleteAffectaionById(id);
    }
}
