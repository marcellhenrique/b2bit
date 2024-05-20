import LogoutNavBar from "../../components/LogoutNavBar"
import ProfileInfo from "../../components/ProfileInfo"

const User: React.FC = () => {
  return (
    <div className=" min-h-screen flex flex-col bg-gray-200">
      <LogoutNavBar />
      <ProfileInfo />
    </div>
  )
}

export default User