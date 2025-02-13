//import React from 'react'
import Banner from '../components/Banner'
import Header from '../components/Header'
import SpeacialityMenu from '../components/SpeacialityMenu'
import TopDoctors from '../components/TopDoctors'

const Home = () => {
  return (
    <div>
        <Header />
        <SpeacialityMenu />
        <TopDoctors />
        <Banner />
        
    </div>
  )
}

export default Home