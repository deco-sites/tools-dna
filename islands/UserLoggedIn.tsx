import { useUser } from "apps/wake/hooks/useUser.ts";
import Icon from "site/components/ui/Icon.tsx";

export default function UserLoggedIn () {
    const user = useUser();

    const exitAccount = () => {
        document.cookie = 'fbits-login=; path=/; domain=.worldtools.com.br;';
        document.cookie = 'fbits-login=; path=/; domain=www.worldtools.com.br;';
        console.log("Cookie de usuário, removido");
        setTimeout(() => {
          location.reload()
        }, 300);
    }

    const isUserLoggedIn = Boolean(user.user.value?.email)
    return (
        <>
          {!isUserLoggedIn && (
            <a
            class="w-auto flex btn btn-circle btn-sm btn-ghost"
            href={`${!isUserLoggedIn ? "//checkout.worldtools.com.br/Login/Authenticate?returnUrl=https://www.worldtools.com.br" : "//checkout.worldtools.com.br/MinhaConta/"}`}
            aria-label="Log in"
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
          )}
          {isUserLoggedIn && (
            <div class="dropdown dropdown-hover dropdown-bottom">
              <div tabindex={0} role="button">
                <a
                class="w-auto flex btn btn-circle btn-sm btn-ghost"
                href="javascript:void(0)"
                aria-label="Log in"
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
                <p class="truncate max-w-[160px]">
                  Olá, <strong class="strong-color">{user.user.value?.givenName || user.user.value?.email}</strong>
                </p>
              </a>
              </div>
              <ul tabindex={0} class="drop-shadow-md dropdown-content menu bg-base-100 rounded-none z-[1] w-full p-2 shadow">
                <li>
                  <a class="flex flex-row gap-1 text-base font-normal leading-5 text-left" href={"//checkout.worldtools.com.br/MinhaConta/Dados/"} >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.116 14.335c-1.097-1.897-2.788-3.258-4.761-3.902a5.188 5.188 0 1 0-5.307 0c-1.974.644-3.665 2.004-4.762 3.902a.576.576 0 1 0 .998.576c1.357-2.346 3.757-3.746 6.417-3.746s5.06 1.4 6.417 3.746a.574.574 0 0 0 .795.224.577.577 0 0 0 .203-.8M3.666 5.977a4.035 4.035 0 1 1 8.07 0 4.035 4.035 0 0 1-8.07 0" fill="#000"/></svg>
                    Meu cadastro
                  </a>
                </li>
                <li>
                  <a class="flex flex-row gap-1 text-base font-normal leading-5 text-left" href={"//checkout.worldtools.com.br/MinhaConta/Pedido/"} >
                  <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m14.34 16.77 2.84-2.797-.625-.627-2.214 2.183-.957-.975-.626.632zM3.74 5.671h10.462v-1H3.737zm11.23 13.385q-1.672 0-2.837-1.164-1.164-1.164-1.163-2.836 0-1.67 1.163-2.835 1.165-1.164 2.837-1.165 1.671 0 2.835 1.165 1.165 1.165 1.165 2.835 0 1.672-1.165 2.836t-2.835 1.164m-14-1.345V2.557q0-.669.471-1.143A1.56 1.56 0 0 1 2.584.942h12.77q.67 0 1.143.472.473.473.473 1.143v5.945a5 5 0 0 0-.485-.154 4 4 0 0 0-.515-.1v-5.69a.6.6 0 0 0-.193-.424.6.6 0 0 0-.422-.192H2.585a.6.6 0 0 0-.424.192.6.6 0 0 0-.192.423v13.435h6.344q.069.41.176.802.11.393.303.748l-.035.035-1.134-.827-1.346.961-1.346-.96-1.347.96-1.346-.96zm2.77-4.5h4.708a4 4 0 0 1 .138-.515q.084-.24.193-.485H3.74zm0-3.769h7.31a5.2 5.2 0 0 1 1.05-.645 4.4 4.4 0 0 1 1.197-.355H3.738z" fill="#000"/></svg>
                    Meus pedidos
                  </a>
                </li>
                {/* <li>
                  <a  class="exit-account flex flex-row gap-1 text-base font-normal leading-5 text-left" 
                    onClick={() => { exitAccount()}}>
                      <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m.693 12 4.496-6.016v.496L.9.72h1.568l3.52 4.816h-.416L9.06.72h1.584L6.34 6.48v-.496L10.837 12H9.269l-3.76-5.104h.512L2.26 12z" fill="#000"/></svg>
                    Sair
                  </a>
                </li> */}
              </ul>
            </div>
          )}
        </>
    )
}