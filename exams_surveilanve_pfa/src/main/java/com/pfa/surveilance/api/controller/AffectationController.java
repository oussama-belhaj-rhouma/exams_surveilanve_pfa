package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Prof;
import com.pfa.surveilance.api.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

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
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_ETUDIANT') or hasRole('ROLE_PROF')")

    public ResponseEntity<List<Affectation>> getAffectationss() {
        List<Affectation> affectations = affectationService.findAllAffectation();
        return new ResponseEntity<>(affectations, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Affectation> getAffectationById(@PathVariable Long id) {
        Affectation affectation = affectationService.findOneAffectation(id);
        return new ResponseEntity<>(affectation, HttpStatus.OK);
    }
    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN') ")

    public ResponseEntity<Affectation> addOneAffectation(@RequestBody Affectation affectation) {
        Affectation affectation1 = affectationService.addAffectation(affectation);
        return new ResponseEntity<>(affectation1, HttpStatus.CREATED);
    }
    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Affectation> updateAffectation(@RequestBody Affectation affectation) {
        Affectation affectation1 = affectationService.updateAffectation(affectation);
        return new ResponseEntity<>(affectation1, HttpStatus.OK);
    }
    @PostMapping("/addProf/{affectationId}/{professorId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Affectation> addProfessorToAffectationByID(@PathVariable("affectationId") Long affectationId,
                                                                     @PathVariable("professorId") Long professorId) {
        Affectation savedAffectation = affectationService.addProfToAffectation(affectationId, professorId);

        if (savedAffectation == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAffectation);
    }

    @PostMapping("/addMatiere/{affectationId}/{matiereId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Affectation> addMatiereToAffectationByID(@PathVariable("affectationId") Long affectationId,
                                                                     @PathVariable("matiereId") Long matiereId) {
        Affectation a = affectationService.addMatiereToAffectation(affectationId,matiereId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }

    @PostMapping("/addSection/{affectationId}/{sectionId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Affectation> addSectionToAffectationByID(@PathVariable("affectationId") Long affectationId,
                                                                   @PathVariable("sectionId") Long sectionId) {
        Affectation a = affectationService.addSectionToAffectation(affectationId,sectionId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }

    @PostMapping("/addSalle/{affectationId}/{salleId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Affectation> addSalleToAffectationByID(@PathVariable("affectationId") Long affectationId,
                                                                   @PathVariable("salleId") Long salleId) {
        Affectation a = affectationService.addSalleToAffectation(affectationId,salleId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    @Transactional
    public void deleteAffectation(@PathVariable Long id) {
        affectationService.deleteAffectation(id);
    }
}
