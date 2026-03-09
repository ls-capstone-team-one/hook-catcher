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

import { Webhook, Clock, CalendarDays, ClipboardCopy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sandbox() {
  return (
    <div className="w-full">
      <NavBar />
      <div className="mx-auto max-w-4xl grid grid-cols-[repeat(auto-fill,minmax(28rem,1fr))] items-start">
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
      </div>
    </div>
  )
}

function NavBar() {
  return (
    <NavigationMenu className="bg-secondary w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">RequestBin</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function Request() {
  return (
    <section>
      <Card className="max-w-md m-4">
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
            <SimpleCodeBlock content={codePlaceholder}/>
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
