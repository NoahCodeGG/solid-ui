import type { ComponentProps } from "solid-js"
import { createSignal, For } from "solid-js"

import { As } from "@kobalte/core"

import { Icons } from "~/components/icons"
import { docsConfig } from "~/config/docs"
import { Button } from "~/registry/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/registry/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = createSignal(false)

  return (
    <Sheet open={open()} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <As
          component={Button}
          variant="ghost"
          class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.sidebarOpen class="size-6" />
          <span class="sr-only">Toggle Menu</span>
        </As>
      </SheetTrigger>
      <SheetContent size="xl" position="left" class="pr-0">
        <MobileLink href="/" onOpenChange={setOpen} class="flex items-center">
          <Icons.logo class="mr-2 size-4" fill="currentColor" />
          <span class="font-bold">solid/ui</span>
        </MobileLink>
        <div class="my-4 h-[calc(100vh-8rem)] overflow-y-auto pb-10 pl-6">
          <div class="flex flex-col space-y-3">
            <For each={docsConfig.mainNav}>{(item) => (
              <MobileLink href={item.href} onOpenChange={setOpen}>
                {item.title}
              </MobileLink>
            )}</For>
          </div>
          <div class="flex flex-col space-y-2">
            <For each={docsConfig.sidebarNav}>{(category) => (
              <div class="flex flex-col space-y-3 pt-6">
                <h4 class="font-medium">{category.title}</h4>
                {<For each={category?.items}>{(item) => (
                  <MobileLink href={item.href} onOpenChange={setOpen}>
                    {item.title}
                  </MobileLink>
                )}</For>}
              </div>
            )}</For>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends ComponentProps<"a"> {
  onOpenChange?: (open: boolean) => void
}

function MobileLink(props: MobileLinkProps) {
  return <a {...props} />
}
