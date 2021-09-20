import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  }

  async read(req, res) {
    // TODO
  }

  async create(req, res) {
    console.log(" req.body => ", req.body)
    const alunoCreate = await Aluno.create(req.body);
    res.json(alunoCreate);
  }

  async update(req, res) {
    const alunoUpdate = await Aluno.update(req.body, {
      where: { id: req.body.id }
    });
    res.json(alunoUpdate);
  }

  async delete(req, res) {
    const alunoDelete = await Aluno.destroy({
      where: { id: req.body.id }
    });
    res.json(alunoDelete);
  }
}

export default new AlunoController();
