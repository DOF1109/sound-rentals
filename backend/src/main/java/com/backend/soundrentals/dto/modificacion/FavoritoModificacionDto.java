package com.backend.soundrentals.dto.modificacion;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Usuario;
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
public class FavoritoModificacionDto {
    private Long id;
    private boolean isFavorite;
    private Long dj;
    private Long usuario;
}
