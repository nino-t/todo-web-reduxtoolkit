import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { selectTodoById } from '../../app/todos/selector';
import { selectAllUsers } from '../../app/users/selector';
import { fetchTodoByIdAction } from '../../app/todos/action';

const TodoUpsert: React.FC<{ id: number, handleSubmit: () => void }> = ({ id, handleSubmit }) => {
  const users = useSelector(selectAllUsers);
  const todo = useSelector((state: RootState) => selectTodoById(state, id));

  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [completed, setCompleted] = useState<string>('0');

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id > 0 && !todo) {
      dispatch(fetchTodoByIdAction(Number(id)));
    }
  }, [dispatch, id, todo]);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setUserId(String(todo.userId));
      setCompleted(todo.completed ? '1' : '0');
    }
  }, [todo])

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your todo..."
        />
      </FormGroup>

      <FormGroup>
        <Label for="user_id">User</Label>
        <Input
          type="select"
          id="user_id"
          name="user_id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select user</option>
          {
            users.map((user) => <option value={user.id} key={user.id}>{user.name}</option>)
          }
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="is_complete">User</Label>
        <Input
          type="select"
          id="is_complete"
          name="is_complete"
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
          >
            <option value="1">Complete</option>
            <option value="0">Not Complete</option>
        </Input>
      </FormGroup>
    </Form>
  );
}


export default TodoUpsert;