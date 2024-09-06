import { useUser } from "apps/wake/hooks/useUser.ts";
import Icon from "site/components/ui/Icon.tsx";

export default function UserLoggedIn () {
    const user = useUser();
    console.log("Usuário", user)

    // const isUserLoggedIn = Boolean(user.user.value?.email)
    return (
        <>
            <a
              class="w-auto flex btn btn-circle btn-sm btn-ghost"
              href="//checkout.worldtools.com.br/MinhaConta/"
              aria-label="Log in"
              aria-user={user.user.value?.name || user.user.value?.email}
              style="border: 1px solid #4BAEE9; height: auto;border-radius: 30px;
              padding-right: 15px"
            >
              <Icon
                style="padding: 10px;border-radius: 100px;background: #4BAEE9; color: #ffffff;"
                id="User"
                class="h-[40px] w-[40px] md:h-[48px] md:w-[48px]"
                size={24}
                strokeWidth={0.4}
              />
              <p>
                Olá! Faça seu <strong class="strong-color">Login</strong>
                <br></br>
                ou <strong class="strong-color">Cadastre-se</strong>
              </p>
            </a>
        </>
    )
}