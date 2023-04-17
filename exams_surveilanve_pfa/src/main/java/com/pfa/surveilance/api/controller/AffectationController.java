package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Matiere;
import com.pfa.surveilance.api.model.Prof;
import com.pfa.surveilance.api.service.*;
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
    private final MatiereService matiereService;
    private final SalleService salleService;
    private final SectionService sectionService;




    public AffectationController(AffectationService affectationService,ProfService profService, EmailService emailService, MatiereService matiereService, SalleService salleService, SectionService sectionService) {
        this.affectationService = affectationService;
        this.profService= profService;
        this.emailService=emailService;
        this.matiereService=matiereService;
        this.salleService=salleService;
        this.sectionService=sectionService;
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
        emailService.sendEmail(professor.getEmail(), "Exima", "check your Exima app to see new assignments");
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAffectation);
    }
    @PostMapping("/addMatiere/{affectationId}/{matiereId}")
    public ResponseEntity<Affectation> addMatiereToAffectationByID(@PathVariable("affectationId") Long affectationId,
                                                                     @PathVariable("matiereId") Long matiereId) {
        Affectation a = affectationService.addMatiereToAffectation(affectationId,matiereId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }

    @PostMapping("/addSection/{affectationId}/{sectionId}")
    public ResponseEntity<Affectation> addSectionToAffectationByID(@PathVariable("affectationId") Long affectationId,
                                                                   @PathVariable("sectionId") Long sectionId) {
        Affectation a = affectationService.addSectionToAffectation(affectationId,sectionId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }

    @PostMapping("/addSalle/{affectationId}/{salleId}")
    public ResponseEntity<Affectation> addSalleToAffectationByID(@PathVariable("affectationId") Long affectationId,
                                                                   @PathVariable("salleId") Long salleId) {
        Affectation a = affectationService.addSalleToAffectation(affectationId,salleId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{id}")
    @Transactional
    public void deleteAffectation(@PathVariable Long id) {
        affectationService.deleteAffectation(id);
    }
}
