package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.repo.CalendrierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Transactional

@Service
public class CalendrierService {
    private final CalendrierRepo calendrierRepo;
    @Autowired
    public CalendrierService(CalendrierRepo calendrierRepo) {
        this.calendrierRepo = calendrierRepo;
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
    public void deleteCalendrier(Long id){
        calendrierRepo.deleteCalendrierById(id);
    }
}
