import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dummyData from "../dummyData";

const Main = () => {
  const [date, setDate] = useState(dummyData);
  return (
    <DragDropContext>
      <div className="trello">
        {date.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className="trello-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="trello-section-title">{section.title}</div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Main;
