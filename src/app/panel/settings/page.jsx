import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SettingsHero from "@/components/SettingsHero";
import SettingsForm from "@/components/forms/settings/SettingsForm";
import { getServerSession } from "next-auth";

const Settings = async () => {

    const session = await getServerSession(authOptions);
    return (
        <div>
            <SettingsHero user={session.user} />
            <SettingsForm user={session.user} token={session.token} />
        </div>
    )
}
export default Settings