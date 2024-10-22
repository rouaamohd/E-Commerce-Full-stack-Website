'use client'
import React from 'react'
import styles from '@/app/page.module.css';
import Link from 'next/link'
import EcommerceRepo from '@/app/repo/frh-ecommerce-repo.js'

export default function top() {
  const urlpage = "http://127.0.0.1:5500/"

  async function handlelogOut(e) {
    e.preventDefault();
    const admin = await EcommerceRepo.getAdmin()
    admin.isLoggedIn = false;
  }

  return (
    <div className={styles.topHeader}>
    <h1 className={styles.topTitle}>FRH</h1>
    <a href={`${urlpage}public/html/login.html`} className={styles.topLogout} onClick={handlelogOut}>Logout</a>  
  </div>
  )
}
