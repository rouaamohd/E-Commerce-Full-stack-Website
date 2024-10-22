import React from 'react';
import styles from "@/app/page.module.css";
import Top from '@/app/components/top'
import ecommerceRepo from '@/app/repo/frh-ecommerce-repo'
import ArtistTable from '../components/artistTable';
import CustomerTable from '../components/customerTable'
import TotalCityTable from '../components/totalCity'
import TotalCategoryTable from '../components/totalCategory'
import TotalUserTable from '../components/totalUser'
import MainCardCat from '@/app/components/mainCradCat'
import MainCardArt from '@/app/components/mainCradArt'
import MainCardItem from '@/app/components/mainCradItem'
import Link from 'next/link';
import Nav from '@/app/components/nav'





export default async function Admin() {
    const artists = await ecommerceRepo.getArtists()
    const customers = await ecommerceRepo.getCustomers()
    const cdata = await ecommerceRepo.totalPurchasesPerCity()
    const catdata = await ecommerceRepo.totalPurchasePerCategory()
    const utdata = await ecommerceRepo.totalPurchasePerUser()
    const topArtists = await ecommerceRepo.top3Artists()
    const topCategories= await ecommerceRepo.top3Categories()
    const topItems= await ecommerceRepo.getTop3Items()






    return (
        <div className={styles.container}>




            <div className={styles.top}>
                <Top></Top>
                <Nav></Nav>
            </div>

            <div className={styles.side}>
                <div className={styles.links}>
                <Link href="#statisticsSection" className={styles.a}> View Statistics</Link>
                    <Link href="#artistsSection" className={styles.a}> View Artists</Link>
                    <Link href="#customersSection" className={styles.a}>View Customers</Link>
                </div>
            </div>

            <div className={`${styles.statistics}`} id='statisticsSection'>
                <h1 className={styles.header}>View statistics</h1>
                <div className={styles.cards}>
                    <div className={styles.tableCard}>
                        <TotalUserTable data={utdata}></TotalUserTable>
                    </div>
                    <div className={styles.tableCard}><TotalCityTable data={cdata}></TotalCityTable></div>
                    <div className={styles.tableCard}><TotalCategoryTable data={catdata}></TotalCategoryTable></div>
                    <div className={styles.tableCard}> <MainCardCat data={topCategories}></MainCardCat></div>
                    <div className={styles.tableCard}> <MainCardArt data={topArtists}></MainCardArt></div>
                    <div className={styles.tableCard}> <MainCardItem data={topItems}></MainCardItem></div>


                    

                </div>
            </div>

            <div className={styles.artists} id='artistsSection'>
                <h1 className={styles.header}>View artists</h1>
                <div className={styles.tableCard}><ArtistTable artists={artists}/></div>
            </div>

            <div className={styles.customers} id="customersSection">
                <h1 className={styles.header}>View customers</h1>
                <div className={styles.tableCard}><CustomerTable customers={customers}/></div>
            </div>

            <div className={styles.footer}>
                <p>Made by FRH</p>
                <p>Hams Gelban | FatemaElzahraa Elrotel | Rouaa Naim | © 2024 FRH, Inc. </p>
            </div>


        </div>
    );
}
