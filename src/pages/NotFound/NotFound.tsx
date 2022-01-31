import Container from "components/Layout/Container/Container";
import React from "react";
import { Link } from "react-router-dom";
import Image404 from "../../assets/images/image-404.png";

const NotFound: React.FC = () => {
  return (
    <Container>
      <div className="not-found">
        <img src={Image404} alt="Not Found" />
        <h5>We couldn't find what you are looking for</h5>
        <p>Here are some helpful links instead:</p>
        <Link to="/">Home</Link>
      </div>
    </Container>
  );
};

export default NotFound;
