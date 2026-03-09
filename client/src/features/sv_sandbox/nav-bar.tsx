import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  ButtonGroup,
} from "@/components/ui/button-group"

import { Button } from "@/components/ui/button"

import { useHideOnScrollDown } from "@/hooks/useHideOnScrollDown"
import { RefreshCwIcon, RotateCwIcon, Shredder, Trash, Trash2 } from "lucide-react"


export default function NavBar() {
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
        <div>
          <BasketEditButtonBar />
        </div>
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


function BasketEditButtonBar() {
  return (
    <ButtonGroup>
      <ButtonGroup className="flex">
        <Button variant="outline" size="icon" aria-label="Refresh">
          <RefreshCwIcon />
        </Button>
        <Button variant="default" size="icon" aria-label="Auto-refresh">
          <RotateCwIcon />
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="destructive" size="icon" aria-label="More Options">
              <Trash />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Shredder />
                Delete requests
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 />
                Destroy basket
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}