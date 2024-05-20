package com.backend.soundrentals.dto.modificacion;

import com.backend.soundrentals.entity.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;


@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioModificacionDto {
    private Long id;
    private Integer dni;
    private String nombre;
    private String apellido;
    private String celular;
    private String email;
    private String password;
    private String direccion;
    private String img;

    private Pais pais;
    private Provincia provincia;
    private Ciudad ciudad;

    private EstadoUsuario estadoUsuario;
    private Roles rol;


}
