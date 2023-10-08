import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const AddTaskButton = ({ onAddTask, projectId }) => {
  const [show, setShow] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !description || !deadline) {
      return;
    }

    onAddTask(projectId, { taskName, description, deadline });

    handleClose();
  };

  useEffect(() => {
    if (projectId) {
    }
  }, [projectId]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTaskButton;
