package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Matiere;
import com.pfa.surveilance.api.model.Prof;
import com.pfa.surveilance.api.service.AffectationService;
import com.pfa.surveilance.api.service.ProfService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/prof")

public class ProfController {


    private final ProfService profService;
    public ProfController(ProfService profService) {
        this.profService = profService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') ")
    @GetMapping("/all")
    public ResponseEntity<List<Prof>> getProfs() {
        List<Prof> profs = profService.findAllProf();
        return new ResponseEntity<>(profs, HttpStatus.OK);
    }
    @GetMapping("/{s}/affectations")
    public ResponseEntity<List<Affectation>> getProfHistory(@PathVariable String s) {
        List<Affectation> affectations = profService.getAffectationsByProfUsername(s);
        return ResponseEntity.ok().body(affectations);
    }

    @PostMapping("/addMatiere/{profId}/{matiereId}")
    public ResponseEntity<Prof> addMatiereToProfByID(@PathVariable("profId") Long profId,
                                                                   @PathVariable("matiereId") Long matiereId) {
        Prof a = profService.addMatiereToProf(profId,matiereId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }

    @PostMapping("/addSection/{profId}/{sectionId}")
    public ResponseEntity<Prof> addSectionToProfByID(@PathVariable("profId") Long profId,
                                                                   @PathVariable("sectionId") Long sectionId) {
        Prof a = profService.addSectionToProf(profId,sectionId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }
    @GetMapping("/find/{s}")

    public ResponseEntity<Prof> getProfByUsername( @PathVariable String s) {
        Prof prof = profService.findOneProf(s);
        return new ResponseEntity<>(prof, HttpStatus.OK);
    }

    @PostMapping("/add")

    public ResponseEntity<Prof> addOneProf(@RequestBody Prof prof) {
        Prof prof1 = profService.addProf(prof);
        return new ResponseEntity<>(prof1, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_PROF') ")
    @PutMapping("/update")
    public ResponseEntity<Prof> updateProf(@RequestBody Prof prof) {
        Prof prof1 = profService.updateProf(prof);
        return new ResponseEntity<>(prof1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfessor(@PathVariable Long id) {
        try {
            profService.removeProf(id);
            return ResponseEntity.ok().body("Professor with id " + id + " was deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
