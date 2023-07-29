import {
  mdiMagnify,
  mdiPackageVariantClosed,
  mdiListBoxOutline,
  mdiViewDashboard,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiViewDashboard,
    label: 'Dashboard',
  },
  {
    href: '/items',
    label: 'Items',
    icon: mdiPackageVariantClosed,
  },
  {
    href: '/categories',
    label: 'Categories',
    icon: mdiListBoxOutline,
  },
  {
    href: '/auditTrails',
    label: 'AuditTrails',
    icon: mdiMagnify,
  },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One',
  //     },
  //     {
  //       label: 'Item Two',
  //     },
  //   ],
  // },
]

export default menuAside