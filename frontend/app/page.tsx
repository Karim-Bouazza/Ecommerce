import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 bg-linear-to-r from-zinc-300/50 via-zinc-200/25 to-gray-200">
      <header className="px-4 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-wider text-gray-900">
              STOREONE
            </h1>
          </div>

          <nav className="hidden items-center gap-10 md:flex">
            <a className="text-md font-medium text-black" href="#">
              Home
            </a>
            <a className="text-md font-medium text-black" href="#">
              Store
            </a>
            <a className="text-md font-medium text-black" href="#">
              About
            </a>
            <a className="text-md font-medium text-black" href="#">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col items-center justify-between overflow-hidden">
          <div className="relative z-10 mt-4 h-90 w-full max-w-[980px] sm:h-[500px] md:mt-2 md:h-[600px] lg:h-[480px]">
            <Image
              src="/images/nike_storeone.png"
              alt="Sneaker"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="z-20 flex w-full flex-col gap-10 pb-6 md:absolute md:bottom-16 md:left-0 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xs space-y-6 text-left">
              <p className="text-sm leading-6 text-gray-600">
                Comfort, style, and durability in every pair designed to move
                with you.
              </p>
              <Button className="h-10 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90">
                Shop now
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="text-left md:text-right">
              <h2 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-black sm:text-6xl lg:text-7xl">
                MADE FOR
                <br />
                EVERY STEP
              </h2>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
