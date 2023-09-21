import React from 'react'
import '../CSS/sidebar.css'
import { Link } from 'react-router-dom';
import { useUser } from './userContext'; 

export default function Sidebar() {
  const { user, userRole } = useUser(); 

  return (
    <div className='sidebar'>
      <div className='sidebarItems'>
      <Link className = 'listItem' to ='/dashboard'>Dashboard</Link>
      {userRole === "admin" && (
                      <>
                     <Link className = 'listItem' to ='/addproduct'>Add Product</Link>
                      </>
                    )}
     
      </div>
    </div>
  )
}
