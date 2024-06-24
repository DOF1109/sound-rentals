package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.UsuarioEntradaDto;
import com.backend.soundrentals.dto.modificacion.UsuarioModificacionDto;
import com.backend.soundrentals.dto.salida.UsuarioSalidaDto;
import com.backend.soundrentals.entity.Reserva;
import com.backend.soundrentals.entity.Usuario;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.UsuarioRepository;
import com.backend.soundrentals.service.EmailService;
import com.backend.soundrentals.service.IUsuarioService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import javax.validation.constraints.Email;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;

@Service
@AllArgsConstructor
@Getter
@Setter
public class UsuarioService implements IUsuarioService {

    private ModelMapper modelMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    private final Logger LOGGER = LoggerFactory.getLogger(Reserva.class);

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(UsuarioEntradaDto.class, Usuario.class);
        modelMapper.typeMap(UsuarioModificacionDto.class, Usuario.class);
        modelMapper.typeMap(Usuario.class, UsuarioSalidaDto.class);
        modelMapper.typeMap(Usuario.class, UsuarioModificacionDto.class);
    }

    @Override
    public UsuarioSalidaDto registrarUsuario(UsuarioEntradaDto usuarioEntradaDto) throws MessagingException, IOException, BadRequestException {
        Usuario usuarioComprobacion = usuarioRepository.findByEmail(usuarioEntradaDto.getEmail());

        if(usuarioComprobacion!=null){
            throw new BadRequestException("El correo ya fue registrado");
        }

        Usuario usuario = modelMapper.map(usuarioEntradaDto, Usuario.class);

        UsuarioSalidaDto usuarioSalidaDto = modelMapper.map(usuarioRepository.save(usuario), UsuarioSalidaDto.class);

        if (usuarioSalidaDto != null) {
            try {
                enviarEmailConfirmacion(usuarioSalidaDto);
            } catch (MessagingException | IOException e) {
                LOGGER.info("Error al enviar el email de confirmación: " + e.getMessage(), e);
            }
        }

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
            throw new ResourceNotFoundException("Usuario no encontrado");
        }

        return usuarioSalidaDto;
    }

    @Override
    public UsuarioSalidaDto buscarUsuarioPorEmail(String email) throws ResourceNotFoundException {
        Usuario usuarioBuscado = usuarioRepository.findByEmail(email);

        UsuarioSalidaDto usuarioSalidaDto = null;
        if (usuarioBuscado != null) {
            usuarioSalidaDto = modelMapper.map(usuarioBuscado, UsuarioSalidaDto.class);
        } else {
            throw new ResourceNotFoundException("Usuario no encontrado");
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

    public void enviarEmailConfirmacion(UsuarioSalidaDto usuarioSalidaDto) throws MessagingException, IOException {
        String recipient = usuarioSalidaDto.getEmail();
        String subject = "Bienvenido " + usuarioSalidaDto.getNombre() + "!";
        String type = "user_register_notify";

        emailService.sendHtmlEmail(recipient, subject, type, null);
    }

}
