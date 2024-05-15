package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.ReservaEntradaDto;
import com.backend.soundrentals.dto.modificacion.ReservaModificacionDto;
import com.backend.soundrentals.dto.salida.ReservaSalidaDto;
import com.backend.soundrentals.entity.Reserva;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.ReservaRepository;
import com.backend.soundrentals.service.IRecursoService;
import com.backend.soundrentals.service.IReservaService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
public class ReservaService implements IReservaService {

    private final ReservaRepository reservaRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Reserva.class);
    private ModelMapper modelMapper;



    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(ReservaEntradaDto.class, Reserva.class);
        modelMapper.typeMap(ReservaModificacionDto.class, Reserva.class);
        modelMapper.typeMap(Reserva.class, ReservaSalidaDto.class);
        modelMapper.typeMap(Reserva.class, ReservaModificacionDto.class);
    }

    @Override
    public ReservaSalidaDto registrarReserva(ReservaEntradaDto reservasEntradaDto) {
        return null;
    }

    @Override
    public List<ReservaSalidaDto> listarReservas() {
        return null;
    }

    @Override
    public ReservaSalidaDto obtenerReservaPorId(Long id) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public ReservaSalidaDto actualizarReserva(ReservaModificacionDto reservaModificacionDto) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public ReservaSalidaDto eliminarReserva(Long id) throws ResourceNotFoundException {
        return null;
    }
}
