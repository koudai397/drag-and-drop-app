import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dummyData from "../dummyData";
import Card from "./Card";

const Main = () => {
  const [data, setData] = useState(dummyData);

  const onDragEnd = (result) => {
    //   ドラッグアンドドロップのイベントが終了したときに呼ばれる
    const { source, destination } = result;
    //   、ドラッグアンドドロップされたアイテムの元の位置（source）と、ドロップ先の位置（destination）が含まれてい
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      // どこのタスク項目からアイテムが移動するか。何番目のタスクか数値として格納している。
      // 「今やること」から移動するなら0、「終わったこと」から移動するなら2
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );
      // アイテムがどのタスク項目に移動するかが数値として格納される
      const sourceCol = data[sourceColIndex];
      // 数値ではなく、値として格納する
      const destinationCol = data[destinationColIndex];
      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];
      // spliceするのでコピー配列を作成
      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
      // ここでタスクの削除と追加を行っている
      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;
      // それぞれのタスクを更新している
      setData(data);
      // 画面を再描画している
    } else {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const sourceCol = data[sourceColIndex];
      const sourceTask = [...sourceCol.tasks];
      const [removed] = sourceTask.splice(source.index, 1);
      sourceTask.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTask;
      setData(data);
      // データを更新し、画面を再描画している
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className="trello-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="trello-section-title">{section.title}</div>
                <div className="trello-section-content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        // providedは必要だから書いている。下記のinnerRef、draggableProps、dragHandlePropsを使用してドラッグアンドドロップを制御している
                        // snapshotを用いることでドラッグしている途中のDesignを変えることができる
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                          {/* このtitleはCardコンポーネントのchildrenに挿入される */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {/* ドラッグアンドドロップしたときに空きスペースをつくる。 */}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Main;
