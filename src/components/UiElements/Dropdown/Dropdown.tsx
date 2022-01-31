import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.style.scss";

const Dropdown: React.FC<{ title: string }> = ({ title, children }) => {
  const refElement = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        refElement.current &&
        !(refElement.current as any).contains(event.target)
      ) {
        setOpen(false);
      }
    }

    // Bind the event listener
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refElement, open]);

  return (
    <div className="dropdown" ref={refElement}>
      <div className="dropdown__trigger" onClick={handleToggleDropdown}>
        {title}
      </div>
      {open && <div className="dropdown__content">{children}</div>}
    </div>
  );
};

export default Dropdown;
