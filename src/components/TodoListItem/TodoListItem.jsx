import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import style from "./TodoListItem.module.css";
import { Text } from "..";

export const TodoListItem = ({
  todo: { text, id },
  index,
  onDeleteTodo,
  onUpdate,
}) => {
  return (
    <div className={style.box}>
      <Text textAlign="center" marginBottom="20">
        TODO #{index}
      </Text>
      <Text>{text}</Text>
      <button
        className={style.deleteButton}
        type="button"
        onClick={() => onDeleteTodo(id)}
      >
        <RiDeleteBinLine size={24} />
      </button>
      <button
        className={style.editButton}
        type="button"
        onClick={() => onUpdate({ id, text })}
      >
        <RiEdit2Line size={24} />
      </button>
    </div>
  );
};
