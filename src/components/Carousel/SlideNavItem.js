import React from 'react';

const SlideNavItem = ({ isCurrent, ...props }) => {
  return (
    <li className="SlideNavItem">
      <button {...props} aria-current={isCurrent}>
        <span />
      </button>
    </li>
  );
};

export default SlideNavItem;
