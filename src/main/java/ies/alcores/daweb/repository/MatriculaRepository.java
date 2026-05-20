package ies.alcores.daweb.repository;

import ies.alcores.daweb.model.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    List<Matricula> findByAsignaturaId(long id);
}
