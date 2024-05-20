package com.backend.soundrentals.dto.salida;


import com.backend.soundrentals.entity.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;



@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class UsuarioSalidaDto {
    private Long Id;
    private Integer dni;
    private String nombre;
    private String apellido;
    private String celular;
    private String email;
    private String direccion;
    private String img;

    private Pais pais;
    private Provincia provincia;
    private Ciudad ciudad;

    private EstadoUsuario estadoUsuario;
    private Roles rol;
}
