import React, { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { fetchTodoListAction } from '../../app/todos/action';
import { selectTotalTodos, selectAllTodos } from '../../app/todos/selector';

const TodosList: React.FC = () => {
  const count = useSelector(selectTotalTodos);
  const todos = useSelector(selectAllTodos);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodoListAction());
  }, [dispatch]);

  return (
    <div className="todos-list">
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
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
                      <td>
                        <Button color="success" size="sm" style={{ marginRight: '8px' }}>Edit</Button>
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
  );
};

export default TodosList;