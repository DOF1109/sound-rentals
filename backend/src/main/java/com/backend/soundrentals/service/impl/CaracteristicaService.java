package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.CaracteristicaEntradaDto;
import com.backend.soundrentals.dto.entrada.EstiloEntradaDto;
import com.backend.soundrentals.dto.modificacion.CaracteristicaModificacionDto;
import com.backend.soundrentals.dto.modificacion.EstiloModificacionDto;
import com.backend.soundrentals.dto.salida.CaracteristicaSalidaDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
import com.backend.soundrentals.entity.Caracteristica;
import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.CaracteristicaRepository;
import com.backend.soundrentals.repository.EstiloRepository;
import com.backend.soundrentals.service.ICaracteristicaService;
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
public class CaracteristicaService implements ICaracteristicaService {

    private final CaracteristicaRepository caracteristicaRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Caracteristica.class);
    private ModelMapper modelMapper;

    @Override
    public CaracteristicaSalidaDto registrarCaracteristica(CaracteristicaEntradaDto caracteristica) {
        // Convertir DTO a entidad
        Caracteristica caracteristicaEntidad = modelMapper.map(caracteristica,Caracteristica.class);

        // Guardar la unidad y retornar salida
        CaracteristicaSalidaDto caracteristicaGuardada =  modelMapper.map(caracteristicaRepository.save(caracteristicaEntidad),CaracteristicaSalidaDto.class);
        LOGGER.info("Caracteristica registrada: "+ JsonPrinter.toString(caracteristicaGuardada));
        return caracteristicaGuardada;
    }

    @Override
    public List<CaracteristicaSalidaDto> listarCaracteristicas() {
        List<CaracteristicaSalidaDto> caracteristicas = caracteristicaRepository.findAll().stream()
                .map(c -> modelMapper.map(c, CaracteristicaSalidaDto.class)).toList();
        LOGGER.info("Listado de estilos: "+ JsonPrinter.toString(caracteristicas));
        return caracteristicas;
    }

    @Override
    public CaracteristicaSalidaDto buscarCaracteristicaPorId(Long id) throws ResourceNotFoundException {
        Caracteristica caracteristicaBuscada = caracteristicaRepository.findById(id).orElse(null);

        CaracteristicaSalidaDto caracteristicaSalidaDto = null;
        if (caracteristicaBuscada != null) {
            caracteristicaSalidaDto = modelMapper.map(caracteristicaBuscada, CaracteristicaSalidaDto.class);
            LOGGER.info("Caracteristica encontrada: {}" + JsonPrinter.toString(caracteristicaSalidaDto));
        } else {
            throw new ResourceNotFoundException("El id no se encuentra registrado en la base de datos");
        }
        return caracteristicaSalidaDto;
    }

    @Override
    public CaracteristicaSalidaDto actualizarCaracteristica(CaracteristicaModificacionDto caracteristicaModificacionDto) throws ResourceNotFoundException {
        Caracteristica caracteristicaComprobarExistencia = caracteristicaRepository.findById(caracteristicaModificacionDto.getId()).orElse(null);

        CaracteristicaSalidaDto caracteristicaSalidaDto = null;

        if(caracteristicaComprobarExistencia!=null){
            Caracteristica caracteristicaGuardar = modelMapper.map(caracteristicaModificacionDto,Caracteristica.class);
            caracteristicaSalidaDto = modelMapper.map(caracteristicaRepository.save(caracteristicaGuardar),CaracteristicaSalidaDto.class);
        }
        else{
            throw new ResourceNotFoundException("La caracteristica no existe");
        }

        LOGGER.info("Caracteristica actualizada: " + JsonPrinter.toString(caracteristicaSalidaDto));
        return caracteristicaSalidaDto;
    }

    @Override
    public CaracteristicaSalidaDto eliminarCaracteristica(Long id) throws ResourceNotFoundException {
        Caracteristica caracteristicaAEliminar = null;
        caracteristicaAEliminar = modelMapper.map(buscarCaracteristicaPorId(id),Caracteristica.class);
        if (caracteristicaAEliminar != null) {
            caracteristicaRepository.deleteById(id);
            LOGGER.warn("Se ha eliminado la caracteristica con id: {}", id);
        } else {
            LOGGER.error("No se ha encontrado la caracteristica con id {}", id);
            throw new ResourceNotFoundException("No se ha encontrado la caracteristica con id " + id);
        }
        return modelMapper.map(caracteristicaAEliminar,CaracteristicaSalidaDto.class);
    }

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(CaracteristicaEntradaDto.class, Caracteristica.class);
        modelMapper.typeMap(CaracteristicaModificacionDto.class, Caracteristica.class);
        modelMapper.typeMap(Caracteristica.class, CaracteristicaSalidaDto.class);
        modelMapper.typeMap(Caracteristica.class, CaracteristicaModificacionDto.class);
    }
}
