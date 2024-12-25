import React, { useState, useRef, useEffect, memo } from 'react';
import '../../styles/footer.css';
import throttle from 'lodash/throttle';

const FooterSection = () => {
  const [height, setHeight] = useState(200);
  const resizableRef = useRef(null);
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = throttle((e) => {
    if (isResizing.current) {
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight > 100 && newHeight < 500) {
        requestAnimationFrame(() => setHeight(newHeight)); // Defer the update
      }
    }
  }, 50); // Throttled to prevent rapid updates

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // console.log('Observed height:', entry.contentRect.height);
      }
    });

    if (resizableRef.current) {
      observer.observe(resizableRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={resizableRef}
      className="footer-resizable-footer"
      style={{ height: `${height}px` }}
    >
      <div
        onMouseDown={handleMouseDown}
        className="footer-draggable-edge"
        style={{ cursor: 'ns-resize', height: '10px', background: '#ccc' }}
      ></div>
      <div style={{ padding: '10px' }}>Resizable Footer Area</div>
    </div>
  );
};

export default memo(FooterSection);
