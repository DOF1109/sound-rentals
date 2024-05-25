package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.UsuarioEntradaDto;
import com.backend.soundrentals.dto.modificacion.UsuarioModificacionDto;
import com.backend.soundrentals.dto.salida.UsuarioSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IUsuarioService {
    UsuarioSalidaDto registrarUsuario(UsuarioEntradaDto usuarioEntradaDto);
    List<UsuarioSalidaDto> listarUsuarios();
    UsuarioSalidaDto buscarUsuarioPorId(Long id) throws ResourceNotFoundException;
    UsuarioSalidaDto actualizarUsuario(UsuarioModificacionDto UsuarioModificacionDto) throws ResourceNotFoundException;
    UsuarioSalidaDto eliminarUsuario(Long id) throws ResourceNotFoundException;
}
