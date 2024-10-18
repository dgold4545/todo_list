import { RiSaveLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";

import style from "./EditForm.module.css";
import { useEffect } from "react";
export const EditForm = ({
  defaultValue,
  onCancelUpdate,
  onHandleEditTodo,
}) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onCancelUpdate();
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onCancelUpdate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const text = form.elements.text.value.trim();
    onHandleEditTodo(text);
    form.reset();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button
        className={style.editButton}
        type="button"
        onClick={onCancelUpdate}
      >
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="text"
        required
        defaultValue={defaultValue}
        autoFocus
      />
    </form>
  );
};
