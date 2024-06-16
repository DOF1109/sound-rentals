package com.backend.soundrentals.dto.entrada;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservaEntradaDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long dj;
    private Long usuario;
}