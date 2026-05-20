package ies.alcores.daweb.controller;

import ies.alcores.daweb.model.Alumno;
import ies.alcores.daweb.model.Asignatura;
import ies.alcores.daweb.service.AsignaturaService;
import ies.alcores.daweb.service.MatriculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/asignatura")
public class AsignaturaController {

    @Autowired
    private AsignaturaService asignaturaService;

    @Autowired
    private MatriculaService matriculaService;

    @GetMapping
    public ResponseEntity<List<Asignatura>> all(){
        return ResponseEntity.ok(this.asignaturaService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Asignatura> findOne(@PathVariable("id") final long id){
        return this.asignaturaService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("{id}/alumnos")
    public ResponseEntity<List<Alumno>> findAlumnos(@PathVariable("id") final long id){
        return ResponseEntity.ok(this.matriculaService.findAlumnosByAsignaturaId(id));
    }
}
