import React, { useState, useEffect } from 'react';
// import { useFavicon } from 'ahooks';
import { Link, history } from 'umi';
import ProLayout, { BasicLayoutProps } from '@ant-design/pro-layout';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
// import User from './components/User';
import Footer from '@/components/footer';
import './index.scss';
import Logo from '@/assets/images/xpixel/logo1.png';
// import gvLogoHome from '../assets/images/gvlab/home/logo.svg';

// import gvFavicon from '../assets/images/gvfavicon.svg';
import {BackTop, Divider, Tooltip} from "antd";
import Uparrow from "@/components/footer/components/Uparrow";

const contentStyle: React.CSSProperties = {};

const Layout: React.FC = (props: BasicLayoutProps) => {
  const base = routerBase.substring(0, routerBase.length - 1);
  const { route } = props;
  const platform = 'gvLab';
  const routes = route?.routes?.filter((item) => item.path);
  // use useLocation to avoid location?.pathname is always / in hash router
  let location = useLocation();
  let [currentPathName, setCurrentPathName] = useState(location?.pathname);
  let [showBg, setShowBg] = useState(false);

  // const [favicon, setFavicon] = useState(gvFavicon);
  // useFavicon(favicon);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    const pathname: string = location?.pathname;
    //切换浏览器icon
    //   setFavicon(gvFavicon);
    //   document.title = 'OpenGVLab'
    //设置当前路由路径
    setCurrentPathName(pathname);
    //滚动改变顶部导航样式
    const handleScroll = () => {
      let scrollTop = document.documentElement.scrollTop; //滚动条滚动高度
      if (scrollTop > 102) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location?.pathname]);
  return (
    <ProLayout
      className={`${platform} ${showBg ? 'gvLab-other' : 'gvlab-home'}`}
      logo={Logo}
      title=""
      layout="top"
      navTheme="light"
      headerTheme="light"
      fixedHeader
      disableContentMargin
      contentStyle={contentStyle}
      location={{
        pathname: (location?.pathname === '/' || location?.pathname === 'login') ? '/home' : location?.pathname,
      }}
      route={{
        ...props.route,
        // fixme 部署多项目的时候 有个base BOM对象 location 会和 routes 不一致 导致有些参数匹配不上(renderHeader  footerRender 等)
        routes,
      }}
      onMenuHeaderClick={(p) => {console.log(p), history.push('/')}}
      menuItemRender={(p) => {
        if (p.url) {
          return (
            <a target="_blank" href={p.url}>
              {p.name}
            </a>
          );
        }
        return <Link to={p.path?.replace(base, '') || '/'}>{p.name}</Link>;
      }}
      // rightContentRender={() => <User currentPathName={currentPathName} />}
      footerRender={() => {
        return <Footer Logo={Logo} />;
      }}
    >
      {props.children}
      {location?.pathname !== '/home' ? (
        <BackTop>
          <div className="back-up">
            <Uparrow></Uparrow>
          </div>
        </BackTop>
      ) : (
        ''
      )}
    </ProLayout>
  );
};

export default Layout;
