package com.backend.soundrentals.dto.salida;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CalificacionSalidaDto {
    private Long id;
    private Integer calificacion;
    private ReservaSalidaDto reserva;
    private UsuarioSalidaDto usuario;
}
