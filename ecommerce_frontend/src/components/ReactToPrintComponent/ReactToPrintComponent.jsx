import React, { useEffect, useRef, useState } from "react";
import logoGHTK from "../../assets/images/logo_GHTK.png";

const ReactToPrintComponent = React.forwardRef((props, ref) => {
  const { data } = props;
  console.log("data", data);
  return (
    <>
      <div ref={ref}>
        <div>
          <div>
            <img src={logoGHTK} alt="logo GHTK" />
          </div>
        </div>
      </div>
    </>
  );
});
export default ReactToPrintComponent;
