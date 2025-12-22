import { useEffect, useState } from "react";

const useToggleShow = () => {
  const [toggleShow, setToggleShow] = useState(false);

  useEffect(() => {
    if (toggleShow) {
      const timer = setTimeout(() => {
        console.log("hello");
        setToggleShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toggleShow]);

  return { toggleShow, setToggleShow };
};

export default useToggleShow;
