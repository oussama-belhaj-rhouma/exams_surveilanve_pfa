package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.model.Section;
import com.pfa.surveilance.api.repo.AffectationRepo;
import com.pfa.surveilance.api.repo.CalendrierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
@Transactional

@Service
public class CalendrierService {
    private final CalendrierRepo calendrierRepo;
    private final AffectationRepo affectationRepo;
    @Autowired
    public CalendrierService(CalendrierRepo calendrierRepo, AffectationRepo affectationRepo) {
        this.calendrierRepo = calendrierRepo;
        this.affectationRepo=affectationRepo;
    }
    public Calendrier addCalendrier(Calendrier c){
        return calendrierRepo.save(c);
    }
    public List<Calendrier> findAllCalendrier(){
        return calendrierRepo.findAll();
    }
    public Calendrier updateCalendrier(Calendrier c) {
        return calendrierRepo.save(c);
    }    public Calendrier findOneCalendrier(Long id){
        return calendrierRepo.findCalendrierById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public Calendrier addAffectationToCalendrier(Long calendrierId, Long affectationId) {
        Affectation affectation = affectationRepo.findById(affectationId)
                .orElseThrow(() -> new EntityNotFoundException("affectation not found with ID: " + affectationId));

        Calendrier calendrier = calendrierRepo.findById(calendrierId)
                .orElseThrow(() -> new EntityNotFoundException("Calendrier not found with ID: " + calendrierId));

        if (calendrier.getAffectations().contains(affectation)) {
            return calendrier;
        }
        calendrier.getAffectations().add(affectation);

        Calendrier calendrier1 = calendrierRepo.save(calendrier);
        return calendrier1;


    }
    public void deleteCalendrier(Long id){
        calendrierRepo.deleteCalendrierById(id);
    }
}
