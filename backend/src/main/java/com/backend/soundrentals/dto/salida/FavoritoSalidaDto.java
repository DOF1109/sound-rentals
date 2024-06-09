package com.backend.soundrentals.dto.salida;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoritoSalidaDto {
    private Long id;
    private boolean isFavorite;
    private DjSalidaDto dj;
    private UsuarioSalidaDto usuario;
}
