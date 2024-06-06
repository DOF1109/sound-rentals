package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.DjEntradaDto;
import com.backend.soundrentals.dto.entrada.EstiloEntradaDto;
import com.backend.soundrentals.dto.modificacion.DjModificacionDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
import com.backend.soundrentals.entity.Caracteristica;
import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.exceptions.UsernameAlreadyExistsException;
import com.backend.soundrentals.repository.CaracteristicaRepository;
import com.backend.soundrentals.repository.DjRepository;
import com.backend.soundrentals.repository.EstiloRepository;
import com.backend.soundrentals.repository.ReservaRepository;
import com.backend.soundrentals.service.IRecursoService;
import com.backend.soundrentals.utils.JsonPrinter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@AllArgsConstructor
@Getter
@Setter
@Service
public class DjService implements IRecursoService {

    private final DjRepository djRepository;
    private final EstiloRepository estiloRepository;
    private final CaracteristicaRepository caracteristicaRepository;
    private final ReservaRepository reservaRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Dj.class);
    private ModelMapper modelMapper;

    @Override
    public DjSalidaDto registrarDj(DjEntradaDto recurso) throws UsernameAlreadyExistsException {
        Dj djEntidad = modelMapper.map(recurso,Dj.class);

        Dj nombreDjYaRegistradoDB = djRepository.findByFullname(recurso.getName(),recurso.getLastname());
        if(nombreDjYaRegistradoDB!=null){
            throw new UsernameAlreadyExistsException("El nombre ya ha sido registrado");
        }

        Dj emailYaRegistradoDb = djRepository.findByEmail(recurso.getEmail());
        if(emailYaRegistradoDb!=null){
            throw new UsernameAlreadyExistsException("El email ya ha sido registrado");
        }

        Dj dniYaRegistradoDb = djRepository.findByDni(recurso.getDni());
        if(dniYaRegistradoDb!=null){
            throw new UsernameAlreadyExistsException("El dni ya ha sido registrado");
        }

        List<Estilo> estilosParaASignar = new ArrayList<>();
        List<Caracteristica> caracteristicasParaASignar = new ArrayList<>();

        for(Long idEstilo : recurso.getEstilos()){
            Estilo estiloEntidad = estiloRepository.findById(idEstilo).orElse(null);
            estilosParaASignar.add(estiloEntidad);
        }

        for(Long idCaracteristica : recurso.getCaracteristicas()){
            Caracteristica caracteristicaEntidad = caracteristicaRepository.findById(idCaracteristica).orElse(null);
            caracteristicasParaASignar.add(caracteristicaEntidad);
        }

        djEntidad.setEstilos(estilosParaASignar);
        djEntidad.setCaracteristicas(caracteristicasParaASignar);

        Dj djGuardado = djRepository.save(djEntidad);

        LOGGER.info("Dj guardado: "+ JsonPrinter.toString(djGuardado));

        DjSalidaDto djSalidaDto = modelMapper.map(djGuardado,DjSalidaDto.class);

        return djSalidaDto;
    }

    @Override
    public List<DjSalidaDto> listarDjs() {
        List<DjSalidaDto> djs = djRepository.findAll().stream()
                .map(d -> modelMapper.map(d, DjSalidaDto.class)).toList();

        Stream<DjSalidaDto> djStream = djs.stream();

        List<DjSalidaDto> randomDjs = djStream
                .sorted((dj1, dj2) -> Double.compare(Math.random(), Math.random()))
                .collect(Collectors.toList());

        LOGGER.info("Listando todos los djs en orden aleatorio");
        return randomDjs;
    }

    @Override
    public List<DjSalidaDto> listarTop10() {
        List<Dj> listaDjTop10 = reservaRepository.findTop10IdDjMasReservados();
        List<DjSalidaDto> listaDjSalida = new ArrayList<>();

        //Si no hay 10 Dj, retorna los que existan.
        if(djRepository.count()<10){
            return listarDjs();
        }

        if(listaDjTop10.isEmpty()){
            //Si no hay top 10 se retorna los primeros 10 dj
            List<DjSalidaDto> djs = djRepository.findAll().stream()
                    .map(d -> modelMapper.map(d, DjSalidaDto.class)).toList();
            for(int i=0;i<10;i++){
                DjSalidaDto dj = djs.get(i);
                listaDjSalida.add(dj);
            }
            return listaDjSalida;
        }


        //Si si hay un top 10 o más
        if(listaDjTop10.size()>=10){
            for(int i=0;i<10;i++){
                Dj dj = listaDjTop10.get(i);
                listaDjSalida.add(modelMapper.map(dj,DjSalidaDto.class));
            }
            return listaDjSalida;
        }
        //Si si hay Dj's reservados, pero no alcanzan a ser 10
        else{
            for(int i=0;i<listaDjTop10.size();i++){
                Dj dj = listaDjTop10.get(i);
                listaDjSalida.add(modelMapper.map(dj,DjSalidaDto.class));
            }

            int cantDjFaltantes = 10 - listaDjSalida.size();
            List<DjSalidaDto> listaTotalDjs = djRepository.findAll().stream()
                    .map(d -> modelMapper.map(d, DjSalidaDto.class)).toList();

            int contador = 0;

            for (int i = 0; i < cantDjFaltantes; i++) {
                DjSalidaDto dj;
                Boolean flag;
                do{
                    flag = false;
                    dj = listaTotalDjs.get(contador);
                    for(int j=0;j<listaDjTop10.size();j++){
                        Dj aux = listaDjTop10.get(j);
                        if(aux.getId()==dj.getId()){
                            flag=true;
                        }
                    }
                    contador++;
                }while(flag);
                listaDjSalida.add(dj);
            }

            return listaDjSalida;
        }
    }

    @Override
    public List<DjSalidaDto> listarDjsPorEstilo(Long id) {
        List<DjSalidaDto> djs = djRepository.findByEstilosId(id).stream()
                .map(d -> modelMapper.map(d, DjSalidaDto.class)).toList();

        LOGGER.info("Listando djs por estilo");
        return djs;
    }


    @Override
    public DjSalidaDto buscarDjPorId(Long id) throws ResourceNotFoundException {
        Dj djBuscado = djRepository.findById(id).orElse(null);

        if(djBuscado==null){
            throw new ResourceNotFoundException("El Dj con id "+ id + " no existe");
        }

        LOGGER.info("Dj buscado: "+ JsonPrinter.toString(djBuscado));

        return modelMapper.map(djBuscado,DjSalidaDto.class);
    }

    @Override
    public DjSalidaDto actualizarDj(DjModificacionDto djModificacionDto) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public DjSalidaDto eliminarDj(Long id) throws ResourceNotFoundException {
        Dj djAEliminar = djRepository.findById(id).orElse(null);

        LOGGER.info("Dj eliminado: "+ JsonPrinter.toString(djAEliminar));

        if(djAEliminar==null){
            throw new ResourceNotFoundException("El Dj con id "+ id + " no existe");
        }

        djRepository.delete(djAEliminar);

        LOGGER.info("Dj eliminado: "+ JsonPrinter.toString(djAEliminar));

        return modelMapper.map(djAEliminar,DjSalidaDto.class);

    }

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(DjEntradaDto.class, Dj.class);
        modelMapper.typeMap(DjModificacionDto.class, Dj.class);
        modelMapper.typeMap(Dj.class, DjSalidaDto.class);
        modelMapper.typeMap(Dj.class, DjModificacionDto.class);
        modelMapper.typeMap(EstiloEntradaDto.class, Estilo.class);
    }
}
