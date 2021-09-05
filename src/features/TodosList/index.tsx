import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { fetchTodoListAction } from '../../app/todos/action';
import { selectTotalTodos, selectAllTodos } from '../../app/todos/selector';
import { fetchUserListAction } from '../../app/users/action';
import { selectUserEntities } from '../../app/users/selector';
import TodoUpsert from '../TodoUpsert';
import UiModal from '../../components/UiModal';

const TodosList: React.FC = () => {
  const count = useSelector(selectTotalTodos);
  const todos = useSelector(selectAllTodos);
  const userEntities = useSelector(selectUserEntities);

  const [activeTodoId, setActiveTodoId] = useState<number>(0);
  const [openUpsert, setOpenUpsert] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodoListAction());
    dispatch(fetchUserListAction());
  }, [dispatch]);

  const handleEditButton = (id: number) => {
    setActiveTodoId(id);
    setOpenUpsert(true);
  }

  const handleSaveUpsert = () => {
    const payload = {
      userId: 0,
      id: 0,
      title: '',
      completed: false
    }
    setOpenUpsert(false); 
  }

  const _renderTodoUpsert = () => (
    <UiModal title={activeTodoId > 0 ? 'Edit Todo' : 'Create Todo'} modal={openUpsert} toggle={() => setOpenUpsert(!openUpsert)} handleSubmit={handleSaveUpsert}>
      <TodoUpsert id={activeTodoId} handleSubmit={handleSaveUpsert} />
    </UiModal>
  )

  return (
    <>
      {_renderTodoUpsert()}
      <div className="todos-list">
        <Button color="primary" size="sm" onClick={() => handleEditButton(0)}>Create Todo</Button>
        <br /><br />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              count > 0 ?
                <>
                  {
                    todos.map((todo) => (
                      <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.title}</td>
                        <td>{userEntities[todo.userId]?.name}</td>
                        <td>
                          <Button color="success" size="sm" onClick={() => handleEditButton(todo.id)}>Edit</Button>{' '}
                          <Button color="danger" size="sm">Delete</Button>
                        </td>
                      </tr>
                    ))
                  }
                </>
                :
                <tr>
                  <td colSpan={20}>
                    No data to display
                  </td>
                </tr>
            }
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TodosList;