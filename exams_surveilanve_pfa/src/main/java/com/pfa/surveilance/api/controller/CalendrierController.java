package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Affectation;
import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.service.CalendrierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/calendrier")
public class CalendrierController {
    private final CalendrierService calendrierService;

    public CalendrierController(CalendrierService calendrierService) {
        this.calendrierService = calendrierService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_ETUDIANT')")

    public ResponseEntity<List<Calendrier>> getCalendriers() {
        List<Calendrier> calendriers = calendrierService.findAllCalendrier();
        return new ResponseEntity<>(calendriers, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/find/{id}")
    public ResponseEntity<Calendrier> getCalendrierById(@PathVariable Long id) {
        Calendrier calendrier = calendrierService.findOneCalendrier(id);
        return new ResponseEntity<>(calendrier, HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Calendrier> addOneCalendrier(@RequestBody Calendrier calendrier) {
        Calendrier calendrier1 = calendrierService.addCalendrier(calendrier);
        return new ResponseEntity<>(calendrier1, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Calendrier> updateCalendrier(@RequestBody Calendrier calendrier) {
        Calendrier calendrier1 = calendrierService.updateCalendrier(calendrier);
        return new ResponseEntity<>(calendrier1, HttpStatus.OK);
    }

    @PostMapping("/addAffectation/{calendrierId}/{affectaionId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Calendrier> addAffectationToCalendrierByID(@PathVariable("calendrierId") Long calendrierId,
                                                                     @PathVariable("affectaionId") Long affectaionId) {
        Calendrier savedCalendrier = calendrierService.addAffectationToCalendrier(calendrierId, affectaionId);

        if (savedCalendrier == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedCalendrier);
    }

    @PostMapping("/addSection/{celendrierId}/{sectionId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Calendrier> addSectionToCalendrierByID(@PathVariable("celendrierId") Long celendrierId,
                                                                 @PathVariable("sectionId") Long sectionId) {
        Calendrier a = calendrierService.addSectionToCalendrier(celendrierId,sectionId);
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    @Transactional
    public void deleteCalendrier(@PathVariable Long id) {
        calendrierService.deleteCalendrier(id);
    }
}
