
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// http://localhost:3000/api/login/yyyyyy@gmail.com login api


// https://contactmentor.com/checkbox-list-react-js-example/
const Navbar = () => {

    const router = useRouter();
    const [uuserGet,setUserGet] = ['']
  

  useEffect(() => { 
    const userId = localStorage.getItem('userId');
        if(!userId){
            router.push("/");
        }
        if(userId){
            router.push("/new");
        }
        // setUserGet(localStorage.getItem('userId'))
  }, [])

  function logoutUser() {
    localStorage.removeItem("userId");
  }
 
//   const userGet = localStorage.getItem('userId');
  
//   onClick={closeModal}
  return (
    <nav className="navbar">
        {/* {
            userGet ? (<>
            <Link href="/new">
            <a className="create" onClick={logoutUser}>Logout</a>
        </Link>
            </>) : (<>
                <Link href="/register">
            <a className="create">Click to Regiser User</a>
        </Link>
            </>)
        } */}
        <Link href="/register">
            <a className="create">Click to Regiser User</a>
        </Link>
        <Link href="/new">
            <a className="create" onClick={logoutUser}>Logout</a>
        </Link>
    </nav>
  )
}

export default Navbar;










// import Link from 'next/link';

// const Navbar = () => (
//     <nav className="navbar">
//         <Link href="/register">
//             <a className="create">Click to Regiser User</a>
//         </Link>
//         {/* <Link href="/new">
//             <a className="create">Logout</a>
//         </Link> */}
//     </nav>
// )

// export default Navbar;