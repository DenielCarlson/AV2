package facul.AV2.service;

import facul.AV2.model.Aluno;
import facul.AV2.model.Curso;
import facul.AV2.repository.AlunoRepository;
import facul.AV2.repository.CursoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepo;
    private final CursoRepository cursoRepo;

    public AlunoService(AlunoRepository alunoRepo, CursoRepository cursoRepo) {
        this.alunoRepo = alunoRepo;
        this.cursoRepo = cursoRepo;
    }

    public Aluno salvar(Aluno aluno) {
        if (aluno.getCurso() != null && aluno.getCurso().getId() != null) {
            Curso curso = cursoRepo.findById(aluno.getCurso().getId()).orElse(null);
            aluno.setCurso(curso);
        }
        return alunoRepo.save(aluno);
    }

    public List<Aluno> listar() {
        return alunoRepo.findAll();
    }

    public Aluno buscarPorId(Long id) {
        return alunoRepo.findById(id).orElse(null);
    }

    public Aluno atualizar(Long id, Aluno novo) {
        Aluno aluno = buscarPorId(id);
        if (aluno == null) return null;

        aluno.setNome(novo.getNome());
        aluno.setCurso(novo.getCurso());
        aluno.setEmail(novo.getEmail());
        aluno.setMatricula(novo.getMatricula());

        if (novo.getCurso() != null && novo.getCurso().getId() != null) {
            Curso curso = cursoRepo.findById(novo.getCurso().getId()).orElse(null);
            aluno.setCurso(curso);
        }

        return alunoRepo.save(aluno);
    }

    public void deletar(Long id) {
        alunoRepo.deleteById(id);
    }
}

