import { defineAbility } from '@casl/ability'
import { User } from '@prisma/client'

type Actions = 'read' | 'update' | 'delete'
type Subjects = 'Entry' | 'Settings'

export default (user: User) => defineAbility((can) => {
  can('read', 'Entry', { userId: user.id })
  can('update', 'Entry', { userId: user.id })
  can('delete', 'Entry', { userId: user.id })
})
