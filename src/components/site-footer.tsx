import Link from "next/link";
import { Shell } from "./shell";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { siteConfig } from "@/config/site";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background mt-6">
      <Shell>
        <section className="flex items-center space-x-4">
          <div className="flex-1 flex flex-col">
            <div className="text-left text-sm leading-loose text-muted-foreground">
              Built by{" "}
              <Link
                href={siteConfig.links.www}
                target="_blank"
                rel="noreferrer"
                className="font-semibold transition-colors hover:text-foreground"
              >
                {siteConfig.author}
                <span className="sr-only">Telegram</span>
              </Link>
              .
            </div>
            <div>
              <Link
                href={siteConfig.links.www}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground text-xs underline"
              >
                What is a prufer sequence?
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })
              )}
            >
              <Icons.telegram className="size-4" aria-hidden="true" />
              <span className="sr-only">Telegram</span>
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })
              )}
            >
              <Icons.github className="size-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </Link>

            <ModeToggle />
          </div>
        </section>
      </Shell>
    </footer>
  );
}
