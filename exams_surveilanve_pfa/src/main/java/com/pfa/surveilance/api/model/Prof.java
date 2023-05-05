package com.pfa.surveilance.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import com.pfa.surveilance.security.Models.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Prof implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String prenom;
    private String nom;
    @Column(name = "username", unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    private String password;
    private EGrade grade;
    @ManyToMany(mappedBy = "professors")
    @JsonIgnore
    private List<Affectation> affectations= new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "section_professeurs",
            joinColumns = @JoinColumn(name = "professeur_id"),
            inverseJoinColumns = @JoinColumn(name = "section_id"))
    private List<Section> sections= new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "professeur_matiere",
            joinColumns = @JoinColumn(name = "professeur_id"),
            inverseJoinColumns = @JoinColumn(name = "matiere_id"))
    private List<Matiere> matieres= new ArrayList<>();


}
