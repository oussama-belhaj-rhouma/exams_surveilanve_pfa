package com.pfa.surveilance.api.model;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
//import

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Section implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String sectionName;
    @ManyToMany
    @JoinTable(
            name = "section_matiere",
            joinColumns = @JoinColumn(name = "section_id"),
            inverseJoinColumns = @JoinColumn(name = "matiere_id")
    )
    private List<Matiere> matieres= new ArrayList<>();
    @JsonIgnore
    @ManyToMany( mappedBy = "sections")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Prof> professors= new ArrayList<>();

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Calendrier> calendriers = new ArrayList<>();

}
