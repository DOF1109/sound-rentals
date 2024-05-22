package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.EstiloEntradaDto;
import com.backend.soundrentals.dto.entrada.DjEntradaDto;
import com.backend.soundrentals.dto.modificacion.EstiloModificacionDto;
import com.backend.soundrentals.dto.modificacion.DjModificacionDto;
import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.EstiloRepository;
import com.backend.soundrentals.service.IEstiloService;
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
public class EstiloService implements IEstiloService {

    private final EstiloRepository estiloRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Estilo.class);
    private ModelMapper modelMapper;

    @Override
    public EstiloSalidaDto registrarEstilo(EstiloEntradaDto estilo) {
        // Convertir DTO a entidad
        Estilo estiloEntidad = modelMapper.map(estilo,Estilo.class);

        // Guardar la unidad y retornar salida
        EstiloSalidaDto estiloGuardado =  modelMapper.map(estiloRepository.save(estiloEntidad),EstiloSalidaDto.class);
        LOGGER.info("Estilo registrado: "+ JsonPrinter.toString(estiloGuardado));
        return estiloGuardado;
    }

    @Override
    public List<EstiloSalidaDto> listarEstilos() {
        List<EstiloSalidaDto> estilos = estiloRepository.findAll().stream()
                .map(r -> modelMapper.map(r, EstiloSalidaDto.class)).toList();
        LOGGER.info("Listado de estilos: "+ JsonPrinter.toString(estilos));
        return estilos;
    }

    @Override
    public EstiloSalidaDto buscarEstiloPorId(Long id) throws ResourceNotFoundException {
        Estilo estiloBuscado = estiloRepository.findById(id).orElse(null);

        EstiloSalidaDto estiloSalidaDto = null;
        if (estiloBuscado != null) {
            estiloSalidaDto = modelMapper.map(estiloBuscado, EstiloSalidaDto.class);
            LOGGER.info("Estilo encontrado: {}" + JsonPrinter.toString(estiloSalidaDto));
        } else {
            throw new ResourceNotFoundException("El id no se encuentra registrado en la base de datos");
        }

        return estiloSalidaDto;
    }

    @Override
    public EstiloSalidaDto actualizarEstilo(EstiloModificacionDto estiloModificacionDto) throws ResourceNotFoundException {
        Estilo estiloComprobarExistencia = estiloRepository.findById(estiloModificacionDto.getId()).orElse(null);

        EstiloSalidaDto estiloSalidaDto = null;

        if(estiloComprobarExistencia!=null){
            Estilo estiloGuardar = modelMapper.map(estiloModificacionDto,Estilo.class);
            estiloSalidaDto = modelMapper.map(estiloRepository.save(estiloGuardar),EstiloSalidaDto.class);
        }
        else{
            throw new ResourceNotFoundException("El estilo no existe");
        }

        LOGGER.info("Estilo actualizado: " + JsonPrinter.toString(estiloSalidaDto));
        return estiloSalidaDto;
    }

    @Override
    public EstiloSalidaDto eliminarEstilo(Long id) throws ResourceNotFoundException {
        Estilo estiloAEliminar = null;
        estiloAEliminar = modelMapper.map(buscarEstiloPorId(id),Estilo.class);
        if (estiloAEliminar != null) {
            estiloRepository.deleteById(id);
            LOGGER.warn("Se ha eliminado la unidad con id: {}", id);
        } else {
            LOGGER.error("No se ha encontrado el recurso con id {}", id);
            throw new ResourceNotFoundException("No se ha encontrado el recurso con id " + id);
        }
        return modelMapper.map(estiloAEliminar,EstiloSalidaDto.class);
    }


    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(EstiloEntradaDto.class, Estilo.class);
        modelMapper.typeMap(EstiloModificacionDto.class, Estilo.class);
        modelMapper.typeMap(Estilo.class, EstiloSalidaDto.class);
        modelMapper.typeMap(Estilo.class, EstiloModificacionDto.class);
        modelMapper.typeMap(Dj.class, DjSalidaDto.class);
    }
}
