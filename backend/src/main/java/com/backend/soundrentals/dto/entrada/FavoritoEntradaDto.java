package com.backend.soundrentals.dto.entrada;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoritoEntradaDto {
    private Long id;
    private boolean isFavorite;
    private Long dj;
    private Long usuario;
}
