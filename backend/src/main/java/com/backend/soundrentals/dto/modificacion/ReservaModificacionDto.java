package com.backend.soundrentals.dto.modificacion;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservaModificacionDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long dj;
    private Long usuario;
}
