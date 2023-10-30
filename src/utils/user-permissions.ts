import { defineAbility } from '@casl/ability';
import { User } from '@prisma/client'

export default (user: User) => defineAbility((can) => {
  can('edit', 'Entry', { 'user.id': 'id' })
})
