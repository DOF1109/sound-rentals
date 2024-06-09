package com.backend.soundrentals.dto.entrada;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CalificacionEntradaDto {
    private Long id;
    private Integer calificacion;
    private Long dj;
    private Long usuario;
}
