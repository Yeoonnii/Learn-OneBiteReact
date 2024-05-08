import { useContext, useMemo, useState } from "react";
import "./List.css";
import TodoItem from "./TodoItem";
import { TodoContext } from "../App";
const List = () => {
  const { todos } = useContext(TodoContext);
  // 검색어 입력을 위한 useState
  const [search, setSearch] = useState("");

  // input 값 저장용 onChangeSearch
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // input 값 변경시 todos 필터
  const getFilteredData = () => {
    // 검색 값이 없는 경우 todos 리턴
    if (search === "") {
      return todos;
    }
    // 검색 값이 있는 경우 필터링
    return todos.filter((todo) =>
      // 대소문자 구분 없이 검색어 입력
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  // 필터링된 todos 데이터 리턴
  const filterdTodos = getFilteredData();

  // useMemo를 사용하여 컴포넌트 연산 최적화
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("useMemo 실행!");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className="List">
      <h4>To-Do List 🌷</h4>
      <div className="Analyze">
        ⏩ total : {totalCount} / ✅ done: {doneCount} / 🚫 notDone:{" "}
        {notDoneCount}
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {/* 필터링된 todos 데이터 반복하여 렌더링 */}
        {filterdTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
