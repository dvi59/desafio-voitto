import Aluno from '../../models/Aluno';
import Curso from '../../models/Curso';
import CursoAluno from '../../models/CursoAluno';

class AtribuirCursoAlunoService {
  async execute({ id_aluno, id_curso }) {
    const atribuir = await CursoAluno.create({
      id_pessoa: id_aluno,
      id_curso: id_curso
    });
    console.log(atribuir);
    return true;
  }
}
export default new AtribuirCursoAlunoService();
