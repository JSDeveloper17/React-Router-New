import React from 'react'
import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

function Error() {
  return (
    <>
    <MainNavigation/>
    <PageContent title="An error occured">
        <p>Something went wrong</p>
    </PageContent>
    </>
  )
}

export default Error