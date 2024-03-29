package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Salle;
import com.pfa.surveilance.api.service.SalleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/salle")
public class SalleController {
        private final SalleService salleService;

        public SalleController(SalleService salleService) {
            this.salleService = salleService;
        }

        @GetMapping("/all")
        @PreAuthorize("hasRole('ROLE_ADMIN')")

        public ResponseEntity<List<Salle>> getSalles() {
            List<Salle> salles = salleService.findAllSalle();
            return new ResponseEntity<>(salles, HttpStatus.OK);
        }

        @GetMapping("/find/{id}")
        @PreAuthorize("hasRole('ROLE_ADMIN')")

        public ResponseEntity<Salle> getSalleById(@PathVariable Long id) {
            Salle salle = salleService.findOneSalle(id);
            return new ResponseEntity<>(salle, HttpStatus.OK);
        }

        @PostMapping("/add")
        @PreAuthorize("hasRole('ROLE_ADMIN')")

        public ResponseEntity<Salle> addOneSalle(@RequestBody Salle salle) {
            Salle salle1 = salleService.addSalle(salle);
            return new ResponseEntity<>(salle1, HttpStatus.CREATED);
        }

        @PutMapping("/update")
        @PreAuthorize("hasRole('ROLE_ADMIN')")

        public ResponseEntity<Salle> updateSalle(@RequestBody Salle salle) {
            Salle salle1 = salleService.updateSalle(salle);
            return new ResponseEntity<>(salle1, HttpStatus.OK);
        }

        @DeleteMapping("/delete/{id}")
        @PreAuthorize("hasRole('ROLE_ADMIN')")

        @Transactional
        public void deleteSalle(@PathVariable Long id) {
            salleService.deleteSalle(id);
        }
}
