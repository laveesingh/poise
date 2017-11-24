import React from "react";

const ArticleBtn = props =>
  (<button {...props} style={{ float: "right" }} className="btn btn-primary">
    {props.children}
  </button>
  );
  export default ArticleBtn;

