import React, { memo, lazy, Suspence } from 'react';
import '../../styles/rightSection.css';
import SqlCompiler from '../compiler/sqlCompiler';

const FooterSection = lazy(() => import("../footerSection/FooterSection"))

const RightSection = () => {
  return (
    <div className='RightSectionMainCon'>
      <div className='SqlCompilerCon'>
        <SqlCompiler />
      </div>
      <FooterSection />
    </div>
  )
}

export default memo(RightSection);
