package com.backend.soundrentals.dto.salida;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservaSalidaDto {
    private Long id;
    private LocalDate fecha;
    private DjSalidaDto dj;
    private UsuarioSalidaDto usuario;
}
