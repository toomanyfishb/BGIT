import React from "react";
import ContactListClass from "./ContactListClass";
import ContactListFunctional from "./ContactListFunctional";

const App = () => {
  return (
    <div>
      <h1>My Contact List Application</h1>
      <ContactListClass />
      <hr />
      <ContactListFunctional />
    </div>
  );
};

export default App;

