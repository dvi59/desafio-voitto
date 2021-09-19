import CursoAluno from '../models/CursoAluno';

class AlunoCursoController {
  async index(req, res) {
    const cursoAluno = await CursoAluno.findAll();
    res.json(cursoAluno);
  }

  async create(req, res) {
    const resposta = await CursoAluno.create({
      id_pessoa: req.body.id_aluno,
      id_curso: req.body.id_curso
    });
    res.json(resposta);
  }
}
export default new AlunoCursoController();
