import React from "react";


// ListItem renders a bootstrap list item containing data from the recipe api call
export const ListItem = props =>
  <li className="list-group-item">
    {props.children}
  </li>;
