import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Nav} from 'react-bootstrap';








function Home() {



  const dataUsuarios = [
    { id: 1, nome: "Login do Google", email: "Rafael@gmail.com", senha: "rafael321" },
   
  ];

  const [data, setData] = useState(dataUsuarios);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [userSeleccionado, setuserSeleccionado] = useState({
    id: '',
    nome: '',
    email: '',
    senha: ''

  });

  const seleccionarUser=(elemento, caso)=>{
setuserSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setuserSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(user=>{
      if(user.id===userSeleccionado.id){
        user.email=userSeleccionado.email;
        user.nome=userSeleccionado.nome;
        user.senha=userSeleccionado.senha;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(user=>user.id!==userSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setuserSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=userSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h1>Account Manager</h1>
    
      <Nav variant='tabs'>
            
            <Nav.Link as={Link} to='/'>Sair</Nav.Link>
            
        </Nav>


      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Inserir</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Login</th>
            <th>E-mail</th>
            <th>Senha</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nome}</td>
              <td>{elemento.email}</td>
              <td>{elemento.senha}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarUser(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarUser(elemento, 'Eliminar')}>Apagar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Login</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={userSeleccionado && userSeleccionado.id}
            />
            <br />

            <label>Nome</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              value={userSeleccionado && userSeleccionado.nome}
              onChange={handleChange}
            />
            <br />

            <label>E-mail</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSeleccionado && userSeleccionado.email}
              onChange={handleChange}
            />
            <br />

            <label>Senha</label>
            <input
              className="form-control"
              type="text"
              name="senha"
              value={userSeleccionado && userSeleccionado.senha}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Atualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Vôce realmente deseja apagar este item? {userSeleccionado && userSeleccionado.nome}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sim
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Inserir Login</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Nome do Login</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              value={userSeleccionado ? userSeleccionado.nome: ''}
              onChange={handleChange}
            />
            <br />

            <label>E-mail</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSeleccionado ? userSeleccionado.email: ''}
              onChange={handleChange}
            />
            <br />

            <label>Senha</label>
            <input
              className="form-control"
              type="text"
              name="senha"
              value={userSeleccionado ? userSeleccionado.senha: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Home;
