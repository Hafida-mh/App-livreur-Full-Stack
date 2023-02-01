import React from 'react'
import '../footer/Footer.css'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next';
import LogoWhite from '../images/Logo_Plan de travail 1 (3).png'
export default function Footer() {
  const {t} = useTranslation(["common"]);
  return (
      <div className='contactContainer'>
         <div> Copyright © 2022 - Developpé par H.M</div>
      </div>
  )
}
