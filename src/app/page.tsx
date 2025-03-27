"use client";

import Image from "next/image";
import Header from '@/components/Header';
import Link from "next/link";
import { JSX, useState } from 'react';
import ReportsPage from "@/pages/reports";
import RegionsPage from "@/pages/region";
import DepartmentsPage from "@/pages/department";
import NominationsPage from "@/pages/nominations";
import EmployeesPage from "@/pages/employees";
import CertificateGenerator from "@/pages/certificates";
import RewardsCatalog from "@/pages/rewardCatalog";
import RewardHero from "@/components/rewardHero";




export default function Home() {
  const [middleContent, setMiddleContent] = useState<JSX.Element | null>(null);

  const handleLinkClick = (content: JSX.Element) => {
    setMiddleContent(content);
  };
  return (
      <div>
        <Header />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', marginTop: 30, padding: 40, gap: '1rem', height: '500px' }}>
          <div style={{ backgroundColor: '#f0f0f0f0', paddingBottom: '1rem', }}>
            <div style={{ marginBottom: 20,  backgroundColor: '#fff', width: '100%', border: '1px solid #fff', borderRadius: 10 }}>

            <div style={{ display: 'flex', borderBottom: '2px solid #ccc', padding: 20, marginBottom: 10, width: '100%' }}>
              <Image src="/3d-user_icon.png" alt="user Icon" width={24} height={24} style={{ marginRight: '15px' }} />
              <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Administrator</div>
            </div>

            <div style={{ marginBottom: 20, padding: 60, paddingLeft: 30, paddingTop:20, backgroundColor: '#fff', width: '100%', height: '70vh' }}>
              <nav style={{ alignItems: 'center' }}>
                <div style={{ marginBottom: 15, display: 'flex' }}>
                  <Image src="/region_icon.png" alt="region Icon" width={24} height={24} style={{ marginRight: 15 }} />
                  <Link href="#" onClick={() => handleLinkClick(<div><RegionsPage/></div>)} style={{ marginRight: '1rem', fontSize: '1rem', textDecoration: 'none' }}>Region</Link>
                </div>
                <div style={{ marginBottom: 15, display: 'flex' }}>
                  <Image src="/department_icon.png" alt="department Icon" width={24} height={24} style={{ marginRight: 15 }} />
                  <Link href="#" onClick={() => handleLinkClick(<div><DepartmentsPage/></div>)} style={{ marginRight: '1rem', fontSize: '1rem', textDecoration: 'none' }}>Departments</Link>
                </div>
                <div style={{ marginBottom: 15, display: 'flex' }}>
                  <Image src="/report_icon.png" alt="report Icon" width={24} height={24} style={{ marginRight: 15 }} />
                  <Link href="#" onClick={() => handleLinkClick(<div><ReportsPage/></div>)} style={{ fontSize: '1rem', textDecoration: 'none' }}>Reports</Link>
                  {/* <div><ReportsPage/></div> */}
                </div>
                <div style={{ marginBottom: 15, display: 'flex' }}>
                  <Image src="/nomination_icon.png" alt="nomination Icon" width={24} height={24} style={{ marginRight: 15 }} />
                  <Link href="#" onClick={() => handleLinkClick(<div><NominationsPage/></div>)} style={{ fontSize: '1rem', textDecoration: 'none' }}>Nominations</Link>
                </div>
                <div style={{ marginBottom: 15, display: 'flex' }}>
                  <Image src="/employee_icon.png" alt="employees Icon" width={24} height={24} style={{ marginRight: 15 }} />
                  <Link href="#" onClick={() => handleLinkClick(<div><EmployeesPage/></div>)} style={{ fontSize: '1rem', textDecoration: 'none' }}>Employees</Link>
                </div>
                <div style={{ marginBottom: 15, display: 'flex' }}>
                  <Image src="/certificate_icon.png" alt="certificate Icon" width={24} height={24} style={{ marginRight: 15 }} />
                  <Link href="#" onClick={() => handleLinkClick(<div><CertificateGenerator/></div>)} style={{ fontSize: '1rem', textDecoration: 'none' }}>Gen. Cert</Link>
                </div>
                <div style={{ marginBottom: 15, display: 'flex' }}>
                  <Image src="/rewardleft_icon.png" alt="rewards left Icon" width={24} height={24} style={{ marginRight: 15 }} />
                  <Link href="#" onClick={() => handleLinkClick(<div><RewardsCatalog/></div>)} style={{ fontSize: '1rem', textDecoration: 'none' }}>Rewards</Link>
                </div>
              </nav>

              <div style={{paddingTop:150, display: 'flex'}}>
                <Image src="/settings_icon.png" alt="settings Icon" width={24} height={24} style={{ marginRight: 15 }} />
                Settings
              </div>

            </div>
        </div>
        {/* <div style={{ marginBottom: 20, padding: 90, backgroundColor: '#fff', border: '1px solid #fff', borderRadius: 10 }}>123</div> */}
      </div>
      <div style={{ backgroundColor: '#ffff', paddingBottom: '1rem', border:'2px solid #fff', borderRadius: 10 }}>
        {/* Middle Column Content */}
        <div style={{ display: 'flex', borderBottom: '2px solid #ccc', padding: 20, width: '100%'  }}>
          {middleContent || <div><RewardHero/></div>}
        </div>
      </div>
      
        </div>
      </div>
  );
}




{/* <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', marginTop:30, padding:40, gap: '1rem', height: '500px' }}>
          <div style={{ backgroundColor: '#f0f0f0f0', padding: '1rem', border: '1px solid #ccc' }}>
            {/* First Column Content */}
        //     <div style={{marginBottom:20, padding:60, paddingLeft:30, backgroundColor: '#fff'}}>
        //       <nav style={{ alignItems: 'center' }}>
        //         <div style={{marginBottom:10, display: 'flex'}}><Image src="/region_icon.png" alt="region Icon" width={24} height={24} style={{marginRight:15}}/><Link href="/region" style={{ marginRight: '1rem', fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>Region</Link></div>
        //         <div style={{marginBottom:10, display: 'flex'}}><Image src="/department_icon.png" alt="department Icon" width={24} height={24} style={{marginRight:15}}/><Link href="/department" style={{ marginRight: '1rem', fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>Departments</Link></div>
        //         <div style={{marginBottom:10, display: 'flex'}}><Image src="/report_icon.png" alt="report Icon" width={24} height={24} style={{marginRight:15}}/><Link href="/reports" style={{ fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>Reports</Link></div>
        //         <div style={{marginBottom:10, display: 'flex'}}><Image src="/nomination_icon.png" alt="nomination Icon" width={24} height={24} style={{marginRight:15}}/><Link href="/nominations" style={{ fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>Nominations</Link></div>
        //         <div style={{marginBottom:10, display: 'flex'}}><Image src="/employee_icon.png" alt="employees Icon" width={24} height={24} style={{marginRight:15}}/><Link href="/employees" style={{ fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>Employees</Link></div>
        //         <div style={{marginBottom:10, display: 'flex'}}><Image src="/certificate_icon.png" alt="certificate Icon" width={24} height={24} style={{marginRight:15}}/><Link href="/certificates" style={{ fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>Gen. Cert</Link></div>
        //       </nav>
        //     </div>

        //     <div style={{marginBottom:20, padding:90, backgroundColor: '#000000'}}>123</div>

        //   </div>
        //   <div style={{ backgroundColor: '#ffff', padding: '1rem', border: '1px solid #ccc' }}>
        //     {/* Middle Column Content */}
        //     Middle Column (Biggest)
        //   </div>
        //   <div style={{ backgroundColor: '#ffff', padding: '1rem', border: '1px solid #ccc' }}>
        //     {/* Third Column Content */}
        //     Third Column
        //   </div>
        // </div> */}