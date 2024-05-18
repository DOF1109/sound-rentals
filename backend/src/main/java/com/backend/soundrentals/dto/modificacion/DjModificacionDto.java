package com.backend.soundrentals.dto.modificacion;

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
@NoArgsConstructor
@AllArgsConstructor
public class DjModificacionDto {
    private Long id;
    private String name;
    private String lastname;
    private Integer dni;
    private String email;
    private List<EstiloSalidaDto> estilos = new ArrayList<>();
}
