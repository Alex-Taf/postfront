import { $profile, signOut } from "@/app/store/user"
import styles from "./styles/user.module.scss"
import { useStore } from "@nanostores/react"
import { useRouter } from "next/navigation"
import { Typography } from "@mui/material"

const User: React.FC = () => {
    const profile = useStore($profile)
    const router = useRouter()

    const handleSignOut = () => {
        signOut()
        router.push("/login")
    }

    return (
        <div className={styles["user"]}>
            <div className={styles["user-avatar"]}></div>
            <div className={styles["user-info"]}>
                <Typography sx={{ fontSize: 18 }} color="text.secondary">
                    {profile.login}
                </Typography>
                <span className={styles["user-logout"]} onClick={handleSignOut}>Logout</span>
            </div>
        </div>
    )
}

export default User
