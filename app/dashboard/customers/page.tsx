"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"
import { customersApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const { toast } = useToast()

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    const response = await customersApi.getAll()
    if (response.success) {
      setCustomers((response.data as Customer[]) || [])
    } else {
      toast({ title: "Error", description: response.error, variant: "destructive" })
    }
    setLoading(false)
  }

  const handleCreate = async () => {
    const response = await customersApi.create(formData)
    if (response.success) {
      toast({ title: "Success", description: "Customer created successfully" })
      fetchCustomers()
      setDialogOpen(false)
      setFormData({ name: '', phone: '', email: '' })
    } else {
      toast({ title: "Error", description: response.error, variant: "destructive" })
    }
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setFormData({ name: customer.name, phone: customer.phone, email: customer.email || '' })
    setDialogOpen(true)
  }

  const handleUpdate = async () => {
    if (!editingCustomer) return
    const response = await customersApi.update(editingCustomer.id, formData)
    if (response.success) {
      toast({ title: "Success", description: "Customer updated successfully" })
      fetchCustomers()
      setDialogOpen(false)
      setEditingCustomer(null)
      setFormData({ name: '', phone: '', email: '' })
    } else {
      toast({ title: "Error", description: response.error, variant: "destructive" })
    }
  }

  const handleDelete = async (id: string) => {
    const response = await customersApi.delete(id)
    if (response.success) {
      toast({ title: "Success", description: "Customer deleted successfully" })
      fetchCustomers()
    } else {
      toast({ title: "Error", description: response.error, variant: "destructive" })
    }
  }

  const handleSubmit = () => {
    if (editingCustomer) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingCustomer(null); setFormData({ name: '', phone: '', email: '' }) }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
              <DialogDescription>
                {editingCustomer ? 'Update customer information' : 'Add a new customer to your database'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>{editingCustomer ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>All your registered customers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.email || '-'}</TableCell>
                  <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(customer)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(customer.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
