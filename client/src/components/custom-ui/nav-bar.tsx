import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { useHideOnScrollDown } from "@/hooks/useHideOnScrollDown"
import { type ReactNode } from "react"

export default function NavBar({ children }: { children: ReactNode }) {
  const hidden = useHideOnScrollDown()
  const components = [
    {
      title: "abc",
      href: "abc",
      count: 123,
    },
    {
      title: "lorem",
      href: "lorem",
      count: 42,
    },
    {
      title: "ipsum",
      href: "ipsum",
      count: 0,
    },
  ]
  return (
    <div
      className={`sticky top-0 z-50 w-full bg-secondary transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <NavigationMenu className="mx-auto flex w-full max-w-4xl justify-between p-3 pb-1.5">
        <div>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-lg" href="/">
                RequestBin
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex">
              <NavigationMenuTrigger
                onPointerMove={(e) => e.preventDefault()}
                onPointerLeave={(e) => e.preventDefault()}
              >
                Baskets
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-50 gap-2">
                  {components.map((component) => (
                    <MenuListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.count} requests
                    </MenuListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-subtle"
                href="https://github.com/ls-capstone-team-one/hook-catcher"
              >
                GitHub
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
        <div>{children}</div>
      </NavigationMenu>
    </div>
  )
}

function MenuListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink href={href}>
        <div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
