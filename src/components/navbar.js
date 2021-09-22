import React from 'react'
import Link from 'next/link'


function Navbar() {
    return (
        <div className="navbar_wrapper">
            <div style={{ width: '75%', paddingLeft: '10%' }}>
                <Link href='/'>Next - React Query</Link>
            </div>
            <div className="navbar_right">
                <div className="navbar_link_wrapper">
                    <Link href='/register'>Register</Link>
                </div>
                <div className="navbar_link_wrapper">
                    <Link href='/user_list'>Users List</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
