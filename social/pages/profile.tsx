import { NextPage } from "next";
import Navbar from "../components/Navbar";


const Profile: NextPage = () => {
    

    return (
        <div>
            <Navbar isLoggedIn={false} />
        </div>
    )
}


export default Profile;