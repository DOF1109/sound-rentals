package com.backend.soundrentals.dto.entrada;

import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
import com.backend.soundrentals.entity.Caracteristica;
import com.backend.soundrentals.entity.Ciudad;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DjEntradaDto {
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
    private List<Long> estilos = new ArrayList<>();
    private List<Long> caracteristicas = new ArrayList<>();
    private Long ciudad;
}
