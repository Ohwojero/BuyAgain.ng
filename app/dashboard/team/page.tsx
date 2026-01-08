"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Mail, Shield, Trash2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { teammembersApi } from "@/lib/api"
import { TeamMember } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function TeamPage() {
  const userPlan = "growth" // or "free" or "scale"
  const hasTeamAccess = userPlan === "growth" || userPlan === "scale"
  const teamLimit = userPlan === "growth" ? 2 : userPlan === "scale" ? 6 : 1

  const [showInviteForm, setShowInviteForm] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [inviting, setInviting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await teammembersApi.getAll()
      if (response.success && response.data) {
        setTeamMembers(response.data)
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to fetch team members",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!hasTeamAccess) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground mt-1">Manage who has access to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Management</CardTitle>
            <CardDescription>Collaborate with your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center">
              <UserPlus className="h-12 w-12 mx-auto text-accent mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Upgrade to Add Team Members</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Multi-user access is available on Growth (2 users) and Scale (6 users) plans. Collaborate with your team
                and manage permissions.
              </p>
              <Button asChild>
                <a href="/pricing">View Plans</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInviting(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const roleValue = formData.get('role') as string

    // Map frontend role values to backend enum values
    const roleMap: Record<string, string> = {
      admin: 'ADMIN',
      staff: 'STAFF',
      viewer: 'VIEWER'
    }

    const role = roleMap[roleValue] || 'STAFF'

    try {
      const response = await teammembersApi.create({ email, role })
      if (response.success) {
        toast({
          title: "Success",
          description: "Team member invitation sent successfully",
        })
        setShowInviteForm(false)
        // Refresh the team members list
        fetchTeamMembers()
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to send invitation",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      })
    } finally {
      setInviting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team ({teamMembers.length}/{teamLimit} members)
          </p>
        </div>
        <Button onClick={() => setShowInviteForm(!showInviteForm)} disabled={teamMembers.length >= teamLimit || loading}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {showInviteForm && (
        <Card>
          <CardHeader>
            <CardTitle>Invite Team Member</CardTitle>
            <CardDescription>Send an invitation to join your team</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email Address</Label>
                  <Input id="invite-email" name="email" type="email" placeholder="team@mybusiness.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-role">Role</Label>
                  <Select name="role" defaultValue="staff">
                    <SelectTrigger id="invite-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={inviting}>
                  {inviting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4 mr-2" />
                  )}
                  {inviting ? "Sending..." : "Send Invitation"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)} disabled={inviting}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Active Members</CardTitle>
          <CardDescription>People who have access to this account</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading team members...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{member.name}</p>
                        {member.role === "MERCHANT" && (
                          <Badge variant="secondary" className="text-xs">
                            Owner
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.joinedAt
                          ? `Joined ${new Date(member.joinedAt).toLocaleDateString()}`
                          : `Invited ${new Date(member.invitedAt).toLocaleDateString()}`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.role !== "MERCHANT" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Shield className="h-4 w-4 mr-2" />
                          {member.role === "ADMIN" ? "Admin" : member.role === "STAFF" ? "Staff" : "Viewer"}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>What each role can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Owner</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Full access to all features</li>
                <li>Manage billing and subscription</li>
                <li>Add/remove team members</li>
                <li>Delete account</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Admin</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Generate and manage QR codes</li>
                <li>Scan and redeem codes</li>
                <li>View analytics and reports</li>
                <li>Manage team members (except owner)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Staff</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Scan and redeem codes</li>
                <li>View basic analytics</li>
                <li>Cannot generate new codes</li>
                <li>Cannot access settings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
