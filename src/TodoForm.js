import React from 'react'

const TodoForm = ({ handleChange, handleSubmit, trip, todo }) => (
  <React.Fragment>
    <form onSubmit={handleSubmit}>
      <label>Todo Title</label >
      <input
        name="title"
        value={todo.title}
        placeholder="Todo goes here"
        type="text"
        onChange={handleChange} />
      <label>Todo Description</label >
      <input
        name="description"
        value={todo.description}
        placeholder="Description"
        type="text"
        onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  </React.Fragment>
)

export default TodoForm
