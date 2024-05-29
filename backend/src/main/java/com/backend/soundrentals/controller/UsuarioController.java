package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.UsuarioEntradaDto;
import com.backend.soundrentals.dto.modificacion.UsuarioModificacionDto;
import com.backend.soundrentals.dto.salida.UsuarioSalidaDto;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.service.IUsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/usuarios")
public class UsuarioController {

    private final IUsuarioService usuarioService;


    @PostMapping("/registrar")
    public ResponseEntity<UsuarioSalidaDto> registrarUsuario(@Valid @RequestBody UsuarioEntradaDto usuarioEntradaDto) throws MessagingException, IOException, BadRequestException {
        return new ResponseEntity<>(usuarioService.registrarUsuario(usuarioEntradaDto), HttpStatus.CREATED);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<UsuarioSalidaDto> buscarUsuarioPorId(@PathVariable Long id) throws ResourceNotFoundException {
//        return new ResponseEntity<>(usuarioService.buscarUsuarioPorId(id), HttpStatus.OK);
//    }

    @GetMapping("/{email}")
    public ResponseEntity<UsuarioSalidaDto> buscarUsuarioPorEmail(@PathVariable String email) throws ResourceNotFoundException {
        return new ResponseEntity<>(usuarioService.buscarUsuarioPorEmail(email), HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<UsuarioSalidaDto>> listarUsuarios() {
        return new ResponseEntity<>(usuarioService.listarUsuarios(), HttpStatus.OK);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<UsuarioSalidaDto> actualizarUsuario(@Valid @RequestBody UsuarioModificacionDto usuarioModificacionDto) throws ResourceNotFoundException {
        return new ResponseEntity<>(usuarioService.actualizarUsuario(usuarioModificacionDto), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) throws ResourceNotFoundException {
        usuarioService.eliminarUsuario(id);
        return new ResponseEntity<>("Usuario eliminado con éxito", HttpStatus.OK);
    }
}
