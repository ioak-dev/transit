import React, { useEffect, useState } from 'react';

import './style.scss';

interface Props {
  space: string;
  children: any;
  isExpanded: boolean;
}

const ContextContent = (props: Props) => {
  return (
    <div
      className={`context-content ${
        props.isExpanded
          ? 'context-content--active'
          : 'context-content--inactive'
      } bg-light-300 dark:bg-dark-400`}
    >
      {props.children}
    </div>
  );
};

export default ContextContent;
