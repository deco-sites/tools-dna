import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost bg-[#164195] h-[40px] w-[40px] md:h-[48px] md:w-[48px]"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="BarsNewMenu" size={18} strokeWidth={0.01} />
    </Button>
  );
}
