package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.model.Section;
import com.pfa.surveilance.api.model.Session;
import com.pfa.surveilance.api.service.SectionService;
import com.pfa.surveilance.api.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/session")
public class SessionController {
    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Session>> getSections(){
        List<Session> s= sessionService.findAllSession();
        return new ResponseEntity<>(s, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/find/{id}")
    public ResponseEntity<Session> getSectionById(@PathVariable Long id){
        Session s= sessionService.findOneSession(id);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")

    public ResponseEntity<Session> addOneSection(@RequestBody Session section){
        Session s= sessionService.addSession(section);
        return new ResponseEntity<>(s, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/addCalendrier/{sessionId}/{calendrierId}")
    public ResponseEntity<Session> addAffectationToCalendarByID(@PathVariable("sessionId") Long sessionId,
                                                                   @PathVariable("calendrierId") Long calendrierId) {
        Session s = sessionService.addCalendarToSession(sessionId,calendrierId);
        return new ResponseEntity<>(s, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<Session> updateSection(@RequestBody Session section) {
        Session s = sessionService.updateSession(section);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    @Transactional
    public void deleteSection(@PathVariable Long id) {
        sessionService.deleteSession(id);
    }
}


