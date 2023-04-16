package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Prof;
import com.pfa.surveilance.api.service.AffectationService;
import com.pfa.surveilance.api.service.EmailService;
import com.pfa.surveilance.api.service.ProfService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/affectation")
public class AffectationController {
    private final AffectationService affectationService;
    private final ProfService profService;
    private final EmailService emailService;


    public AffectationController(AffectationService affectationService,ProfService profService, EmailService emailService) {
        this.affectationService = affectationService;
        this.profService= profService;
        this.emailService=emailService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Affectation>> getAffectationss() {
        List<Affectation> affectations = affectationService.findAllAffectation();
        return new ResponseEntity<>(affectations, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Affectation> getAffectationById(@PathVariable Long id) {
        Affectation affectation = affectationService.findOneAffectation(id);
        return new ResponseEntity<>(affectation, HttpStatus.OK);
    }

    @PostMapping("/add")

    public ResponseEntity<Affectation> addOneAffectation(@RequestBody Affectation affectation) {
        Affectation affectation1 = affectationService.addAffectation(affectation);
        return new ResponseEntity<>(affectation1, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Affectation> updateAffectation(@RequestBody Affectation affectation) {
        Affectation affectation1 = affectationService.updateAffectation(affectation);
        return new ResponseEntity<>(affectation1, HttpStatus.OK);
    }

    @PostMapping("/addProf/{affectationId}/{professorId}")
    public ResponseEntity<Affectation> addProfessorToAffectationByID(@PathVariable("affectationId") Long affectationId,
                                                                                   @PathVariable("professorId") Long professorId) {
        Affectation affectation = affectationService.findOneAffectation(affectationId);

        if (affectation == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        Prof professor = profService.findOneProf(professorId);

        if (professor == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        affectation.getProfessors().add(professor);

        Affectation savedAffectation = affectationService.addAffectation(affectation);
        emailService.sendEmail(professor.getEmail(), "this is the subject", "this is the body");


        return ResponseEntity.status(HttpStatus.CREATED).body(savedAffectation);
    }
    @DeleteMapping("/delete/{id}")
    @Transactional
    public void deleteAffectation(@PathVariable Long id) {
        affectationService.deleteAffectation(id);
    }
}
