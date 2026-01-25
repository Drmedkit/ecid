import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-3 max-w-2xl">
            <Image
              src="/images/eu-cofunded-white.png"
              alt="Co-funded by the European Union"
              width={300}
              height={80}
              className="object-contain w-[200px] md:w-[300px] h-auto"
            />
            <p className="text-muted-foreground text-[10px] md:text-xs text-center leading-relaxed">
              The project is co-funded by the European Union. Views and opinions expressed are however those of the
              author(s) only and do not necessarily reflect those of the European Union or the European Education and
              Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-6 pt-6 border-t border-border">
            <Image
              src="/images/ecid-logo-horizontal.png"
              alt="ECID Logo"
              width={150}
              height={40}
              className="object-contain w-[120px] md:w-[150px] h-auto"
            />

            <p className="text-muted-foreground text-xs md:text-sm text-center">
              © 2025 ECID Project. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
