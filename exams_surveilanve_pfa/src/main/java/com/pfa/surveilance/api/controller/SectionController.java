package com.pfa.surveilance.api.controller;

import com.pfa.surveilance.api.model.Section;
import com.pfa.surveilance.api.service.SectionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/section")
public class SectionController {
    private final SectionService sectionService;

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }
    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<List<Section>> getSections(){
        List<Section> sections= sectionService.findAllSections();
        return new ResponseEntity<>(sections, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Section> getSectionById(@PathVariable Long id){
        Section section= sectionService.findOneSection(id);
        return new ResponseEntity<>(section, HttpStatus.OK);
    }
    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Section> addOneSection(@RequestBody Section section){
        Section section1= sectionService.addSection(section);
        return new ResponseEntity<>(section1, HttpStatus.CREATED);
    }
    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Section> updateSection(@RequestBody Section section) {
        Section section1 = sectionService.updateSection(section);
        return new ResponseEntity<>(section1, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    @Transactional
    public void deleteSection(@PathVariable Long id) {
        sectionService.deleteSection(id);
    }


}
