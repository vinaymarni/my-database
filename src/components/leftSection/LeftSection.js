import React, { memo, useState, useRef, useEffect } from 'react';
import '../../styles/leftSection.css';
import throttle from 'lodash/throttle';

const LeftSection = () => {
  const [width, setWidth] = useState(300); // Default width in pixels
  const resizableRef = useRef(null);
  const isResizing = useRef(false);

  const handleMouseDown = (e) => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = throttle((e) => {
    if (isResizing.current && resizableRef.current) {
      const newWidth = e.clientX - resizableRef.current.getBoundingClientRect().left;
      if (newWidth > 100 && newWidth < 800) {
        requestAnimationFrame(() => setWidth(newWidth)); // Defer state update
      }
    }
  }, 50); // Throttle interval: 50ms

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      // Cleanup event listeners on unmount
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={resizableRef}
      className="leftSectionMainCon"
      style={{ width: `${width}px` }}
      aria-label="Resizable Sidebar"
    >
      <div style={{ padding: '10px' }}>Resizable Content Area</div>

      <div
        onMouseDown={handleMouseDown}
        className="sidebar-draggable-edge"
        style={{ cursor: 'ew-resize', width: '10px', backgroundColor: '#ccc' }}
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={width}
        aria-valuemin={100}
        aria-valuemax={800}
      ></div>
    </div>
  );
};

export default memo(LeftSection);
