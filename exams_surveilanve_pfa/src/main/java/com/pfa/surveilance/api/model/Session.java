package com.pfa.surveilance.api.model;

import javax.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(unique = true,length = 20)
    private ESession session;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "session")
    private List<Calendrier> calendrier= new ArrayList<>();

}
