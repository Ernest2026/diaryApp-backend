import { defineAbility } from '@casl/ability'
import { IUserDb } from '../types/dbmodel'

type Actions = 'read' | 'update' | 'delete'
type Subjects = 'Entry' | 'Settings'

const UserPermissions = (user: IUserDb) => defineAbility((can) => {
  can('read', 'Entry', { userId: user._id })
  can('update', 'Entry', { userId: user._id })
  can('delete', 'Entry', { userId: user._id })
})

export default UserPermissions
