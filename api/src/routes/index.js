import { Router } from 'express';

/** Controllers */
import AlunosController from '../app/controllers/AlunoController';
import CursoController from '../app/controllers/CursoController';
import AlunoCursoController from '../app/controllers/AlunoCursoController';
/**  * */

const routes = new Router();

routes.get('/alunos', AlunosController.index);
routes.get('/cursos', CursoController.index);
routes.post('/cursoAtribuir', AlunoCursoController.create);
routes.post('/alunosCriar', AlunosController.create);

export default routes;
