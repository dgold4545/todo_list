import { Grid, GridItem, TodoListItem } from "..";

export const TodoList = ({ array, onDeleteTodo, onUpdate }) => {
  return (
    <Grid>
      {array.map((todo, index) => (
        <GridItem key={todo.id}>
          <TodoListItem
            todo={todo}
            index={index + 1}
            onDeleteTodo={onDeleteTodo}
            onUpdate={onUpdate}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
