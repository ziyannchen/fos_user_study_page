// cl 2021/10/29 13:41
import React from 'react';
import email from '@/assets/images/email.svg';
import github from '@/assets/images/github.png';
import webpage from '@/assets/images/webpage.svg';
// import { history } from 'umi';

import '@/layouts/index.scss';

interface IProps {
  Logo?: string;
}

const Footer: React.FC<IProps> = ({ Logo }) => {

  const goToUrl = (url:string) => {
    window.open(url, '_blank')
  };

  return (
    <div className="gvlab-footer">
      <div className="const-width">
        <div className="gvfooter-left">
          {/* <img
            src={Logo}
            width={137}
            height={40}
          /> */}
          <div className="footer-text pad-sub">
            Work done in <p className="c-r" style={{display: 'inline'}} onClick={() => {goToUrl('https://xpixel.group/')}}>
              Xpixel Group
            </p>.
          </div>
          <div className="footer-text">
            Layout borrowed from <p className="c-r" style={{display: 'inline'}} onClick={() => {goToUrl('https://opengvlab.shlab.org.cn/')}}> 
            OpenGVLab
            </p>.
          </div>
          <div className="footer-text">
            © 2024 All Rights Reserved. 
            </div>
        </div>
        <div className="footer-right">
          <div className="footer-right-item">
            {/* <div className="footer-right-item-title">Legal Agreement</div> */}
            {/* <div className="footer-right-item-texts">
              <p className="c-r" onClick={() => { history.push('/serviceagreement') }}>Service Agreement</p>
              <p className="c-r" onClick={() => { history.push('/privacypolicy') }}>Privacy Policy</p>
              <p className="c-r" onClick={() => { history.push('/termsofuse') }}>Terms of Use</p>
              <p className="c-r" onClick={() => { history.push('/termsofapplication') }}> Terms of Application</p>
            </div> */}
            <div className="footer-right-item-title">Project</div>
            <div className="footer-right-item-texts">
            <p className="c-r" onClick={() => { goToUrl('https://ziyannchen.github.io/projects/VFRxBenchmark/') }}>
                  <img src={webpage} alt="" width={20}/>
                WebPage
              </p>
              <p className="c-r" onClick={() => { goToUrl('https://github.com/ziyannchen/VFRxBenchmark') }}>
                  <img src={github} alt="" width={20}/>
                Github
              </p>
            </div>
          </div>
          <div className="footer-right-item">
            <div className="footer-right-item-title">Contact</div>
            <div className="footer-right-item-texts">
              <p className="c-r" onClick={() => {  }}>
                <img src={email} alt="" width={18} height={14} />
                {'chen.ziyan@outlook.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
