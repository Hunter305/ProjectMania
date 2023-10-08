import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { useCreateProjectMutation } from "../slices/projectSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createProject({ projectName: name, description });

      navigate("/");
    } catch (error) {
      toast.error("Error creating project:", error);
    }
  };

  return (
    <FormContainer>
      <h1>Create Project</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          Add
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default CreateProject;
