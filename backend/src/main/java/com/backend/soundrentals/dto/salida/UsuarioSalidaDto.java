package com.backend.soundrentals.dto.salida;


import com.backend.soundrentals.entity.*;
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
public class UsuarioSalidaDto {
    private Long id;
    private String dni;
    private String nombre;
    private String apellido;
    private String celular;
    private String email;
}
