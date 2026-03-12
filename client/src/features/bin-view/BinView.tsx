import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Clock,
  CalendarDays,
  RefreshCwIcon,
  RotateCwIcon,
  Shredder,
  Trash,
  Trash2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import NavBar from "@/components/custom-ui/nav-bar"
import CopyButton from "@/components/custom-ui/button-copy"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Item, ItemContent, ItemMedia } from "@/components/ui/item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useParams } from "react-router"
import { env } from "@/config/env"
import * as binService from "./fetch_bins.ts"
import { useEffect, useState } from "react"
import type { BinWithRequests, RequestDocument } from "@/types/request.ts"

export default function BinView() {
  const [bin, setBin] = useState<BinWithRequests | null>(null)

  const { id } = useParams()

  async function getBin(id: string) {
    setBin(await binService.getBin(id))
  }

  useEffect(() => {
    id && getBin(id)
  }, [])

  return (
    <div>
      <NavBar>
        <BasketEditButtonBar />
      </NavBar>
      <BasketInfoHeader bin={bin} />
      <RequestList requests={bin && bin.requests} />
    </div>
  )
}

function BasketInfoHeader({ bin }: { bin: BinWithRequests | null }) {
  const basketUrl = env.APP_URL + "/" + (bin && bin.bin.id)
  console.log(bin)

  return (
    <section className="mx-auto max-w-4xl p-3">
      <h1 className="text-2xl font-bold">Basket: {bin && bin.bin.id}</h1>
      <p>
        Bin URL: {basketUrl} <CopyButton content={basketUrl} />
      </p>
      <p>Request Count: {bin && bin.requests.length}</p>
    </section>
  )
}

function RequestList({ requests }: { requests: RequestDocument[] | null }) {
  return (
    <section className="mx-auto grid max-w-4xl grid-cols-[repeat(auto-fill,minmax(28rem,1fr))] items-start">
      {requests &&
        requests.map((req: RequestDocument) => {
          return <RequestDetails key={req._id} request={req} />
        })}
    </section>
  )
}

function RequestDetails({ request }: { request: RequestDocument }) {
  return (
    <section>
      <Card className="m-4 max-w-md">
        <CardHeader>
          <CardTitle>{request.method}</CardTitle>
          <TimeStamp dateTime={request.received_at} />
          <DateStamp received={request.received_at} />
        </CardHeader>
        <CardContent>
          <RequestPath path={request.path} />
          <RequestHeadersAndBody request={request} />
        </CardContent>
      </Card>
    </section>
  )
}

function RequestHeadersAndBody({ request }: { request: RequestDocument }) {
  const readableHeaders = Object.entries(request.headers).map((entry) => {
    const [header, value] = entry
    return <div className="m-0" key={header}>{`${header}: ${value}`}</div>
  })

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Headers</AccordionTrigger>
        <AccordionContent>
          <SimpleCodeBlock>{readableHeaders}</SimpleCodeBlock>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Body</AccordionTrigger>
        <AccordionContent>
          <SimpleCodeBlock content={JSON.stringify(request.body)} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

type SimpleCodeBlockProps = {
  content?: string
  copyButtonVisible?: boolean
  children?: React.ReactNode
}

function SimpleCodeBlock({
  content,
  copyButtonVisible = true,
  children,
}: SimpleCodeBlockProps) {
  return (
    <Item className="bg-secondary">
      <ItemContent>
        {content && <p>{content}</p>}
        {children}
      </ItemContent>
      {copyButtonVisible && content && <CopyButton content={content} />}
    </Item>
  )
}

function RequestPath({ path }: { path: string }) {
  return (
    <Item className="bg-primary text-primary-foreground">
      <ItemContent>
        <p>{path}</p>
      </ItemContent>
      <CopyButton content={path} />
    </Item>
  )
}

function TimeStamp({ dateTime }: { dateTime: Date }) {
  return (
    <Item>
      <ItemMedia variant="icon">
        <Clock />
      </ItemMedia>
      <ItemContent>
        <time>{dateTime.toTimeString()}</time>
      </ItemContent>
    </Item>
  )
}

function DateStamp({ received }: { received: Date }) {
  return (
    <Item>
      <ItemMedia variant="icon">
        <CalendarDays />
      </ItemMedia>
      <ItemContent>
        <time>{received.toDateString()}</time>
      </ItemContent>
    </Item>
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
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Shredder />
                Delete all requests
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
