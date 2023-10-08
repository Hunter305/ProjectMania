import React from "react";
import { Link } from "react-router-dom";
import { useGetProjectsForUserQuery } from "../slices/projectSlice";
import Loader from "../components/Loader";
import { FaFolderPlus, FaFolder } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";

const ProjectLanding = () => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useGetProjectsForUserQuery();

  return (
    <>
      <Container>
        <Link to={"/addproject"} style={{ textDecoration: "none" }}>
          <FaFolderPlus style={{ fontSize: "3rem" }} />
          <h3>Create Project</h3>
        </Link>

        {isLoading ? (
          <Loader />
        ) : (
          <Row>
            {projects.map((value, idx) => (
              <Col key={idx} lg={2} md={4} sm={6}>
                <Link
                  to={`/projects/${value._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <FaFolder style={{ fontSize: "3rem", marginRight: "10px" }} />
                  <h3>{value.projectName}</h3>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default ProjectLanding;
