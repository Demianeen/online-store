import React from 'react'
import styles from './Footer.module.css'
import { ReactComponent as GitHubIcon } from './Github.svg'
import { ReactComponent as LinkedInIcon } from './Linkedin.svg'
import { ReactComponent as InstagramIcon } from './Instagram.svg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.aboutText}>{'Educational project of'}<br className={styles.br} />{' Feliche-Demian Netliukh'}</p>
      <div className={styles.linksContainer}>
        <p>{'Useful links: '}</p>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <a
              className={styles.link}
              href={'https://github.com/Demianeen/online-store'}
            >
              <span className={styles.span}>
                <GitHubIcon className={styles.icon} />
              </span>
            </a>
          </li>
          <li className={styles.li}>
            <a
              className={styles.link}
              href={'https://www.linkedin.com/in/feliche-demian-netliukh-30b0b3238/'}
            >
              <span className={styles.span}>
                <LinkedInIcon className={styles.icon} />
              </span>
            </a>
          </li>
          <li className={styles.li}>
            <a
              className={styles.link}
              href={'https://www.instagram.com/netlyukh.demian/'}
            >
              <span className={styles.span}>
                <InstagramIcon className={styles.icon} />
              </span>
            </a>
          </li>
        </ul>
      </div>

    </footer>
  )
}

export default Footer
