import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { MdSearch, MdEdit, MdBlock } from 'react-icons/md'
import EditUserModal from '../../components/admin/EditUserModal'

export default function Users() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
        if (data.success) setUsers(data.users)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleUserUpdated = (updatedUser) => {
    setUsers(prev => prev.map(u => u._id === updatedUser._id ? updatedUser : u))
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?\n\nThis will:\n• Delete the user\n• Delete all bookings\n• Free all booked expert slots')) return
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
      if (data.success) {
        setUsers(prev => prev.filter(u => u._id !== id))
        alert('User deleted successfully')
      }
    } catch (err) {
      alert('Failed to delete user')
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [users, search, statusFilter])

  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  const inputStyle = {
    padding: '10px 14px', borderRadius: '8px',
    border: '1.5px solid #E2E8F0', fontSize: '13px',
    outline: 'none', background: '#fff', color: '#0F172A'
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px', color: '#64748B' }}>
      Loading users...
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)',
        borderRadius: '16px', padding: '28px 32px',
        marginBottom: '24px', color: '#fff',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: '800', position: 'relative' }}>
          User Management
        </h1>
        <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', position: 'relative' }}>
          View, manage and maintain all registered users.
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px', marginBottom: '24px'
      }}>
        {[
          { label: 'Total Users', value: users.length, color: '#DCFCE7', textColor: '#15803D', border: '#BBF7D0' },
          { label: 'Active Users', value: users.filter(u => u.status === 'Active').length, color: '#DCFCE7', textColor: '#15803D', border: '#BBF7D0' },
          { label: 'Inactive Users', value: users.filter(u => u.status === 'Inactive').length, color: '#FEE2E2', textColor: '#DC2626', border: '#FCA5A5' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#fff', borderRadius: '12px', padding: '20px',
            border: '1.5px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {stat.label}
            </p>
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: stat.textColor }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{
        background: '#fff', borderRadius: '12px',
        padding: '20px', border: '1.5px solid #E2E8F0',
        marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <MdSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, width: '100%', paddingLeft: '38px', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#16A34A'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ ...inputStyle, minWidth: '140px' }}
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1.5px solid #E2E8F0', overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['User', 'Email', 'Status', 'Joined', 'Last Login', 'Actions'].map(h => (
                <th key={h} style={{
                  padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left',
                  fontSize: '11px', fontWeight: '700', color: '#94A3B8',
                  textTransform: 'uppercase', letterSpacing: '0.06em'
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => (
              <tr key={user._id} style={{
                borderTop: i > 0 ? '1px solid #F1F5F9' : 'none',
                transition: 'background 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#F0FDF4'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {user.image ? (
                      <img src={user.image} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #16A34A, #22C55E)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: '14px', fontWeight: '700'
                      }}>
                        {(user.name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p style={{ margin: '0 0 2px', fontWeight: '600', color: '#0F172A', fontSize: '14px' }}>
                        {user.name || 'Unknown User'}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#94A3B8' }}>Registered User</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '13px' }}>{user.email}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600',
                    background: user.status === 'Active' ? '#DCFCE7' : '#FEE2E2',
                    color: user.status === 'Active' ? '#15803D' : '#DC2626',
                    border: `1px solid ${user.status === 'Active' ? '#BBF7D0' : '#FCA5A5'}`
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '12px' }}>{formatDate(user.createdAt)}</td>
                <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '12px' }}>{formatDate(user.lastLogin)}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <button
                      onClick={() => { setSelectedUser(user); setIsEditOpen(true) }}
                      style={{
                        padding: '6px 10px', background: '#FEF9C3',
                        color: '#A16207', border: '1px solid #FDE047',
                        borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center'
                      }}
                    >
                      <MdEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={{
                        padding: '6px 10px', background: '#FEE2E2',
                        color: '#DC2626', border: '1px solid #FCA5A5',
                        borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center'
                      }}
                    >
                      <MdBlock size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>👥</div>
                  <p style={{ margin: 0, fontSize: '15px' }}>No users found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => { setIsEditOpen(false); setSelectedUser(null) }}
        user={selectedUser}
        onUpdated={handleUserUpdated}
        apiUrl={`${import.meta.env.VITE_API_URL}/api/users`}
      />
    </div>
  )
}