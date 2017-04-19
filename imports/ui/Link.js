import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import LinksListFilter from './LinksListFilter';
import AddLink from './AddLink';

export default () => {
    return (
      <div>
        <PrivateHeader title="Your Links"/>
        <div className="page-content">
          <LinksListFilter />
          <AddLink/>
          <LinksList />
        </div>
      </div>
    );
}
