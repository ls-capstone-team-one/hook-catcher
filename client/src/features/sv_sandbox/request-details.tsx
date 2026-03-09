import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Item,
  ItemContent,
  ItemMedia,
} from "@/components/ui/item"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Clock,
  CalendarDays,
} from "lucide-react"

// import { useState } from "react"
import { env } from "@/config/env"
import NavBar from "./nav-bar"
import CopyButton from "./button-copy"

export default function BinView() {
  return (
    <div className="w-full">
      <NavBar />
      <BasketInfoHeader />
      <section className="mx-auto grid max-w-4xl grid-cols-[repeat(auto-fill,minmax(28rem,1fr))] items-start">
        <RequestDetails />
        <RequestDetails />
        <RequestDetails />
        <RequestDetails />
        <RequestDetails />
        <RequestDetails />
        <RequestDetails />
        <RequestDetails />
        <RequestDetails />
        <RequestDetails />
        <RequestDetails />
      </section>
    </div>
  )
}




function BasketInfoHeader() {
  const placeholder = {
    id: "48wje34",
    count: 42,
  }

  const basketUrl = env.APP_URL + "/" + placeholder.id

  return (
    <section className="mx-auto max-w-4xl p-3">
      <h1 className="text-2xl font-bold">Basket: {placeholder.id}</h1>
      <p>
        Bin URL: {basketUrl} <CopyButton content={basketUrl} />
      </p>
      {/* <p><Tally5 className="inline" /> Count = {placeholder.count}</p> */}
      <p>Request Count: {placeholder.count}</p>
    </section>
  )
}



function RequestDetails() {
  return (
    <section>
      <Card className="m-4 max-w-md">
        <CardHeader>
          <CardTitle>POST</CardTitle>
          <TimeStamp />
          <DateStamp />
        </CardHeader>
        <CardContent>
          <RequestPath path="abc123" />
          <RequestHeadersAndBody />
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

function RequestHeadersAndBody() {
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
  copyButtonVisible?: boolean
}

function SimpleCodeBlock({
  content,
  copyButtonVisible = true,
}: SimpleCodeBlockProps) {
  return (
    <Item className="bg-secondary">
      <ItemContent>
        <p>{content}</p>
      </ItemContent>
      {copyButtonVisible && (
        <CopyButton content={content} className="hover:bg-ring" />
      )}
    </Item>
  )
}

function RequestPath({ path }: { path: string }) {
  return (
    <Item className="bg-primary text-primary-foreground">
      <ItemContent>
        <p>/{path}</p>
      </ItemContent>
      <CopyButton content={path} />
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


