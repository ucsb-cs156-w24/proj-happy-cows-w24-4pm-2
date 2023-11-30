import React, { useState} from "react";
import greetingsList from "../../../assets/PlayGreetings.json"
import "../../pages/HomePage.css"
import { Card } from "react-bootstrap";
export default function CommonsPlay({ currentUser }) {
  // Stryker disable  all 
  const firstName = currentUser?.root ? currentUser?.root?.user?.givenName : "";

  const [welcomeText, _]= useState(greetingsList[Math.floor(Math.random() * greetingsList.length)]);
  // Stryker restore all

  return (
      // Stryker disable all : TODO: restructure this code to avoid the need for this disable
    <div data-testid="CommonsPlay">
      <Card style={{opacity: ".9" }}>
      <h1 className="animate-charcter"> {welcomeText} {firstName}! 
    </h1>
    </Card>
    </div>
  );
};