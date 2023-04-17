package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Matiere;
import com.pfa.surveilance.api.model.Salle;
import com.pfa.surveilance.api.model.Section;
import com.pfa.surveilance.api.repo.SalleRepo;
import com.pfa.surveilance.api.repo.SectionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class SalleService {
    private final SalleRepo salleRepo;
    @Autowired
    public SalleService(SalleRepo salleRepo) {
        this.salleRepo = salleRepo;
    }
    public Salle addSalle(Salle s){
        Salle existingSalle = salleRepo.findSalleByRoomNumber(s.getRoomNumber());
        if (existingSalle != null) {
            throw new IllegalArgumentException("Subject with name " + s.getRoomNumber() + " already exists.");
        }

        return salleRepo.save(s);
    }
    public List<Salle> findAllSalle(){
        return salleRepo.findAll();
    }
    public Salle updateSalle(Salle s) {
        return salleRepo.save(s);
    }    public Salle findOneSalle(Long id){
        return salleRepo.findSalleById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
    public void deleteSalle(Long id){
        salleRepo.deleteSalleById(id);
    }
}
