// src/components/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [hasNotification, setHasNotification] = useState(false);
  const dotColor = hasNotification ? '#87CEEB' : 'gray';
  return (
    <header style={{ backgroundColor: '#ffff', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', fontWeight: 'bold', fontSize: '1.5rem' }}>
      <Image 
        className="mr-5"
        src="/reward_icon.png"
        alt="reward_icon logo"
        width={40}
        height={38}
        color='#56C0EB'
        priority
      />
        Rewards
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ADD8E6', borderRadius: '20px', padding: '0.5rem' }}>
      <Image
        src="/search_icon.png"
        alt="Search Icon"
        width={20}
        height={20}
        style={{ marginRight: '0.5rem' }}
      />
      <input
        type="text"
        placeholder="Search..."
        style={{ border: 'none', outline: 'none', width:350, flex: 1 }}
      />
    </div>

<div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <button onClick={() => setHasNotification(!hasNotification)}>
        <Image
          src="/notification_icon.png"
          alt="Notification Icon"
          width={24}
          height={24}
          style={{ marginRight: '0.5rem' }}
        />
      </button>
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: dotColor,
          position: 'absolute',
          top: '2px', // Adjust as needed
          right: '2px', // Adjust as needed
        }}
      />
    </div>
    </header>
  );
}