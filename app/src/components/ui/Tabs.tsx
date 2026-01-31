import { useState, useCallback } from 'react'
import type { KeyboardEvent } from 'react'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

export function Tabs({ tabs, defaultTab, activeTab: controlledTab, onTabChange }: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultTab ?? tabs[0]?.id)

  const activeTab = controlledTab ?? internalTab

  const setActiveTab = (id: string) => {
    if (onTabChange) {
      onTabChange(id)
    } else {
      setInternalTab(id)
    }
  }

  const activeIndex = tabs.findIndex((t) => t.id === activeTab)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let newIndex = activeIndex
      if (e.key === 'ArrowRight') {
        newIndex = (activeIndex + 1) % tabs.length
      } else if (e.key === 'ArrowLeft') {
        newIndex = (activeIndex - 1 + tabs.length) % tabs.length
      } else {
        return
      }
      e.preventDefault()
      setActiveTab(tabs[newIndex].id)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex, tabs],
  )

  const activeContent = tabs.find((t) => t.id === activeTab)?.content

  return (
    <div>
      <div
        role="tablist"
        className="flex flex-wrap gap-1 border-b border-gray-200"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === activeTab}
            aria-controls={`panel-${tab.id}`}
            tabIndex={tab.id === activeTab ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 ${
              tab.id === activeTab
                ? 'bg-white text-orange-600 border-b-2 border-orange-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeContent != null && (
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          className="py-6"
        >
          {activeContent}
        </div>
      )}
    </div>
  )
}
