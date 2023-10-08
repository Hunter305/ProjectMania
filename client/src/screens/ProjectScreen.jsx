import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Loader from "../components/Loader";
import { useGetTasksForProjectQuery } from "../slices/taskSlice";
import { useParams } from "react-router-dom";
import AddTaskButton from "../components/AddTaskButton";
import { toast } from "react-toastify";

const ProjectScreen = () => {
  const { projectid } = useParams();
  const {
    data: tasks,
    isLoading: loading,
    error,
    refetch,
  } = useGetTasksForProjectQuery(projectid);

  const [filterStatus, setFilterStatus] = useState("all"); // Default filter status

  const handleAddTask = async (projectId, taskData) => {
    try {
      const response = await axios.post(
        `/api/tasks/${projectId}/task`,
        taskData
      );
      console.log("Task added successfully:", response.data);
      refetch();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}/status`, {
        status: newStatus,
      });
      toast.success("Task status updated successfully");
      refetch();
    } catch (error) {
      toast.error("Error updating task status:", error);
    }
  };

  const handleClick = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      toast.success(`Task with ID ${taskId} deleted successfully.`);
      refetch();
    } catch (error) {
      toast.error(`Error deleting task with ID ${taskId}:`, error);
    }
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const handleClearFilters = () => {
    setFilterStatus("all");
  };

  return (
    <Container>
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <AddTaskButton onAddTask={handleAddTask} projectId={projectid} />

        <Button
          variant="info"
          className="mx-2"
          onClick={() => handleFilter("todo")}
        >
          Filter Todo
        </Button>
        <Button
          variant="info"
          className="mx-2"
          onClick={() => handleFilter("inProgress")}
        >
          Filter In Progress
        </Button>
        <Button
          variant="info"
          className="mx-2"
          onClick={() => handleFilter("completed")}
        >
          Filter Completed
        </Button>
        <Button
          variant="secondary"
          className="mx-2"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => {
                if (filterStatus !== "all" && task.status !== filterStatus) {
                  return null;
                }
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <h4>{task.taskName}</h4>
                    </td>
                    <td>
                      <p>{task.description}</p>
                    </td>
                    <td>
                      <p>{new Date(task.deadline).toLocaleDateString()}</p>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <select
                          className="form-select"
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(task._id, e.target.value)
                          }
                        >
                          <option value="todo">Todo</option>
                          <option value="inProgress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <FaTrashAlt
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                          onClick={() => handleClick(task._id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default ProjectScreen;
