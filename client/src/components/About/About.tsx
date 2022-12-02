import React from 'react'
import styles from './About.module.css'
import profilePicture from './profilePicture.webp'

const About = () => {
  return (
    <section className={styles.gridContainer}>
      <img src={profilePicture} alt={'My profile picture'} className={styles.profilePicture} />
      <div className={styles.about}>
        {/* here is h1 with */}
        <h1 className={styles.heading}>{'🦚About project'}</h1>
        {/* <hr className={styles.hr} /> */}
        <p className={styles.p}>{'This is '}<b>{'my pet project'}</b>{'. I entirely made it myself. I had some knowledge initially and acquired others while creating the project.'}</p>
        <p className={styles.p}>{'This '}<b>{'clothing store'}</b>{' has almost all it takes to be called a store. It has a home page, shop page, cart page, and sign-in/up pages. It also has a back-end part. All necessary data fetch from there. '}</p>
        <h2 className={styles.heading}>{'🦚The Purpose of the Project'}</h2>
        <p className={styles.p}>{'The purpose of the project was to gain more experience in writing real websites as a part of my education and to show my knowledge. Also, I am looking for my first job.'}</p>
        <h2 className={styles.heading}>{'🦚Technologies'}</h2>
        <p className={styles.p}>{'This is a full-stack project that was written using the PERN stack.'}</p>
        <p className={styles.p}>{'For routing, I use React-routing-dom. As a state manager, I used Redux with Redux toolkit. For data fetching and caching, I used RTK Query. And as ORM, I used Sequelize.'}</p>
        <a className={styles.link} href={'https://github.com/Demianeen/online-store'}>{'Project on GitHub'}</a>
        <h2 className={styles.heading}>{'🦚What did I learn?'}</h2>
        <p className={styles.p}>{'While creating this website, I learned many new things besides getting better at technologies I already knew.'}</p>
        <p className={styles.p}>{'I got better at data fetching. I learned how to:'}</p>
        <ol className={styles.ul}>
          <li className={styles.li}>{'track loading state'}</li>
          <li className={styles.li}>{'cache data and managing it'}</li>
          <li className={styles.li}>{'make optimistic updates'}</li>
          <li className={styles.li}>{'avoid duplicate requests for the same data'}</li>
        </ol>
        <p className={styles.p}>{'Also, I now know routing in react much better. I am relatively new at routing, but now I have a better understanding of using different hooks (`useNavigate`, `useHistory`, `useParams`).'}</p>
        <p className={styles.p}>{'Also, I learned how to write custom selectors in redux and generate selectors with `createEntitySelector` for better optimization.'}</p>
        <p className={styles.p}>{'I also learned how to use Sequelize and Express better. Despite being relatively new to the backend, I now know how to connect and interact with the database much better. In addition, I learned how to migrate data using Sequelize-CLI.'}</p>
      </div>
    </section>
  )
}

export default About
