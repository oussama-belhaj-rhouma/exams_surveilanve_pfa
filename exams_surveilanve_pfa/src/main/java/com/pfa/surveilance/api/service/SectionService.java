package com.pfa.surveilance.api.service;

import com.pfa.surveilance.api.exception.UserNotFoundException;
import com.pfa.surveilance.api.model.Salle;
import com.pfa.surveilance.api.model.Section;
import com.pfa.surveilance.api.repo.SectionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class SectionService {
    private final SectionRepo sectionRepo;
    @Autowired
    public SectionService(SectionRepo sectionRepo) {


        this.sectionRepo = sectionRepo;
    }
    public Section addSection(Section s){
        Section existingSalle = sectionRepo.findSectionBySectionName(s.getSectionName());
        if (existingSalle != null) {
            throw new IllegalArgumentException("Subject with name " + s.getSectionName() + " already exists.");
        }
        return sectionRepo.save(s);
    }
    public List<Section> findAllSections(){
        return sectionRepo.findAll();
    }
    public Section updateSection(Section section) {
        return sectionRepo.save(section);
    }    public Section findOneSection(Long id){
        return sectionRepo.findSectionById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
    @Transactional
    public void removeSection(Long id) {
        Section section = sectionRepo.findById(id).orElseThrow(() -> new RuntimeException("Section not found with id " + id));
        section.getMatieres().clear();
        section.getProfessors().clear();
        section.getCalendriers().clear();
        sectionRepo.save(section);
        sectionRepo.delete(section);
    }
}
