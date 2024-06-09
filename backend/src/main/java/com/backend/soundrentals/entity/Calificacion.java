package com.backend.soundrentals.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rating")
public class Calificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rate")
    private Integer calificacion;

    @ManyToOne
    @JoinColumn(name = "dj_id")
    private Dj dj;

    @ManyToOne
    @JoinColumn(name = "_user_id")
    private Usuario usuario;
}
