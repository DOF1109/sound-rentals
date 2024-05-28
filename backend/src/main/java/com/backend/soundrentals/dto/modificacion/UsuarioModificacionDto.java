package com.backend.soundrentals.dto.modificacion;

import com.backend.soundrentals.entity.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Optional;


@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioModificacionDto {
    @NotNull(message = "ID es requerido")
    private Long id;

    @NotNull(message = "DNI es requerido")
    private String dni;

    @NotNull(message = "Nombre es requerido")
    @Size(min = 1, message = "Nombre no puede estar vacio")
    private String nombre;

    @NotNull(message = "Apellido es requerido")
    @Size(min = 1, message = "Apellido no puede estar vacio")
    private String apellido;

    private String celular;

    @NotNull(message = "Email es requerido")
    @Email(message = "Email debe tener un formato válido")
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
