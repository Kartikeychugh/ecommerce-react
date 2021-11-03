// import "./home-page.styles.scss";

import { Directory } from "../../components";
import { HomePageContainer } from "./home-page.styles";
import React from "react";

export class HomePage extends React.Component {
  public shouldComponentUpdate() {
    // No need to re-render or paint since it's a static Component for now
    return false;
  }

  public render() {
    return (
      <HomePageContainer>
        <Directory />
      </HomePageContainer>
    );
  }
}
