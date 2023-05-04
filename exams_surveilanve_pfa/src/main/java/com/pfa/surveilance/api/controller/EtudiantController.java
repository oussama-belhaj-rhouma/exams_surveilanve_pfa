package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.model.Etudiant;
import com.pfa.surveilance.api.model.Etudiant;
import com.pfa.surveilance.api.service.EtudiantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/etudiant")
public class EtudiantController {
    private final EtudiantService etudiantService;

    public EtudiantController(EtudiantService etudiantService) {
        this.etudiantService = etudiantService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Etudiant>> getEtudiants() {
        List<Etudiant> etudiants = etudiantService.findAllEtudiant();
        return new ResponseEntity<>(etudiants, HttpStatus.OK);
    }

    @GetMapping("/find/{s}")
    public ResponseEntity<Etudiant> getEtudiantByUsername(@PathVariable String s) {
        Etudiant etudiant = etudiantService.findOneEtudiant(s);
        return new ResponseEntity<>(etudiant, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Etudiant> addOneEtudiant(@RequestBody Etudiant etudiant) {
        Etudiant etudiant1 = etudiantService.addEtudiant(etudiant);
        return new ResponseEntity<>(etudiant1, HttpStatus.CREATED);
    }

    @PostMapping("/addSection/{etudiantId}/{sectionId}")
    public ResponseEntity<Etudiant> addSectionToEtudiantByID(@PathVariable("etudiantId") Long etudiantId,
                                                                   @PathVariable("sectionId") Long sectionId) {
        Etudiant a = etudiantService.addSectionToEtudiant(etudiantId,sectionId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }

    @GetMapping("/Calendriers")
    public List<Calendrier> getCalendrier() {

        return etudiantService.getCalendrier();
    }
    @PutMapping("/update")
    public ResponseEntity<Etudiant> updateEtudiant(@RequestBody Etudiant etudiant) {
        Etudiant etudiant1 = etudiantService.updateEtudiant(etudiant);
        return new ResponseEntity<>(etudiant1, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public void deleteEtudiant(@PathVariable Long id) {
        etudiantService.deleteEtudiant(id);
    }
}


