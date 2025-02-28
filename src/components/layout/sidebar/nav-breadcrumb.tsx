import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import * as React from "react"
import { Link, useLocation } from "react-router-dom"

import { useNavMenu } from "@/hooks/query/user-menu"
import { cn } from "@/lib/utils"


import type { LucideIcon } from "lucide-react"
import { z } from "zod"

const LucideIconSchema = z.custom<LucideIcon>(
  (data) => {
    return typeof data === "function"
  },
  {
    message: "Invalid Lucide icon",
  },
)

export const ChildrenMenuItemSchema = z.object({
  title: z.string(),
  label: z.string().optional(),
  icon: LucideIconSchema,
  to: z.string().url(),
})

export const MenuItemSchema = z.object({
  title: z.string(),
  label: z.string().optional(),
  icon: LucideIconSchema,
  to: z.string().url(),
  children: z.array(ChildrenMenuItemSchema).optional(),
})

export type IChildrenMenuItem = z.infer<typeof ChildrenMenuItemSchema>
export type MenuItem = z.infer<typeof MenuItemSchema>
export type IMenu = MenuItem

export const MenuArraySchema = z.array(MenuItemSchema)



interface Breadcrumb {
  title: string
  to: string
  isLast: boolean
}

export function NavBreadcrumb({ className }: { className?: string }) {
  const location = useLocation()
  const { data: menus } = useNavMenu()
  const findMenuPath = (
    pathname: string,
    items: IMenu[],
    parents: IMenu[] = [],
  ): (IMenu & { parents: IMenu[] }) | null => {
    for (const item of items) {
      if (item.to === pathname) {
        return { ...item, parents }
      }

      if (item.children?.length) {
        const found = findMenuPath(pathname, item.children, [...parents, item])
        if (found) return found
      }
    }
    return null
  }

  const buildBreadcrumbs = (): Breadcrumb[] => {
    const menuPath = findMenuPath(location.pathname, menus)
    if (!menuPath) return []

    const breadcrumbs: Breadcrumb[] = []

    menuPath.parents.forEach((parent) => {
      breadcrumbs.push({
        title: parent.title,
        to: parent.to,
        isLast: false,
      })
    })

    breadcrumbs.push({
      title: menuPath.title,
      to: menuPath.to,
      isLast: true,
    })

    return breadcrumbs
  }

  const breadcrumbs = buildBreadcrumbs()

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList className="flex-nowrap">
        {breadcrumbs.map((item) => (
          <React.Fragment key={item.to}>
            <BreadcrumbItem>
              {!item.isLast ? (
                <BreadcrumbLink asChild>
                  <Link to={item.to}>
                      {item.title}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
