package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.service.CalendrierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Calendrier>> getCalendriers() {
        List<Calendrier> calendriers = calendrierService.findAllCalendrier();
        return new ResponseEntity<>(calendriers, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Calendrier> getCalendrierById(@PathVariable Long id) {
        Calendrier calendrier = calendrierService.findOneCalendrier(id);
        return new ResponseEntity<>(calendrier, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Calendrier> addOneCalendrier(@RequestBody Calendrier calendrier) {
        Calendrier calendrier1 = calendrierService.addCalendrier(calendrier);
        return new ResponseEntity<>(calendrier1, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Calendrier> updateCalendrier(@RequestBody Calendrier calendrier) {
        Calendrier calendrier1 = calendrierService.updateCalendrier(calendrier);
        return new ResponseEntity<>(calendrier1, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public void deleteCalendrier(@PathVariable Long id) {
        calendrierService.deleteCalendrier(id);
    }
}