package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.model.Session;
import com.pfa.surveilance.api.repo.CalendrierRepo;
import com.pfa.surveilance.api.repo.SessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Transactional

@Service
public class SessionService {
    private final SessionRepo sessionRepo;
    private final CalendrierRepo calendrierRepo;

    @Autowired
    public SessionService(SessionRepo sessionRepo, CalendrierRepo calendrierRepo) {

        this.sessionRepo = sessionRepo;
        this.calendrierRepo=calendrierRepo;
    }
    public Session addSession(Session c){
        return sessionRepo.save(c);
    }
    public List<Session> findAllSession(){
        return sessionRepo.findAll();
    }
    public Session updateSession(Session c) {
        return sessionRepo.save(c);
    }    public Session findOneSession(Long id){
        return sessionRepo.findSessionById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public Session addCalendarToSession(Long sessionId, Long calendrierId) {
        Session session = sessionRepo.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("session not found with ID: " + sessionId));

        Calendrier calendrier = calendrierRepo.findCalendrierById(calendrierId)
                .orElseThrow(() -> new EntityNotFoundException("Calendrier not found with ID: " + calendrierId));

        session.getCalendriers().add(calendrier);
        return sessionRepo.save(session);

    }
    public void deleteSession(Long id){
        sessionRepo.deleteSessionById(id);
    }
}