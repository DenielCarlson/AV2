package facul.AV2.service;


import facul.AV2.model.Curso;
import facul.AV2.repository.CursoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CursoService {

    private final CursoRepository repository;

    public CursoService(CursoRepository repository) {
        this.repository = repository;
    }

    public Curso salvar(Curso curso) {
        return repository.save(curso);
    }

    public List<Curso> listar() {
        return repository.findAll();
    }

    public Curso buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Curso atualizar(Long id, Curso novo) {
        Curso curso = buscarPorId(id);
        if (curso == null) return null;

        curso.setNome(novo.getNome());
        curso.setCargaHoraria(novo.getCargaHoraria());

        return repository.save(curso);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}

