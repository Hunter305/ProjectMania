import { Container } from "react-bootstrap";
import LandingPage from "./LandingPage";
import ProjectLanding from "./ProjectLanding";
import { useSelector } from "react-redux";
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Container>{userInfo ? <ProjectLanding /> : <LandingPage />}</Container>
    </>
  );
};
export default HomeScreen;
