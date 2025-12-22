'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { auditlogsApi } from "@/lib/api"
import { Calendar, Search, Filter } from "lucide-react"

interface AuditLog {
  id: string
  action: string
  entityType: string
  entityId: string
  userId: string
  oldValues?: any
  newValues?: any
  createdAt: string
}

export default function AuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    entityType: '',
    action: '',
    startDate: '',
    endDate: '',
  })

  const fetchAuditLogs = async () => {
    try {
      setLoading(true)
      const params: any = {}

      if (filters.entityType) params.entityType = filters.entityType
      if (filters.action) params.action = filters.action
      if (filters.startDate) params.startDate = filters.startDate
      if (filters.endDate) params.endDate = filters.endDate

      const response = await auditlogsApi.getAll(params)
      if (response.success) {
        setAuditLogs(response.data as AuditLog[])
      } else {
        setError(response.error || 'Failed to fetch audit logs')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuditLogs()
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    fetchAuditLogs()
  }

  const clearFilters = () => {
    setFilters({
      entityType: '',
      action: '',
      startDate: '',
      endDate: '',
    })
    fetchAuditLogs()
  }

  const getActionBadgeVariant = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'default'
      case 'update':
        return 'secondary'
      case 'delete':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track system activities and changes</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading audit logs...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track system activities and changes</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
        <p className="text-muted-foreground mt-1">Track system activities and changes</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>Filter audit logs by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Entity Type</label>
              <Select value={filters.entityType} onValueChange={(value) => handleFilterChange('entityType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All entities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All entities</SelectItem>
                  <SelectItem value="merchant">Merchant</SelectItem>
                  <SelectItem value="coupon">Coupon</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="redemption">Redemption</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <Select value={filters.action} onValueChange={(value) => handleFilterChange('action', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All actions</SelectItem>
                  <SelectItem value="CREATE">Create</SelectItem>
                  <SelectItem value="UPDATE">Update</SelectItem>
                  <SelectItem value="DELETE">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={applyFilters}>
              <Search className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            {auditLogs.length} {auditLogs.length === 1 ? 'entry' : 'entries'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {auditLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No audit logs found matching your criteria.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {new Date(log.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getActionBadgeVariant(log.action)}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium capitalize">{log.entityType}</div>
                        <div className="text-sm text-muted-foreground">ID: {log.entityId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{log.userId}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {log.oldValues && (
                          <div className="text-sm text-muted-foreground">
                            Old: {JSON.stringify(log.oldValues)}
                          </div>
                        )}
                        {log.newValues && (
                          <div className="text-sm">
                            New: {JSON.stringify(log.newValues)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
