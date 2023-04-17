package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Matiere;
import com.pfa.surveilance.api.model.Prof;
import com.pfa.surveilance.api.model.Salle;
import com.pfa.surveilance.api.repo.ProfRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class ProfService {
    private final ProfRepo profRepo;

    @Autowired
    public ProfService(ProfRepo profRepo) {
        this.profRepo = profRepo;
    }

    public Prof addProf(Prof p) {
        Prof existingSalle = profRepo.findProfByUsername(p.getUsername());
        if (existingSalle != null) {
            throw new IllegalArgumentException("Subject with name " + p.getUsername() + " already exists.");
        }
        return profRepo.save(p);
    }

    public List<Prof> findAllProf() {
        return profRepo.findAll();
    }

    public Prof updateProf(Prof p) {
        return profRepo.save(p);
    }

    public List<Affectation> getAffectationsByProfId(Long id) {
        Prof prof = profRepo.findProfById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
        return prof.getAffectations();
    }

    public Prof findOneProf(Long id){
        return profRepo.findProfById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public void deleteProf(Long id) {
        profRepo.deleteProfById(id);
    }
}