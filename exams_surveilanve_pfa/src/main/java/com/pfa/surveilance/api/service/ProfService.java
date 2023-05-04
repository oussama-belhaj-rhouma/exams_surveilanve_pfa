package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Matiere;
import com.pfa.surveilance.api.model.Prof;
import com.pfa.surveilance.api.model.Salle;
import com.pfa.surveilance.api.repo.ProfRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    public void deleteProf(Long id) {
        profRepo.deleteProfById(id);
    }
}