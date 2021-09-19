import React, { useEffect, useState } from 'react';

// components
import {
  Table,
  Button,
  Popup,
  Modal,
  Header,
  Icon,
  Form,
} from 'semantic-ui-react';

// services
import { getKeyValue } from 'eslint-plugin-react/lib/util/ast';
import api from '../../services/api';

// styles
import { Container, InitialText } from './styles';

const Dashboard = () => {
  const [alunos, setAlunos] = useState([]);
  const [currentInfo, setCurrentInfo] = useState([]);
  const [modalInfos, setModalInfos] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [modalCursos, setModalCursos] = useState(false);
  const [alunoCurso, setAlunoCurso] = useState([]);
  const [currentCurso, setCurrentCurso] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/alunos');
        setAlunos(response.data);
        const resp = await api.get('/cursos');
        setCursos(resp.data);
      } catch {
        alert('Confira a api');
      }
    }
    fetchData();
  }, []);

  function setCursoAluno(idAluno) {
    async function fetchData() {
      try {
        console.log('currentCurso >>>> ', currentCurso);
        const response = await api.post('/cursoAluno', {
          id_aluno: idAluno,
          id_curso: currentCurso,
        });
        console.log('response >>>> ', response);
        if (response.data) {
          alert('Adicionado com sucesso!');
        } else {
          alert('Não foi possível adicionar o curso');
        }
      } catch {
        alert('Não foi possível  adicionado o curso');
      }
    }
    fetchData();
  }

  const render_modal_info_alunos = () => (
    <Modal open={modalInfos} onClose={() => setModalInfos(false)} closeIcon>
      <Header content={`Editando informações de ${currentInfo.nome}`} />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Nome" placeholder="Nome" />
            <Form.Input fluid label="Email" placeholder="Email" />
            <Form.Input fluid label="CEP" placeholder="CEP" />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setModalInfos(false)} color="red">
          <Icon name="remove" />
        </Button>
        <Button onClick={() => setModalInfos(false)} color="green">
          <Icon name="checkmark" />
        </Button>
      </Modal.Actions>
    </Modal>
  );

  const curso_option = cursos.map(x => ({
    key: x.id,
    value: x.id,
    text: x.nome,
  }));

  function setCurso(curso) {
    console.log(' curso >>>>', curso);
    setCurrentCurso(curso);
  }

  const render_modal_info_cursos = () => (
    <Modal open={modalCursos} onClose={() => setModalCursos(false)} closeIcon>
      <Header content={`Adcionando curso para : ${currentInfo.nome}`} />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              label="Curso"
              placeholder="Curso"
              options={curso_option}
              value={currentCurso}
              onChange={(e, { value }) => setCurso(value)}
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setModalCursos(false)} color="red">
          <Icon name="remove" />
        </Button>
        <Button onClick={() => setCursoAluno(currentInfo.id)} color="green">
          <Icon name="checkmark" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
  function open_info_alunos(data_aluno) {
    console.log(data_aluno);
    setCurrentInfo(data_aluno);
    setModalInfos(true);
  }
  function open_curso(data_aluno) {
    console.log(data_aluno);
    setCurrentInfo(data_aluno);
    setModalCursos(true);
  }

  function render_actions(data_aluno) {
    return (
      <center>
        <Popup
          trigger={
            <Button icon="edit" onClick={() => open_info_alunos(data_aluno)} />
          }
          content="Editar informações"
          basic
        />
        <Popup
          trigger={(
            <Button
              icon="plus"
              onClick={() => open_curso(data_aluno)}
              positive
            />
          )}
          content="Adicionar curso para aluno"
          basic
        />
        <Popup
          trigger={<Button icon="close" negative />}
          content="Excluir aluno"
          basic
        />
      </center>
    );
  }

  function render_alunos() {
    return alunos.map(v => (
      <Table.Row>
        <Table.Cell>{v.id}</Table.Cell>
        <Table.Cell>{v.nome}</Table.Cell>
        <Table.Cell>{v.email}</Table.Cell>
        <Table.Cell>{v.cep}</Table.Cell>
        <Table.Cell>{render_actions(v)}</Table.Cell>
      </Table.Row>
    ));
  }
  /* function render_cursos() {
    return cursos.map(x => (
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Curso"
            placeholder="Curso"
            options={x.nome}
          />
        </Form.Group>
      </Form>
    ));
  } */
  return (
    <Container>
      <InitialText>Administrador de alunos</InitialText>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID Aluno</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>CEP</Table.HeaderCell>
            <Table.HeaderCell>Ações</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {alunos.length > 0 ? (
            render_alunos()
          ) : (
            <h2>Nenhum dado registrado </h2>
          )}
        </Table.Body>
      </Table>
      {render_modal_info_alunos()}
      {render_modal_info_cursos()}
      <Button primary>Adicionar aluno</Button>
      <Button href="/" secondary>
        Ver instruções
      </Button>
    </Container>
  );
};

export default Dashboard;
