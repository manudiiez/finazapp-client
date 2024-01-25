import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SettingsHero from "@/components/SettingsHero";
import SettingsForm from "@/components/forms/settings/SettingsForm";
import { getServerSession } from "next-auth";
import styles from './settings.module.scss'

export const metadata = {
    title: "Configuración de Usuario - FinazApp",
    description: "Explora las opciones de configuración en FinazApp para ajustar tu cuenta según tus preferencias. Actualiza tu perfil y modifica las configuraciones para una experiencia personalizada.",
}


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