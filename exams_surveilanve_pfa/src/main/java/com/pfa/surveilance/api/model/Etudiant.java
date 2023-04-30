package com.pfa.surveilance.api.model;
import javax.persistence.*;
import java.io.Serializable;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Etudiant implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String username;

    private String email;

    @ManyToOne
    @JoinColumn(name = "sectionion_id")
    private Section section;
}
