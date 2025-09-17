"use client"

import { apiList, callGet, callPost } from "@/axios/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Download, Key, RefreshCw, Save, SettingsIcon, Trash2, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general")
  const { control, register, handleSubmit, reset, formState: { errors }} = useForm({
    defaultValues: {
      name: '',
      website: '',
      bank: '',
      accountNumber: '',
      accountName: '',
    },
  });
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Admin Dashboard",
    siteDescription: "Modern admin dashboard for business management",
    contactEmail: "admin@example.com",
    timezone: "UTC",
    language: "en",
  })

  const [userSettings, setUserSettings] = useState({
    allowRegistration: true,
    requireEmailVerification: true,
    requireAdminApproval: false,
    defaultUserRole: "user",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    notificationFrequency: "immediate",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
  })

  const [apiSettings, setApiSettings] = useState({
    apiRateLimit: "1000",
  })

  const [systemSettings, setSystemSettings] = useState({
    backupFrequency: "daily",
  })

  const [loadingStates, setLoadingStates] = useState({})
  const [saveStatuses, setSaveStatuses] = useState({})

  useEffect(() => {
    const loadTabSettings = (tabName, setter) => {
      const saved = localStorage.getItem(`adminSettings_${tabName}`)
      if (saved) {
        try {
          setter(JSON.parse(saved))
        } catch (error) {
          console.error(`Failed to load ${tabName} settings:`, error)
        }
      }
    }

    loadTabSettings("general", setGeneralSettings)
    loadTabSettings("users", setUserSettings)
    loadTabSettings("notifications", setNotificationSettings)
    loadTabSettings("security", setSecuritySettings)
    loadTabSettings("api", setApiSettings)
    loadTabSettings("system", setSystemSettings)
  }, [])

  const handleSaveTab = async (tabName, settings) => {
    setLoadingStates((prev) => ({ ...prev, [tabName]: true }))
    setSaveStatuses((prev) => ({ ...prev, [tabName]: "" }))

    try {
      // Save to localStorage
      localStorage.setItem(`adminSettings_${tabName}`, JSON.stringify(settings))

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSaveStatuses((prev) => ({ ...prev, [tabName]: "Settings saved successfully!" }))
      setTimeout(() => {
        setSaveStatuses((prev) => ({ ...prev, [tabName]: "" }))
      }, 3000)
    } catch (error) {
      setSaveStatuses((prev) => ({ ...prev, [tabName]: "Failed to save settings. Please try again." }))
      console.error("Save error:", error)
    } finally {
      setLoadingStates((prev) => ({ ...prev, [tabName]: false }))
    }
  }

  const handleGeneralSave = (values) => {
    // setLoadingStates((prev) => ({ ...prev, [tabName]: true}))
    callPost(`${apiList.merchant}/info`, {
      name: values.name,
      website: values.website,
      bankCode: values.bank,
      accountNumber: values.accountNumber,
      accountName: values.accountName
    }).then((res) => {
            if (res?.status) {
        toast(res.msg[0])
      } else {
        toast.error(res.msg[0])
      }
    })
  }

  useEffect(() => {

    const fetchSettings = async () => {
       try {
        const res = await callGet(`${apiList.merchant}/info`)
        const data = res.data;

      reset({
        name: data?.name,
        website: data?.website,
        bank: data?.bankCode,
        accountName: data?.accountName,
        accountNumber: data?.accountNumber
      })
       } catch (err) {
        console.error(err)
       }
      
    }

    fetchSettings()

   
  }, [reset])

  const handleStaffSave = (values) => {
    callPost(`${apiList.merchant}/staff`, {
      username: values.username,
      password: values.password
    }).then((res) => {
      if (res?.status) {
        toast.success(res.msg[0])
      } else {
        toast.success(res.msg[0])
      }
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2 border-b gap-3">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-black" />
          <h1 className="text-2xl font-bold text-black">Тохиргоо</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 min-w-[600px] sm:min-w-0">
            <TabsTrigger value="general" className="text-xs sm:text-sm text-black data-[state=active]:text-white">
              Ерөнхий
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm text-black data-[state=active]:text-white">
              Хэрэглэгч
            </TabsTrigger>
            {/* <TabsTrigger value="notifications" className="text-xs sm:text-sm text-black data-[state=active]:text-white">
              Мэдэгдэл
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm text-black data-[state=active]:text-white">
              Нууцлал
            </TabsTrigger>
            <TabsTrigger value="api" className="text-xs sm:text-sm text-black data-[state=active]:text-white">
              API
            </TabsTrigger>
            <TabsTrigger value="system" className="text-xs sm:text-sm text-black data-[state=active]:text-white">
              Систем
            </TabsTrigger> */}
          </TabsList>
        </div>

        <TabsContent value="general" className="space-y-4">
          <form
            onSubmit={handleSubmit(handleGeneralSave)}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Ерөнхий тохиргоо</CardTitle>
                    <CardDescription className="text-sm">
                      Ерөнхий тохиргоо болон дансны мэдээллээ оруулаарай
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {saveStatuses.general && (
                      <span
                        className={`text-sm ${saveStatuses.general.includes("success") ? "text-green-600" : "text-red-600"}`}
                      >
                        {saveStatuses.general}
                      </span>
                    )}
                    <Button type="submit" disabled={loadingStates.general}>
                      <Save className="h-4 w-4 mr-2" />
                      {loadingStates.general ? "Хадгалж байна..." : "Хадгалах"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Нэр</Label>
                    <Controller name="name" control={control} rules={{ required: true}} render={({ field }) => (
                      <Input
                        id="name"
                        {...field}
                    />
                    )} />
                    
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website link</Label>
                    <Controller name="website" control={control} rules={{ required: true}} render={({ field }) => (
                      <Input
                        id="website"
                        {...field}
                    />
                    )} />
                  </div>
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings((prev) => ({ ...prev, siteDescription: e.target.value }))}
                    rows={3}
                  />
                </div> */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="bank">Банк</Label>
                   <Controller name="bank" control={control} rules={{ required: true}} render={({ field }) => (
                      <Input
                        id="bank"
                        {...field}
                    />
                    )} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Дансны дугаар</Label>
                     <Controller name="accountNumber" control={control} rules={{ required: true}} render={({ field }) => (
                      <Input
                        id="accountNumber"
                        {...field}
                    />
                    )} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Данс эзэмшигчийн нэр</Label>
                   <Controller name="accountName" control={control} rules={{ required: true}} render={({ field }) => (
                      <Input
                        id="accountName"
                        {...field}
                    />
                    )} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <form
            onSubmit={handleSubmit(handleStaffSave)}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Хандах эрх тохиргоо</CardTitle>
                    <CardDescription className="text-sm">Та бидэнд Shopify.com дэлгүүр лүүгээ хандах эрх өгснөөр бид тохиргоо хийнэ төлбөрийн систем холбодог, Нэг удаагийн код асууж болно.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {saveStatuses.users && (
                      <span
                        className={`text-sm ${saveStatuses.users.includes("success") ? "text-green-600" : "text-red-600"}`}
                      >
                        {saveStatuses.users}
                      </span>
                    )}
                    <Button type="submit" disabled={loadingStates.users}>
                      <Save className="h-4 w-4 mr-2" />
                      {loadingStates.users ? "Хадгалж байна..." : "Хадгалах"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Нэвтрэх нэр</Label>
                    <Controller name="username" control={control} rules={{ required: true}} render={({ field }) => (
                      <Input
                        id="username"
                        {...field}
                    />
                    )} />
                    
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Нууц үг</Label>
                    <Controller name="password" control={control} rules={{ required: true}} render={({ field }) => (
                      <Input
                      type="password"
                        id="password"
                        {...field}
                    />
                    )} />
                  </div>
                </div>
              </CardContent>
              {/* <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-medium">User Registration</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Allow new users to register accounts</p>
                  </div>
                  <Switch
                    checked={userSettings.allowRegistration}
                    onCheckedChange={(checked) => setUserSettings((prev) => ({ ...prev, allowRegistration: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-medium">Email Verification</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <Switch
                    checked={userSettings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      setUserSettings((prev) => ({ ...prev, requireEmailVerification: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-medium">Admin Approval</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Require admin approval for new accounts</p>
                  </div>
                  <Switch
                    checked={userSettings.requireAdminApproval}
                    onCheckedChange={(checked) =>
                      setUserSettings((prev) => ({ ...prev, requireAdminApproval: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Default User Role</Label>
                  <Select
                    value={userSettings.defaultUserRole}
                    onValueChange={(value) => setUserSettings((prev) => ({ ...prev, defaultUserRole: value }))}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent> */}
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSaveTab("notifications", notificationSettings)
            }}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Notification Preferences</CardTitle>
                    <CardDescription className="text-sm">
                      Configure how and when you receive notifications
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {saveStatuses.notifications && (
                      <span
                        className={`text-sm ${saveStatuses.notifications.includes("success") ? "text-green-600" : "text-red-600"}`}
                      >
                        {saveStatuses.notifications}
                      </span>
                    )}
                    <Button type="submit" disabled={loadingStates.notifications}>
                      <Save className="h-4 w-4 mr-2" />
                      {loadingStates.notifications ? "Saving..." : "Save Notifications"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-medium">Push Notifications</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-medium">Marketing Emails</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, marketingEmails: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select
                    value={notificationSettings.notificationFrequency}
                    onValueChange={(value) =>
                      setNotificationSettings((prev) => ({ ...prev, notificationFrequency: value }))
                    }
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSaveTab("security", securitySettings)
            }}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Security Settings</CardTitle>
                    <CardDescription className="text-sm">
                      Configure security policies and authentication methods
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {saveStatuses.security && (
                      <span
                        className={`text-sm ${saveStatuses.security.includes("success") ? "text-green-600" : "text-red-600"}`}
                      >
                        {saveStatuses.security}
                      </span>
                    )}
                    <Button type="submit" disabled={loadingStates.security}>
                      <Save className="h-4 w-4 mr-2" />
                      {loadingStates.security ? "Saving..." : "Save Security"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={securitySettings.twoFactorAuth ? "default" : "secondary"}>
                      {securitySettings.twoFactorAuth ? "Enabled" : "Disabled"}
                    </Badge>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings((prev) => ({ ...prev, twoFactorAuth: checked }))
                      }
                    />
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings((prev) => ({ ...prev, sessionTimeout: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings((prev) => ({ ...prev, passwordExpiry: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Password Policy</Label>
                  <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      Minimum 8 characters
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      At least one uppercase letter
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      At least one number
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      At least one special character
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSaveTab("api", apiSettings)
            }}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">API Configuration</CardTitle>
                    <CardDescription className="text-sm">
                      Manage API keys, rate limits, and access controls
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {saveStatuses.api && (
                      <span
                        className={`text-sm ${saveStatuses.api.includes("success") ? "text-green-600" : "text-red-600"}`}
                      >
                        {saveStatuses.api}
                      </span>
                    )}
                    <Button type="submit" disabled={loadingStates.api}>
                      <Save className="h-4 w-4 mr-2" />
                      {loadingStates.api ? "Saving..." : "Save API"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
                  <Input
                    id="apiRateLimit"
                    type="number"
                    value={apiSettings.apiRateLimit}
                    onChange={(e) => setApiSettings((prev) => ({ ...prev, apiRateLimit: e.target.value }))}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>API Keys</Label>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm">Production API Key</p>
                        <p className="text-xs text-muted-foreground truncate">pk_live_••••••••••••••••</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Active</Badge>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm">Development API Key</p>
                        <p className="text-xs text-muted-foreground truncate">pk_test_••••••••••••••••</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Test</Badge>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Key className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSaveTab("system", systemSettings)
            }}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">System Management</CardTitle>
                    <CardDescription className="text-sm">
                      Backup, maintenance, and system configuration options
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {saveStatuses.system && (
                      <span
                        className={`text-sm ${saveStatuses.system.includes("success") ? "text-green-600" : "text-red-600"}`}
                      >
                        {saveStatuses.system}
                      </span>
                    )}
                    <Button type="submit" disabled={loadingStates.system}>
                      <Save className="h-4 w-4 mr-2" />
                      {loadingStates.system ? "Saving..." : "Save System"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) => setSystemSettings((prev) => ({ ...prev, backupFrequency: value }))}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Data Management</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Export Data</span>
                      <span className="sm:hidden">Export</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Import Data</span>
                      <span className="sm:hidden">Import</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Database className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Create Backup</span>
                      <span className="sm:hidden">Backup</span>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Maintenance</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Clear Cache</span>
                      <span className="sm:hidden">Cache</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Database className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Optimize Database</span>
                      <span className="sm:hidden">Optimize</span>
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Reset System</span>
                      <span className="sm:hidden">Reset</span>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>System Information</Label>
                  <div className="grid gap-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span>v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>2024-01-15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Database Size:</span>
                      <span>2.4 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage Used:</span>
                      <span>15.2 GB / 100 GB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
