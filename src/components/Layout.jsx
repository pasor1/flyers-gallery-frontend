import React from 'react';
import Header from './Header'
import SideDrawer from './SideDrawer';

const Layout = (props) => {
  const [drawerStatus, setDrawerStatus] = React.useState({open: false});

  const toggleDrawer = () => {
    setDrawerStatus({ ...drawerStatus, open: !drawerStatus.open });
  }

  return (
    <>
      <Header onClickMenu={toggleDrawer}/>
      <SideDrawer
        drawerStatus={drawerStatus.open}
        toggleDrawler={toggleDrawer}
        favourites={props.favourites}
        clickRemove={props.clickRemove}
        />
      <div style={{ padding: '76px 10px 0' }}>
        {props.children}
      </div>
    </>
  )
};

export default Layout;