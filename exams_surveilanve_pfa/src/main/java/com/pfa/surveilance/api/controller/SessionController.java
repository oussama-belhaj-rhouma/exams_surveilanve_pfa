package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Section;
import com.pfa.surveilance.api.model.Session;
import com.pfa.surveilance.api.service.SectionService;
import com.pfa.surveilance.api.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("/all")
    public ResponseEntity<List<Session>> getSections(){
        List<Session> s= sessionService.findAllSession();
        return new ResponseEntity<>(s, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Session> getSectionById(@PathVariable Long id){
        Session s= sessionService.findOneSession(id);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }
    @PostMapping("/add")

    public ResponseEntity<Session> addOneSection(@RequestBody Session section){
        Session s= sessionService.addSession(section);
        return new ResponseEntity<>(s, HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<Session> updateSection(@RequestBody Session section) {
        Session s = sessionService.updateSession(section);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public void deleteSection(@PathVariable Long id) {
        sessionService.deleteSession(id);
    }
}


