package com.backend.soundrentals.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "djs")
public class Dj {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String lastname;
    private String dni;

    @ManyToMany
    @JoinTable(name = "dj_style",
            joinColumns = @JoinColumn(name = "djs_id"),
            inverseJoinColumns = @JoinColumn(name = "style_id")
    )
    private List<Estilo> estilos = new ArrayList<>();
}
