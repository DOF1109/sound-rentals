package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.CalificacionEntradaDto;
import com.backend.soundrentals.dto.entrada.CaracteristicaEntradaDto;
import com.backend.soundrentals.dto.modificacion.CalificacionModificacionDto;
import com.backend.soundrentals.dto.modificacion.CaracteristicaModificacionDto;
import com.backend.soundrentals.dto.salida.CalificacionSalidaDto;
import com.backend.soundrentals.dto.salida.CaracteristicaSalidaDto;
import com.backend.soundrentals.dto.salida.FavoritoSalidaDto;
import com.backend.soundrentals.dto.salida.ReservaSalidaDto;
import com.backend.soundrentals.entity.*;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.*;
import com.backend.soundrentals.service.ICalificacionService;
import com.backend.soundrentals.service.ICaracteristicaService;
import com.backend.soundrentals.utils.JsonPrinter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Service
public class CalificacionService implements ICalificacionService {

    private final CalificacionRepository calificacionRepository;
    private final UsuarioRepository usuarioRepository;
    private final ReservaRepository reservaRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Calificacion.class);
    private ModelMapper modelMapper;

    @Override
    public CalificacionSalidaDto registrarCalificacion(CalificacionEntradaDto calificacion) throws ResourceNotFoundException, BadRequestException {
        Usuario usuarioRegistraFavorito = usuarioRepository.findById(calificacion.getUsuario()).orElse(null);

        if(usuarioRegistraFavorito==null){
            throw new ResourceNotFoundException("El usuario no existe");
        }

        Reserva reservaCalificada = reservaRepository.findById(calificacion.getReserva()).orElse(null);

        if(reservaCalificada==null){
            throw new ResourceNotFoundException("La reserva no existe");
        }

        if(calificacion.getCalificacion()<0 || calificacion.getCalificacion()>5){
            throw new BadRequestException("Calificación inválida");
        }

        Calificacion calificacionEntidad = new Calificacion();

        for(CalificacionSalidaDto c : this.listarCalificaciones()){
            if(c.getUsuario().getId() == calificacion.getUsuario() && c.getReserva().getId() == calificacion.getReserva()){
                calificacionEntidad.setId(c.getId());
                break;
            }
        }

        calificacionEntidad.setUsuario(usuarioRegistraFavorito);
        calificacionEntidad.setReserva(reservaCalificada);
        calificacionEntidad.setCalificacion(calificacion.getCalificacion());

        return modelMapper.map(calificacionRepository.save(calificacionEntidad),CalificacionSalidaDto.class);
    }

    @Override
    public List<CalificacionSalidaDto> listarCalificaciones() {
        List<CalificacionSalidaDto> calificaciones = calificacionRepository.findAll().stream()
                .map(c -> modelMapper.map(c, CalificacionSalidaDto.class)).toList();

        return calificaciones;
    }

    @Override
    public CalificacionSalidaDto buscarCalificacionPorId(Long id) throws ResourceNotFoundException {
        Calificacion calificacionBuscada = calificacionRepository.findById(id).orElse(null);

        if(calificacionBuscada==null){
            throw new ResourceNotFoundException("La calificacion con id "+ id + " no existe");
        }

        LOGGER.info("Calificacion buscada: "+ JsonPrinter.toString(calificacionBuscada));

        return modelMapper.map(calificacionBuscada,CalificacionSalidaDto.class);
    }

    @Override
    public CalificacionSalidaDto eliminarCalificacion(Long id) throws ResourceNotFoundException {
        Calificacion calificacionAEliminar = calificacionRepository.findById(id).orElse(null);

        if(calificacionAEliminar==null){
            throw new ResourceNotFoundException("La calificacion con id "+ id + " no existe");
        }

        calificacionRepository.delete(calificacionAEliminar);

        LOGGER.info("Calificacion eliminada: "+ JsonPrinter.toString(calificacionAEliminar));

        return modelMapper.map(calificacionAEliminar, CalificacionSalidaDto.class);
    }

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(CalificacionEntradaDto.class, Calificacion.class);
        modelMapper.typeMap(CalificacionModificacionDto.class, Calificacion.class);
        modelMapper.typeMap(Calificacion.class, CalificacionSalidaDto.class);
        modelMapper.typeMap(Calificacion.class, CalificacionModificacionDto.class);
    }
}
