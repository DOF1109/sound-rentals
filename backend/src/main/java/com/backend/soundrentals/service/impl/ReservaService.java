package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.ReservaEntradaDto;
import com.backend.soundrentals.dto.modificacion.ReservaModificacionDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.dto.salida.ReservaSalidaDto;
import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Reserva;
import com.backend.soundrentals.entity.Usuario;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.DjRepository;
import com.backend.soundrentals.repository.ReservaRepository;
import com.backend.soundrentals.repository.UsuarioRepository;
import com.backend.soundrentals.service.EmailService;
import com.backend.soundrentals.service.IRecursoService;
import com.backend.soundrentals.service.IReservaService;
import com.backend.soundrentals.utils.JsonPrinter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@AllArgsConstructor
@Getter
@Setter
@Service
public class ReservaService implements IReservaService {

    private final ReservaRepository reservaRepository;
    private final UsuarioRepository usuarioRepository;
    private final DjRepository djRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Reserva.class);
    private ModelMapper modelMapper;

    @Autowired
    private EmailService emailService;

    @Override
    public ReservaSalidaDto registrarReserva(ReservaEntradaDto reservaEntradaDto) throws BadRequestException,ResourceNotFoundException{

        Usuario usuarioReserva = usuarioRepository.findById(reservaEntradaDto.getUsuario()).orElse(null);

        if(usuarioReserva==null){
            throw new ResourceNotFoundException("El usuario no existe");
        }

        Dj djReserva = djRepository.findById(reservaEntradaDto.getDj()).orElse(null);

        if(djReserva==null){
            throw new ResourceNotFoundException("El dj no existe");
        }

//        for(ReservaSalidaDto reserva : this.listarReservas()){
//            if(reservaEntradaDto.getFecha()==reserva.getFecha() && reservaEntradaDto.getDj()==reserva.getDj().getId()){
//                throw new BadRequestException("Ya existe una reserva para el Dj");
//            }
//        }

        Reserva reservaEntidad = modelMapper.map(reservaEntradaDto,Reserva.class);
        reservaEntidad.setUsuario(usuarioReserva);
        reservaEntidad.setDj(djReserva);

        ReservaSalidaDto reservaSalidaDto = modelMapper.map(reservaRepository.save(reservaEntidad),ReservaSalidaDto.class);

        if (reservaSalidaDto != null) {
            try {
                enviarEmailConfirmacion(reservaSalidaDto);
            } catch (MessagingException | IOException e) {
                LOGGER.info("Error al enviar el email de confirmación: " + e.getMessage(), e);
            }
        }

        return reservaSalidaDto;
    }

    @Override
    public List<ReservaSalidaDto> listarReservas() {
        List<ReservaSalidaDto> djs = reservaRepository.findAll().stream()
                .map(r -> modelMapper.map(r, ReservaSalidaDto.class)).toList();

        return djs;
    }

    @Override
    public ReservaSalidaDto obtenerReservaPorId(Long id) throws ResourceNotFoundException {
        Reserva reservaBuscada = reservaRepository.findById(id).orElse(null);

        if(reservaBuscada==null){
            throw new ResourceNotFoundException("La reserva con id "+ id + " no existe");
        }

        LOGGER.info("Reserva buscada: "+ JsonPrinter.toString(reservaBuscada));

        return modelMapper.map(reservaBuscada,ReservaSalidaDto.class);
    }

    @Override
    public List<ReservaSalidaDto> obtenerReservasPorUsuario(Long id) throws ResourceNotFoundException{
        Usuario usuarioBusqueda = usuarioRepository.findById(id).orElse(null);

        if(usuarioBusqueda==null){
            throw new ResourceNotFoundException("La reserva con id "+ id + " no existe");
        }

        List<ReservaSalidaDto> reservas = reservaRepository.findReservaByUsuario_Id(id).stream()
                .map(r -> modelMapper.map(r, ReservaSalidaDto.class)).toList();

        return reservas;
    }

    @Override
    public ReservaSalidaDto actualizarReserva(ReservaModificacionDto reservaModificacionDto) throws ResourceNotFoundException, BadRequestException {
        Reserva reservaComprobacion = reservaRepository.findById(reservaModificacionDto.getId()).orElse(null);

        if(reservaComprobacion==null){
            throw new ResourceNotFoundException("La reserva no existe");
        }

        Usuario usuarioReserva = usuarioRepository.findById(reservaModificacionDto.getUsuario()).orElse(null);

        if(usuarioReserva==null){
            throw new ResourceNotFoundException("El usuario no existe");
        }

        Dj djReserva = djRepository.findById(reservaModificacionDto.getDj()).orElse(null);

        if(djReserva==null){
            throw new ResourceNotFoundException("El dj no existe");
        }

//        for(ReservaSalidaDto reserva : this.listarReservas()){
//            if(reservaModificacionDto.getFecha()==reserva.getFecha() && reservaModificacionDto.getDj()==reserva.getDj().getId()){
//                throw new BadRequestException("Ya existe una reserva para el Dj");
//            }
//        }

        Reserva reservaEntidad = modelMapper.map(reservaModificacionDto,Reserva.class);
        reservaEntidad.setUsuario(usuarioReserva);
        reservaEntidad.setDj(djReserva);

        return modelMapper.map(reservaRepository.save(reservaEntidad),ReservaSalidaDto.class);
    }

    @Override
    public ReservaSalidaDto eliminarReserva(Long id) throws ResourceNotFoundException {
        Reserva reservaAEliminar = reservaRepository.findById(id).orElse(null);

        LOGGER.info("Reserva eliminada: "+ JsonPrinter.toString(reservaAEliminar));

        if(reservaAEliminar==null){
            throw new ResourceNotFoundException("La reserva con id "+ id + " no existe");
        }

        reservaRepository.delete(reservaAEliminar);

        LOGGER.info("Reserva eliminada: "+ JsonPrinter.toString(reservaAEliminar));

        return modelMapper.map(reservaAEliminar,ReservaSalidaDto.class);
    }

    public void enviarEmailConfirmacion(ReservaSalidaDto reserva) throws MessagingException, IOException {

        // Obtener los valores de la reserva
        String nombreDj = reserva.getDj().getName() + " " + reserva.getDj().getLastname();
        String precioReserva = String.valueOf(reserva.getDj().getCharge());
        String ciudadDj = reserva.getDj().getCiudad().getNombre();
        String fechaInicio = reserva.getStartDate().toString();  // Asegúrate de que toString() devuelve el formato correcto
        String fechaFin = reserva.getEndDate().toString();        // Asegúrate de que toString() devuelve el formato correcto
        String urlImageDj = reserva.getDj().getUrlPic();

        Map<String, String> valores = new HashMap<>();
        valores.put("nombre_dj", nombreDj);
        valores.put("precio_reserva", precioReserva);
        valores.put("ciudad_dj", ciudadDj);
        valores.put("fecha_inicio", fechaInicio);
        valores.put("fecha_fin", fechaFin);
        valores.put("url_image_dj", urlImageDj);

        String recipient = reserva.getUsuario().getEmail();
        String subject = "Confirmación de tu reserva";
        String type = "user_reservation_notify";

        emailService.sendHtmlEmail(recipient, subject, type,valores);
    }

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(ReservaEntradaDto.class, Reserva.class);
        modelMapper.typeMap(ReservaModificacionDto.class, Reserva.class);
        modelMapper.typeMap(Reserva.class, ReservaSalidaDto.class);
        modelMapper.typeMap(Reserva.class, ReservaModificacionDto.class);
    }
}