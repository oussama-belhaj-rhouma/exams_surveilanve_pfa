package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Matiere;
import com.pfa.surveilance.api.service.MatiereService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
@RestController
@RequestMapping("/matiere")
public class MatiereController {
    private final MatiereService matiereService;

    public MatiereController(MatiereService matiereService) {
        this.matiereService = matiereService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<List<Matiere>> getMatieres() {
        List<Matiere> matieres = matiereService.findAllMatiere();
        return new ResponseEntity<>(matieres, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Matiere> getMatiereById(@PathVariable Long id) {
        Matiere matiere = matiereService.findOneMatiere(id);
        return new ResponseEntity<>(matiere, HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Matiere> addOneMatiere(@RequestBody Matiere matiere) {
        Matiere matiere1 = matiereService.addMatiere(matiere);
        return new ResponseEntity<>(matiere1, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Matiere> updateMatiere(@RequestBody Matiere matiere) {
        Matiere matiere1 = matiereService.updateMatiere(matiere);
        return new ResponseEntity<>(matiere1, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    @Transactional
    public void deleteMatiere(@PathVariable Long id) {
        matiereService.deleteMatiere(id);
    }
}
