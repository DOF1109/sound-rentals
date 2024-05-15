package com.backend.soundrentals.dto.salida;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EstiloSalidaDto {
    private Long id;
    private String style;
    private String url;
}
