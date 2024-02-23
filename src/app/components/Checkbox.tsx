"use client";
import React, { useOptimistic, useTransition } from "react";
import { Todo } from "./TodoList";
import { updateTodo } from "@/lib/actions";

const Checkbox = ({ todo }: { todo: Todo }) => {
    // server에서 처리가 끝나기 전 미리 프론트에서 작업 실행
    const [optimisticTodo, addOptimisticTodo] = useOptimistic(
        todo,
        (state: Todo, completed: boolean) => ({ ...state, completed })
    );

    // server에서 처리가 끝날때 isPending = true
    // const [isPending, startTransition] = useTransition();

    return (
        <input
            type="checkbox"
            checked={optimisticTodo.completed}
            id="completed"
            name="completed"
            onChange={async () => {
                addOptimisticTodo(!todo.completed);
                await updateTodo(todo);
            }}
            className="min-w-[2rem] min-h-[2rem]"
        />
    );
};

export default Checkbox;
