import { ItemsNavigationMenu } from "@/components/nav";
import HeaderOne from "./header-one";

export default function Header({
  navItems,
}: {
  navItems: ItemsNavigationMenu[];
}) {
  return (
    <header className="max-w-full min-w-[350px]">
      <HeaderOne navItems={navItems} />
    </header>
  );
}
