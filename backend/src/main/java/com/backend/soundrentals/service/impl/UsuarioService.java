package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.UsuarioEntradaDto;
import com.backend.soundrentals.dto.modificacion.UsuarioModificacionDto;
import com.backend.soundrentals.dto.salida.UsuarioSalidaDto;
import com.backend.soundrentals.entity.Usuario;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.UsuarioRepository;
import com.backend.soundrentals.service.IUsuarioService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@AllArgsConstructor
@Getter
@Setter
public class UsuarioService implements IUsuarioService {

    private ModelMapper modelMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(UsuarioEntradaDto.class, Usuario.class);
        modelMapper.typeMap(UsuarioModificacionDto.class, Usuario.class);
        modelMapper.typeMap(Usuario.class, UsuarioSalidaDto.class);
        modelMapper.typeMap(Usuario.class, UsuarioModificacionDto.class);
    }

    @Override
    public UsuarioSalidaDto registrarUsuario(UsuarioEntradaDto usuarioEntradaDto) {
        Usuario usuario = modelMapper.map(usuarioEntradaDto, Usuario.class);

        UsuarioSalidaDto usuarioSalidaDto = modelMapper.map(usuarioRepository.save(usuario), UsuarioSalidaDto.class);

        return usuarioSalidaDto;
    }


    @Override
    public List<UsuarioSalidaDto> listarUsuarios() {
        List<UsuarioSalidaDto> usuarios = usuarioRepository.findAll().stream()
                .map(r -> modelMapper.map(r, UsuarioSalidaDto.class)).toList();

        return usuarios;
    }


    public UsuarioSalidaDto buscarUsuarioPorId(Long id) throws ResourceNotFoundException {
        Usuario usuarioBuscado = usuarioRepository.findById(id).orElse(null);

        UsuarioSalidaDto usuarioSalidaDto = null;
        if (usuarioBuscado != null) {
            usuarioSalidaDto = modelMapper.map(usuarioBuscado, UsuarioSalidaDto.class);
        } else {
            throw new ResourceNotFoundException("usuario no encontrado");
        }

        return usuarioSalidaDto;
    }


    @Override
    public UsuarioSalidaDto actualizarUsuario(UsuarioModificacionDto usuarioModificacionDto) throws ResourceNotFoundException {
        Usuario buscarUsuario = usuarioRepository.findById(usuarioModificacionDto.getId()).orElse(null);

        UsuarioSalidaDto usuarioSalidaDto = null;

        if(buscarUsuario!=null){
            Usuario usuarioGuardar = modelMapper.map(usuarioModificacionDto,Usuario.class);
            usuarioSalidaDto = modelMapper.map(usuarioRepository.save(usuarioGuardar),UsuarioSalidaDto.class);
        }
        else {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }

        return usuarioSalidaDto;
    }


    @Override
    public UsuarioSalidaDto eliminarUsuario(Long id) throws ResourceNotFoundException {
            Usuario usuarioEliminar = null;
            usuarioEliminar = modelMapper.map(buscarUsuarioPorId(id),Usuario.class);
            if (usuarioEliminar != null) {
                usuarioRepository.deleteById(id);
            } else {
                throw new ResourceNotFoundException("Usuario no encontrado");
            }
            return modelMapper.map(usuarioEliminar,UsuarioSalidaDto.class);
    }


}
