import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SettingsHero from "@/components/SettingsHero";
import SettingsForm from "@/components/forms/settings/SettingsForm";
import { getServerSession } from "next-auth";
import styles from './settings.module.scss'
const Settings = async () => {

    const session = await getServerSession(authOptions);
    return (
        <section className={styles.container}>
            <div>
                <SettingsHero user={session.user} />
                <SettingsForm user={session.user} token={session.token} />
            </div>
        </section>
    )
}
export default Settings