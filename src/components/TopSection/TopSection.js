import React, { memo } from 'react'
import TopStaticToolBar from './TopStaticToolBar';
import InstanceBar from './InstanceBar';
import TopStaticHeader from './TopStaticHeader';

import '../../styles/topHeaderSection.css';

const TopSection = () => {
  return (
    <div className="appTopMainSection">
      <TopStaticHeader />
      <InstanceBar />
      <TopStaticToolBar />
    </div>
  )
}

export default memo(TopSection);
