"use client"

import { apiList, callGet, callGetList, callPost, callPut } from "@/axios/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Database, Download, Edit, Edit2, Key, Plus, RefreshCw, Save, SettingsIcon, Trash2, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general")
  const [editingUser, setEditingUser] = useState(null);
  // const { control, register, handleSubmit, reset, formState: { errors }} = useForm({
  //   defaultValues: {
  //     name: '',
  //     website: '',
  //     bank: '',
  //     accountNumber: '',
  //     accountName: '',
  //   },
  // });

const [users, setUsers] = useState([]);
const [delivery, setDelivery] = useState([]);
const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
const [isAddDeliveryModalOpen, setIsAddDeliveryModalOpen] = useState(false);
const [editingIndex, setEditingIndex] = useState(null);

const { control, handleSubmit, reset } = useForm({
  defaultValues: {
    websiteLink: '',
    username: '',
    password: '',
    bankCode: '',
    accountName: '',
    accountNumber: ''
  }
});

const { fields, append, remove } = useFieldArray({
  control,
  name: "users"
});



const handleEditUser = (index) => {
  setEditingIndex(index);
  reset(users[index]);
  setIsAddUserModalOpen(true);
};

const handleDeleteUser = (index) => {
  setUsers(users.filter((_, i) => i !== index));
};

const handleCloseModal = () => {
  setIsAddUserModalOpen(false);
  setIsAddDeliveryModalOpen(false);
  setEditingUser(null);
  reset({
    username: '',
    usersPassword: '',
    websiteLink: '',
    accountNumber: '',
    accountName: '',
    bankCode: ''
  });
};

  const [loadingStates, setLoadingStates] = useState({})
  const [saveStatuses, setSaveStatuses] = useState({})


  const handleGeneralSave = (values) => {
   setLoadingStates(prev => ({ ...prev, general: true }));

callPost(`${apiList.merchant}/info`, {
  name: values.name,
  website: values.website,
  bankCode: values.bank,
  accountNumber: values.accountNumber,
  accountName: values.accountName
}).then((res) => {
  if (res?.status) {
    toast(res.msg[0]);
  } else {
    toast.error(res.msg[0]);
  }
  
  setLoadingStates(prev => ({ ...prev, general: false }));
}).catch((error) => {
  toast.error("Something went wrong!");
  setLoadingStates(prev => ({ ...prev, general: false }));
});

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

     const fetchUsers = async () => {
      try {
        const response = await callGet(`${apiList.merchant}/staff`)
        
        setUsers(response.items);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchDelivery = async () => {
      try {
        const response = await callGet(`${apiList.merchant}/delivery`)

        setDelivery(response.items);
      } catch (error) {
        console.log(error)
      }
    }
  
  fetchUsers();
  fetchSettings()
  fetchDelivery()
   
  }, [reset])


  const handleUserFormSubmit = async (values) => {
      // Update existing user
      callPost(`${apiList.merchant}/staff`, {
        website: values.websiteLink,
        username: values.username,
        password: values.password,
        accountNumber: values.accountNumber,
        accountName: values.accountName,
        bankCode: values.bankCode,
        name: values.name,
      }).then((res) => {
        if (res?.status) {
          toast.success(res.msg[0])
        } else {
          toast.error(res.msg[0])
        }
      })
    reset();
      handleCloseModal(true)
};

const handleDeliveryFormSubmit = async (values) => {
  callPost(`${apiList.merchant}/delivery`, {
    name: values.deliveryName,
    description: values.deliveryDesc,
    price: values.price
  }).then((res) => {
    if (res?.status) {
      toast.success(res.msg[0])
      reset();
      handleCloseModal(true)
    } else {
      toast.error(res.msg[0])
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
            <TabsTrigger value="delivery" className="text-xs sm:text-sm text-black data-[state=active]:text-white">
              Хүргэлт
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

        <TabsContent value="delivery" className="space-y-4">
          <form
            onSubmit={handleSubmit(handleGeneralSave)}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Хүргэлтийн тохиргоо</CardTitle>
                    <CardDescription className="text-sm">
                      Санал болгодог хүргэлтийн хэлбэрүүдээ нэмээрэй
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
                    <Button type="button" onClick={() => setIsAddDeliveryModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Шинэ нэмэх
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
          {delivery?.map((del, index) => (
            <div
              key={del.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                <div>
                  <span className="text-xs text-gray-500">Нэр</span>
                  <p className="font-medium">{del.name}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Тайлбар</span>
                  <p className="font-medium">{del.description}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Үнэ</span>
                  <p className="font-medium">{del.price}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteUser(del.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
              </CardContent>
                
            </Card>
          </form>
          <Dialog open={isAddDeliveryModalOpen} onOpenChange={handleCloseModal}>
  <DialogContent className="sm:max-w-[500px] bg-white">
    <DialogHeader>
      <DialogTitle className='text-black'>
        Шинэ хүргэлт нэмэх
      </DialogTitle>
      <DialogDescription>
        Хүргэлтийн мэдээллийг оруулна уу
      </DialogDescription>
    </DialogHeader>
    
    <form onSubmit={handleSubmit(handleDeliveryFormSubmit)}>
      <div className="space-y-4 py-4">

        <div className="space-y-2">
          <Label className='text-black' htmlFor="deliveryName">Нэр</Label>
          <Controller
            name="deliveryName"
            control={control}
            rules={{ required: 'Нэр оруулна уу' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="deliveryName"
                  placeholder="Express delivery"
                  className='text-black'
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label className='text-black' htmlFor="deliveryDesc">Тайлбар *</Label>
          <Controller
            name="deliveryDesc"
            control={control}
            rules={{ required: 'Нэвтрэх нэр оруулна уу' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="deliveryDesc"
                  placeholder="2 цагийн дотор хүргэгдэнэ"
                  className='text-black'
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className='text-black' htmlFor="price">Үнэ *</Label>
          <Controller
            name="price"
            control={control}
            rules={{ required: 'Үнэ оруулна уу' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  type="number"
                  id="price"
                  placeholder="20,000"
                  {...field}
                  className="flex-1 text-black"
                />
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={handleCloseModal}
        >
          Болих
        </Button>
        <Button type="submit" disabled={loadingStates.users}>
          {loadingStates.users ? "Хадгалж байна..." : editingUser ? "Засах" : "Нэмэх"}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
  <Card>
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base sm:text-lg">Хандах эрх тохиргоо</CardTitle>
          <CardDescription className="text-sm">
            Та бидэнд Shopify.com дэлгүүр лүүгээ хандах эрх өгснөөр бид тохиргоо хийнэ төлбөрийн систем холбодог, Нэг удаагийн код асууж болно.
          </CardDescription>
        </div>
        <Button type="button" onClick={() => setIsAddUserModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Шинэ нэмэх
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      {users?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Одоогоор данс нэмэгдээгүй байна
        </div>
      ) : (
        <div className="space-y-3">
          {users?.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 flex-1">
                <div>
                  <span className="text-xs text-gray-500">Нэвтрэх нэр</span>
                  <p className="font-medium">{user.username}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Дансны дугаар</span>
                  <p className="font-medium">{user.accountNumber}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Вэбсайт</span>
                  <p className="font-medium">{user.website}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Нэр</span>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>

  <Dialog open={isAddUserModalOpen} onOpenChange={handleCloseModal}>
  <DialogContent className="sm:max-w-[500px] bg-white">
    <DialogHeader>
      <DialogTitle className='text-black'>
        {editingUser ? 'Данс засах' : 'Шинэ данс нэмэх'}
      </DialogTitle>
      <DialogDescription>
        Дансны мэдээллийг оруулна уу
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit(handleUserFormSubmit)}>
      <div className="space-y-4 py-4">

        <div className="space-y-2">
          <Label className='text-black' htmlFor="username">Нэр</Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Нэр оруулна уу' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="name"
                  placeholder=""
                  className='text-black'
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label className='text-black' htmlFor="username">Нэвтрэх нэр *</Label>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Нэвтрэх нэр оруулна уу' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="username"
                  placeholder="example@gmail.com"
                  className='text-black'
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className='text-black' htmlFor="password">Нууц үг *</Label>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Нууц үг оруулна уу' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  type="password"
                  id="password"
                  placeholder="Нууц үг"
                  {...field}
                  className="flex-1 text-black"
                />
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className='text-black' htmlFor="websiteLink">Вэбсайт линк *</Label>
          <Controller
            name="websiteLink"
            control={control}
            rules={{ required: 'Вэбсайт линк оруулна уу' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="websiteLink"
                  placeholder="www.example.com"
                  className='text-black'
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className='text-black' htmlFor="accountNumber">Дансны дугаар *</Label>
          <Controller
            name="accountNumber"
            control={control}
            rules={{ required: 'Дансны дугаар оруулна уу' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="accountNumber"
                  placeholder="Дансны дугаар"
                  className='text-black'
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className='text-black' htmlFor="accountName">Дансны нэр *</Label>
          <Controller
            name="accountName"
            control={control}
            rules={{ required: 'Дансны нэр оруулна уу' }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="accountName"
                  placeholder="Дансны нэр"
                  className='text-black'
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className='text-black' htmlFor="bankCode">Банк *</Label>
          <Controller
            name="bankCode"
            control={control}
            rules={{ required: 'Банк сонгоно уу' }}
            render={({ field, fieldState }) => (
              <>
                <select
                  id="bankCode"
                  className="flex h-10 w-full rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...field}
                >
                  <option value="">Банк сонгох</option>
                  <option value="Khan Bank">Khan Bank</option>
                  <option value="Golomt Bank">Golomt Bank</option>
                  <option value="TDB">TDB</option>
                  <option value="State Bank">State Bank</option>
                  <option value="Xac Bank">Xac Bank</option>
                </select>
                {fieldState.error && (
                  <span className="text-xs text-red-600">{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={handleCloseModal}
        >
          Болих
        </Button>
        <Button type="submit" disabled={loadingStates.users}>
          {loadingStates.users ? "Хадгалж байна..." : editingUser ? "Засах" : "Нэмэх"}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
</TabsContent>

        {/* <TabsContent value="notifications" className="space-y-4">
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
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
