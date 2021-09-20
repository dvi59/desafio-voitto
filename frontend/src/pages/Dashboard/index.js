import React, { useEffect, useState } from 'react';

import ViaCep from 'node-viacep';
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
import * as assert from 'assert';
import api from '../../services/api';

// styles
import { Container, InitialText } from './styles';

const Dashboard = () => {
  const [alunos, setAlunos] = useState([]);
  const [currentInfo, setCurrentInfo] = useState([]);
  const [modalAlunos, setModalAlunos] = useState(false);
  const [modalInfos, setModalInfos] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [modalCursos, setModalCursos] = useState(false);
  const [currentCurso, setCurrentCurso] = useState([]);
  const [newAlunos, setNewAlunos] = useState({});
  const [cep,setCep] = useState("");
  const [cepInfos,setCepInfos] = useState({});
  const [modalDeleteAlunos, setModalDeleteAlunos] = useState(false);


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

  function createAluno() {
    async function fetchData() {
      try {
        console.log(" newAlunos => ", newAlunos)
        const response = await api.post('/alunosCriar', {
          nome: newAlunos.nome,
          email: newAlunos.email,
          cep: newAlunos.cep,
          cidade: cepInfos.localidade,
          estado: cepInfos.uf,
        });
        console.log('Response>>>', response);
        if (response.data) {
          alert('Aluno cadastrado com sucesso');
        } else {
          alert('Não foi possível cadastrar o aluno');
        }
      } catch {
        alert('Não foi possível cadastrar o aluno');
      }
      setModalAlunos(false);
    }
    fetchData();
  }
  function updAluno(idAluno) {
    async function fetchData() {
      try {
        console.log(" newAlunos => ", newAlunos)
        const response = await api.put('/alunosUpdate', {
          id: idAluno,
          nome: newAlunos.nome,
          email: newAlunos.email,
          cep: newAlunos.cep,
          cidade: cepInfos.localidade,
          estado: cepInfos.uf,
        });
        console.log('Response>>>', response);
        if (response.data) {
          alert('Aluno cadastrado com sucesso');
        } else {
          alert('Não foi possível cadastrar o aluno');
        }
      } catch {
        alert('Não foi possível cadastrar o aluno');
      }
      setModalInfos(false);
    }
    fetchData();
  }

  function deleteAluno(idAluno){
    async function fetchData(){
      try {
        console.log('Aluno >>>>>', currentInfo);
        const response = await api.delete('/alunosDeletar', {data:{
          id: idAluno,
        }});
        console.log('Response >>>>>>>>', response);
        if (response.data) {
          alert('Usuário removido com sucesso');
        } else {
          alert('Não foi possível remover o aluno');
        }
      }catch{
          alert('Não foi possível remover o aluno');
      }
      setModalDeleteAlunos(false);
    }
    fetchData();
  }

  function setCursoAluno(idAluno) {
    async function fetchData() {
      try {
        console.log('currentCurso >>>> ', currentCurso);
        const response = await api.post('/cursoAtribuir', {
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
      setModalCursos(false);
    }
    fetchData();
  }

  const render_modal_info_alunos = () => (
    <Modal open={modalInfos} onClose={() => setModalInfos(false)} closeIcon>
      <Header content={`Editando informações de ${currentInfo.nome}`} />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Nome" placeholder="Nome"  onChange={e =>newAlunos.nome=e.target.value}/>
            <Form.Input fluid label="Email" placeholder="Email" onChange={e =>newAlunos.email=e.target.value}/>
            <Form.Input fluid label="CEP" placeholder="CEP" value={cep}  onChange={e => atribuirCep(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setModalInfos(false)} color="red">
          <Icon name="remove" />
        </Button>
        <Button onClick={() => updAluno(currentInfo.id)} color="green">
          <Icon name="checkmark" />
        </Button>
      </Modal.Actions>
    </Modal>
  );

  const viacep = new ViaCep({
    type: 'json'
  })
  async function pCep(cepx) {
    console.log("cep >>>> ", cepx);
    await viacep.zipCod.getZip(cepx).then(data => data.text())
      .then(data => {
        const cepInfos = JSON.parse(data);
        setCepInfos(cepInfos)
        console.log("cepInfos cidade >>>> ", cepInfos);
      });

  }

  function atribuirCep(cepx){
    setCep(cepx);
    console.log("cep => ", cep);
    console.log("cepx => ", cepx);
    if(cepx.length == 8){
      pCep(cepx);
      newAlunos.cep = cepx;
    }
  }

  const render_modal_add_alunos = () => (
    <Modal open={modalAlunos} onClose={() => setModalAlunos(false)} closeIcon>
      <Header content={`Cadastrando um novo aluno`} />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Nome" placeholder="Nome"  onChange={e =>newAlunos.nome=e.target.value}/>
            <Form.Input fluid label="Email" placeholder="Email" onChange={e =>newAlunos.email=e.target.value}/>
            <Form.Input fluid label="CEP" placeholder="CEP" value={cep}  onChange={e => atribuirCep(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setModalAlunos(false)} color="red">
          <Icon name="remove" />
        </Button>
        <Button onClick={() => atribuirAlu(newAlunos)} color="green">
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
  function atribuirAlu(aluno){
    console.log('aluno', aluno)
    //setNewAlunos(aluno);
    createAluno(aluno);
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
  const render_modal_remove_alunos = () => (
    <Modal open={modalDeleteAlunos} onClose={() => setModalDeleteAlunos(false)} closeIcon>
      <Header content={`Removendo o aluno ${currentInfo.nome}`} />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Header as='h4' textAlign='center'>
              Deseja mesmo executar esta ação?
              <p>Esta alteração não poderá ser desfeita!</p>
            </Header>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setModalDeleteAlunos(false)} color="red">
          <Icon name="remove" />
        </Button>
        <Button onClick={() =>deleteAluno(currentInfo.id)} color="green">
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
  function open_delete_alunos(data_aluno){
    console.log(data_aluno);
    setCurrentInfo(data_aluno);
    setModalDeleteAlunos(true);
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
          trigger={<Button icon="close" negative onClick={()=>open_delete_alunos(data_aluno)}/>}
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
      {render_modal_add_alunos()}
      {render_modal_remove_alunos()}
      <Button primary onClick={() => setModalAlunos(true)}>Adicionar aluno</Button>
      <Button href="/" secondary>
        Ver instruções
      </Button>
    </Container>
  );
};

export default Dashboard;
