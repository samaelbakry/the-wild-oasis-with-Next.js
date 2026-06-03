"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const activeFilter = searchParams.get("capacity") ?? "all"

    function handleFilter(filter){
        const params = new URLSearchParams(searchParams)
        params.set("capacity", filter)
        router.replace(`${pathname}?${params.toString()}`)
    }

  return (
    <div className="flex items-center gap-4">
      <Button filter="all" activeFilter={activeFilter} handleFilter={handleFilter}>
        All
      </Button>
      <Button filter="small" activeFilter={activeFilter} handleFilter={handleFilter}>
        1-3 guests
      </Button>
      <Button filter="medium" activeFilter={activeFilter} handleFilter={handleFilter}>
        4-7 guests
      </Button>
      <Button filter="large" activeFilter={activeFilter} handleFilter={handleFilter}>
        8+ guests
      </Button>
    </div>
  )
}


function Button({children , filter , activeFilter , handleFilter}){
    return<>
    <button className={`px-4 py-2 bg-primary-900 duration-500 transition-all text-primary-100 rounded ${activeFilter === filter ? 'bg-primary-600 text-primary-200' : ''}`}
      onClick={() => handleFilter(filter)}>
        {children}
      </button>
    </>
}