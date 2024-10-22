
'use client'
import React from 'react'
import styles from '@/app/page.module.css';
import Link from 'next/link'

export default function nav() {

  const urlpage = "http://127.0.0.1:5500/"

  return (
    <div className={styles.topNav}>
    <a href={`${urlpage}public/html/main.html`} className={styles.topNavLink}>Home</a> 
    <a href={`${urlpage}public/html/all_Items.html`} className={styles.topNavLink}>All Items</a>  
  </div>
  )
}
