// https://tailwindcomponents.com/component/radio-buttons-1
'use client'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface TabBarProps {
  currentTab?: number
  tabOptions?: number[]
}

export const TabBar = ({ currentTab = 3, tabOptions = [1, 2, 3] }: TabBarProps) => {
  const router = useRouter()
  const [selected, setSelected] = useState(currentTab)

  const onTabChange = (tab: number) => {
    setSelected(tab)
    setCookie('selectedTab', tab.toString())
    router.refresh()
  }

  return (
    <div className={`
    grid w-full space-x-2 rounded-xl bg-gray-200 p-2
    `}
      style={{ gridTemplateColumns: `repeat(${tabOptions.length}, minmax(0, 1fr))` }}
    >
      {
        tabOptions.map(tab => (
          <div key={tab}>
            <input
              checked={selected === tab}
              onChange={() => { }}
              type="radio"
              id={tab.toString()}
              className="peer hidden" />
            <label
              onClick={() => { onTabChange(tab) }}
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              {tab}
            </label>
          </div>
        )
        )
      }

    </div>
  )
}
