import React from "react";
import Container from "components/Layout/Container/Container";
import DigitalAssets from "components/pageSpecific/DigitalAssets/DigitalAssets";
import "./Home.style.scss";

const Home: React.FC = () => {
  return (
    <div className="page-home">
      <Container>
        <div className="page-home__grid">
          <div className="page-home__grid-item">
            <div className="featured-wrap">
              <h1 className="featured-title">
                Buy & Sell Digital Assets in the MENA Region
              </h1>
              <p className="featured-p">
                CoinMENA is the easiest, safest, and fastest way to buy and sell
                cryptocurrency. Our goal is to provide direct and regulated
                access to the digital asset world.
              </p>
            </div>
          </div>
          <div className="page-home__grid-item">
            <DigitalAssets />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
