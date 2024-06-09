package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.CalificacionEntradaDto;
import com.backend.soundrentals.dto.entrada.FavoritoEntradaDto;
import com.backend.soundrentals.dto.modificacion.CalificacionModificacionDto;
import com.backend.soundrentals.dto.modificacion.FavoritoModificacionDto;
import com.backend.soundrentals.dto.salida.CalificacionSalidaDto;
import com.backend.soundrentals.dto.salida.FavoritoSalidaDto;
import com.backend.soundrentals.dto.salida.ReservaSalidaDto;
import com.backend.soundrentals.entity.*;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.CalificacionRepository;
import com.backend.soundrentals.repository.DjRepository;
import com.backend.soundrentals.repository.FavoritoRepository;
import com.backend.soundrentals.repository.UsuarioRepository;
import com.backend.soundrentals.service.ICalificacionService;
import com.backend.soundrentals.service.IFavoritoService;
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
public class FavoritoService implements IFavoritoService {

    private final FavoritoRepository favoritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final DjRepository djRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Favorito.class);
    private ModelMapper modelMapper;

    @Override
    public FavoritoSalidaDto registrarFavorito(FavoritoEntradaDto favorito) throws ResourceNotFoundException,BadRequestException{
        Usuario usuarioRegistraFavorito = usuarioRepository.findById(favorito.getUsuario()).orElse(null);

        if(usuarioRegistraFavorito==null){
            throw new ResourceNotFoundException("El usuario no existe");
        }

        Dj djFavorito = djRepository.findById(favorito.getDj()).orElse(null);

        if(djFavorito==null){
            throw new ResourceNotFoundException("El dj no existe");
        }

        Favorito favoritoEntidad = new Favorito();

        for(FavoritoSalidaDto f : this.listarFavoritos()){
            if(f.getUsuario().getId() == favorito.getUsuario() && f.getDj().getId() == favorito.getDj()){
                favoritoEntidad=favoritoRepository.findById(f.getId()).orElse(null);
                break;
            }
        }

        favoritoEntidad.setUsuario(usuarioRegistraFavorito);
        favoritoEntidad.setDj(djFavorito);
        favoritoEntidad.setFavorite(true);

        return modelMapper.map(favoritoRepository.save(favoritoEntidad),FavoritoSalidaDto.class);
    }

    @Override
    public List<FavoritoSalidaDto> listarFavoritos() {
        List<FavoritoSalidaDto> favoritos = favoritoRepository.findAll().stream()
                .map(f -> modelMapper.map(f, FavoritoSalidaDto.class)).toList();

        return favoritos;
    }

    @Override
    public FavoritoSalidaDto buscarFavoritoPorId(Long id) throws ResourceNotFoundException {
        Favorito favoritoBuscado = favoritoRepository.findById(id).orElse(null);

        if(favoritoBuscado==null){
            throw new ResourceNotFoundException("El registro de favorito con id "+ id + " no existe");
        }

        LOGGER.info("Registro favorito buscada: "+ JsonPrinter.toString(favoritoBuscado));

        return modelMapper.map(favoritoBuscado,FavoritoSalidaDto.class);
    }

    @Override
    public FavoritoSalidaDto eliminarFavorito(Long id) throws ResourceNotFoundException {
        Favorito favoritoAEliminar = favoritoRepository.findById(id).orElse(null);

        if(favoritoAEliminar==null){
            throw new ResourceNotFoundException("El registro favorito con id "+ id + " no existe");
        }

        favoritoAEliminar.setFavorite(false);
        FavoritoSalidaDto favoritoSalida = modelMapper.map(favoritoRepository.save(favoritoAEliminar),FavoritoSalidaDto.class);

        LOGGER.info("Favorito deshabilitado: "+ JsonPrinter.toString(favoritoAEliminar));

        return favoritoSalida;
    }

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(FavoritoEntradaDto.class, Favorito.class);
        modelMapper.typeMap(FavoritoModificacionDto.class, Favorito.class);
        modelMapper.typeMap(Favorito.class, FavoritoSalidaDto.class);
        modelMapper.typeMap(Favorito.class, FavoritoModificacionDto.class);
    }
}
