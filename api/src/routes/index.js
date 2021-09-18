import { Router } from 'express';

/** Controllers */
import AlunosController from '../app/controllers/AlunoController';
import CursoController from '../app/controllers/CursoController';
/**  * */

const routes = new Router();

routes.get('/alunos', AlunosController.index);
routes.get('/cursos', CursoController.index);

export default routes;
