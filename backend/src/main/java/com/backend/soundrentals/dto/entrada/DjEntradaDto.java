package com.backend.soundrentals.dto.entrada;

import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
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
public class DjEntradaDto {
    private Long id;
    private String name;
    private String lastname;
    private Integer dni;
    private String email;
    private List<Long> estilos = new ArrayList<>();
}
