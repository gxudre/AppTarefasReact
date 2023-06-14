import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { listaTarefas, removeTarefa } from '../services/TaskService'

export default function HomeList() {
  const [tarefas, setTarefas] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function carrega() {
      setLoading(true)
      const data = await listaTarefas()
      setTarefas(data)
      setLoading(false)
    }
    carrega()
  }, [])

  function handleEditar(key){
    navigate('/editar/' + key)
  }

  async function handleRemover(key){
    await removeTarefa(key)
  }

  return (
    <>
      {loading ? <h3>Aguarde...</h3> :
      <ol>
        {tarefas.map((tarefa, key) =>
          <li key={key}>{tarefa.nome} - {tarefa.prioridade}
          <button onClick={() => handleEditar(tarefa.key)}>Editar</button>
          <button onClick={() => handleRemover(tarefa.key)}>Remover</button>
          </li>)}
      </ol>
      }      
    </>
  )
}