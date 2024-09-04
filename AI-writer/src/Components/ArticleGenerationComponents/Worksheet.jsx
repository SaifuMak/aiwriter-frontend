// App.js
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialItems = ['cat', 'dog', 'goat'];

function Worksheet() {
  const [items, setItems] = useState(initialItems);
  const [editIndex, setEditIndex] = useState(null);
  const [newItem, setNewItem] = useState('');

  // Handles the end of a drag operation
  const handleDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    // Reorder items based on drag result
    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  // Set index for editing
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  // Save the edited item
  const handleSave = (index, newContent) => {
    const updatedItems = [...items];
    updatedItems[index] = newContent;
    setItems(updatedItems);
    setEditIndex(null);
  };

  // Delete an item
  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Add a new item
  const handleAdd = () => {
    if (newItem.trim() === '') return;
    setItems([...items, newItem]);
    setNewItem('');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Drag and Drop List</h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                {items.map((item, index) => (
                  <Draggable key={index} draggableId={`draggable-${index}`} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
                      >
                        {editIndex === index ? (
                          <input
                            type="text"
                            defaultValue={item}
                            onBlur={(e) => handleSave(index, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            autoFocus
                          />
                        ) : (
                          <span className="text-gray-700">{item}</span>
                        )}
                        <div className="ml-4">
                          <button
                            onClick={() => handleEdit(index)}
                            className="px-3 py-1 text-white transition bg-blue-500 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="px-3 py-1 ml-2 text-white transition bg-red-500 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 mt-2 text-white transition bg-green-500 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Worksheet;
