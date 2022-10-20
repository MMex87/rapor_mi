import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../organisms/Footer'
import SideNav from '../organisms/SideNavbar'
import Header from '../organisms/Header'


const Template = () => {


    return (
        <>
            <Header />
            <Outlet />
            <SideNav />
            <Footer />
        </>
    )
}


export default Template