package com.pfa.surveilance.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Affectation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String name;
    private LocalDate dayy;
    private String startTime;
    private String finishTime;
    private String code;
    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;
    @ManyToMany
    @JoinTable(
            name = "professeurs_affectation",
            joinColumns = @JoinColumn(name = "affectaion_id"),
            inverseJoinColumns = @JoinColumn(name = "professeur_id")
    )
    private List<Prof> professors= new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "calendrier_id")
    @JsonIgnore
    private Calendrier calendrier;

    @ManyToOne
    @JoinColumn(name = "matiere_id")
    private Matiere matiere;

    @ManyToOne
    @JoinColumn(name = "salle_id")
    private Salle salle;
}
