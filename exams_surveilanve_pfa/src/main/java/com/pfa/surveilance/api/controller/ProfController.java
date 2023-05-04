package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Matiere;
import com.pfa.surveilance.api.model.Prof;
import com.pfa.surveilance.api.service.AffectationService;
import com.pfa.surveilance.api.service.ProfService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PutMapping("/update")
    public ResponseEntity<Prof> updateProf(@RequestBody Prof prof) {
        Prof prof1 = profService.updateProf(prof);
        return new ResponseEntity<>(prof1, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public void deleteProf(@PathVariable Long id) {
        profService.deleteProf(id);
    }
}
