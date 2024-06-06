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
    private Integer dni;
    private String name;
    private String lastname;
    private String phone;
    private String email;
    private String address;
    private Integer charge;
    private String comment;
    private String sample1;
    private String sample2;
    private String urlPic;
    private String urlImg1;
    private String urlImg2;
    private String urlImg3;
    private String urlImg4;
    private String urlImg5;

    @ManyToMany
    @JoinTable(name = "dj_style",
            joinColumns = @JoinColumn(name = "dj_id"),
            inverseJoinColumns = @JoinColumn(name = "style_id")
    )
    private List<Estilo> estilos = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "dj_characteristic",
            joinColumns = @JoinColumn(name = "dj_id"),
            inverseJoinColumns = @JoinColumn(name = "characteristic_id")
    )
    private List<Caracteristica> caracteristicas = new ArrayList<>();
}
