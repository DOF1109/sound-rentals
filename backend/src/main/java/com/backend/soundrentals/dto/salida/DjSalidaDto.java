package com.backend.soundrentals.dto.salida;

import com.backend.soundrentals.entity.Estilo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DjSalidaDto {
    private Long id;
    private String name;
    private String lastname;
    private String dni;
    private List<EstiloSalidaDto> estilos = new ArrayList<>();
}
