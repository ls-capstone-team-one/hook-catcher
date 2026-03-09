import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"

import {
  Webhook,
  Clock,
  CalendarDays,
  ClipboardCopy,
  ArrowLeftIcon,
  RefreshCwIcon,
  RotateCwIcon,
  Trash,
  Flame,
  FlameIcon,
  Shredder,
  Trash2,
  Tally5,
  Tally5Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useHideOnScrollDown } from "@/hooks/useHideOnScrollDown"
import { env } from "@/config/env"

export function Sandbox() {
  return (
    <div className="w-full">
      <NavBar />
      <BasketInfoHeader />
      <section className="mx-auto grid max-w-4xl grid-cols-[repeat(auto-fill,minmax(28rem,1fr))] items-start">
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
      </section>
    </div>
  )
}

function NavBar() {
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
      <NavigationMenu className="flex w-full max-w-full justify-between p-3">
        <div>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-lg" href="/">RequestBin</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex">
              <NavigationMenuTrigger
                onPointerMove={(e) => e.preventDefault()}
                onPointerLeave={(e) => e.preventDefault()}
              >
                Baskets
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.count} requests
                    </ListItem>
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
          <BasketButtons />
        </div>
      </NavigationMenu>
    </div>
  )
}

function ListItem({
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

function BasketButtons() {
  const [label, setLabel] = useState("personal")

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
            <Button variant="outline" size="icon" aria-label="More Options">
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

function BasketInfoHeader() {
  const placeholder = {
    id: "48wje34",
    count: 42
  }
  return (
    <section className="p-3">
      <h1 className="text-2xl font-bold">Basket: {placeholder.id}</h1>
      <p>Requests are collected at {env.APP_URL}/{placeholder.id} <ClipboardCopy className="inline" /></p>
      {/* <p><Tally5 className="inline" /> Count = {placeholder.count}</p> */}
      <p>Count = {placeholder.count}</p>
      
    </section>
  )
}

function Request() {
  return (
    <section>
      <Card className="m-4 max-w-md">
        <CardHeader>
          <CardTitle>POST</CardTitle>
          <TimeStamp />
          <DateStamp />
        </CardHeader>
        <CardContent>
          <Path />
          <MyAccordion />
        </CardContent>
        {/* <CardFooter> */}
        {/* <p>Lorem ipsum footer</p> */}
        {/* </CardFooter> */}
      </Card>
    </section>
  )
}

const codePlaceholder = `Accept: */* Connection: close Content-Length: 9 Content-Type:
            application/x-www-form-urlencoded User-Agent: curl/7.81.0 X-City:
            Durham X-Country: US X-Forwarded-For: 108.83.203.18 X-Real-Ip:
            108.83.203.18`

function MyAccordion() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Headers</AccordionTrigger>
        <AccordionContent>
          <SimpleCodeBlock content={codePlaceholder} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Body</AccordionTrigger>
        <AccordionContent>
          {/* <code>{`{"hello": "world"}`} </code> */}
          <SimpleCodeBlock content={`"hello": "world"`} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

type SimpleCodeBlockProps = {
  content: string
}

function SimpleCodeBlock({ content }: SimpleCodeBlockProps) {
  return (
    <Item className="bg-secondary">
      <ItemContent>
        <p>{content}</p>
      </ItemContent>
      <ItemMedia variant="icon">
        <ClipboardCopy />
      </ItemMedia>
    </Item>
  )
}

function Path() {
  return (
    <Item className="bg-primary text-muted">
      <ItemContent>
        <p>/abc123</p>
      </ItemContent>
      <ItemMedia variant="icon">
        <ClipboardCopy />
      </ItemMedia>
    </Item>
  )
}

function TimeStamp() {
  return (
    <Item>
      <ItemMedia variant="icon">
        <Clock />
      </ItemMedia>
      <ItemContent>
        <time>1:23 pm</time>
      </ItemContent>
    </Item>
  )
}

function DateStamp() {
  return (
    <Item>
      <ItemMedia variant="icon">
        <CalendarDays />
      </ItemMedia>
      <ItemContent>
        <time>2026-04-03</time>
      </ItemContent>
    </Item>
  )
}

function MyItem() {
  return (
    <Item>
      <ItemMedia variant="icon">
        <Webhook />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Title</ItemTitle>
        <ItemDescription>Description</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button>Action</Button>
      </ItemActions>
    </Item>
  )
}

export default Sandbox
