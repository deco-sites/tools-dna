import { useUser } from "apps/wake/hooks/useUser.ts";
import Icon from "site/components/ui/Icon.tsx";

export default function UserLoggedIn() {
  const user = useUser();

  const isUserLoggedIn = Boolean(user.user.value?.email);
  return (
    <>
      <a
        class="w-auto flex btn btn-circle btn-sm btn-ghost"
        href={`${
          !isUserLoggedIn
            ? "//checkout.worldtools.com.br/Login/Authenticate?returnUrl=https://www.worldtools.com.br"
            : "//checkout.worldtools.com.br/MinhaConta/"
        }`}
        aria-label="Log in"
      >
        <Icon
          style="padding: 10px;border-radius: 100px;background: #4BAEE9; color: #ffffff;"
          id="User"
          class="h-[40px] w-[40px] md:h-[48px] md:w-[48px]"
          size={18}
          strokeWidth={0.4}
        />
      </a>
    </>
  );
}
