import { useEffect, useState } from "react";
import {
  Download,
  DollarSign,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Store,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { apiList, callGet, callPost } from "@/axios/api";
import PaymentModal from "@/components/PaymentModal";
import { toast } from "sonner";

// Status config for visual consistency
const STATUS_CONFIG = {
  STATUS_NORMAL: {
    label: "Идэвхтэй",
    icon: CheckCircle,
    badge: "default",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-700 dark:text-emerald-300",
    icon_color: "text-emerald-600 dark:text-emerald-400",
  },
  STATUS_UNPAID: {
    label: "Төлөгдөөгүй",
    icon: XCircle,
    badge: "destructive",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-700 dark:text-red-300",
    icon_color: "text-red-600 dark:text-red-400",
  },
};

export default function PaymentTab() {
  const [stores, setStores] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)
  const [paymentData, setPaymentData] = useState()

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await callGet(`${apiList.merchant}/stores`);
        const data = res.items;
        setStores(data || []);
        setInvoices(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedTotal = selected.length * 75000;

  const activeCount = stores.filter((s) => s.days_left > 0).length;

const handlePay = async () => {
  try {
    const res = await callPost(`${apiList.merchant}/plan`, {
      id: selected,
    });

    if (res?.status) {
      setOpen(true)
      setPaymentData(res?.data)
    } else {
      toast.error(res?.msg[0])
    }
    
  } catch (err) {
    console.error(err);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground">Уншиж байна...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-8">
      <PaymentModal onClose={() => setOpen(false)} isOpen={open} setOpenModal={setOpen} data={paymentData && paymentData} />
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Store className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold">{stores.length}</p>
              <p className="text-sm text-muted-foreground">Нийт дэлгүүр</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-sm text-muted-foreground">Идэвхтэй</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold">
                {stores.reduce((s, st) => s + st.amount, 0).toLocaleString()}₮
              </p>
              <p className="text-sm text-muted-foreground">Сарын нийт</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg">
                Дэлгүүрүүд
              </CardTitle>
              <CardDescription className="text-sm">
                Сунгах дэлгүүрээ сонгоно уу
              </CardDescription>
            </div>
            {selected.length > 0 && (
              <Button onClick={handlePay}>
                <Download className="h-4 w-4 mr-2" />
                Сунгах ({selected.length}) — {selectedTotal.toLocaleString()}₮
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {stores.map((store) => {
              const config = STATUS_CONFIG[store.statusCode] || STATUS_CONFIG.STATUS_UNPAID;
              const StatusIcon = config.icon;
              const isSelected = selected.includes(store.id);

              return (
                <div
                  key={store.id}
                  onClick={() => toggleSelect(store.id)}
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : config.bg + " " + config.border
                  }`}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleSelect(store.id)}
                    className="shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium truncate">{store.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {store.plan}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {store.domain}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <Clock className={`w-4 h-4 ${config.icon_color}`} />
                    <span className={`text-sm font-medium ${config.text}`}>
                      {store.daysLeft > 0
                        ? `${store.daysLeft} хоног`
                        : "Дууссан"}
                    </span>
                  </div>

                  <div className="hidden md:block text-right shrink-0">
                    <p className="text-sm font-medium">
                      75,000₮
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {store.due_date}
                    </p>
                  </div>

                  <Badge variant={config.badge} className="shrink-0">
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Төлбөрийн түүх
          </CardTitle>
          <CardDescription>Таны өмнөх төлбөрүүд</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{inv.store_name}</p>
                  <p className="text-sm text-muted-foreground">{inv.date}</p>
                </div>
                <Badge variant={inv.paid ? "default" : "secondary"}>
                  {inv.amount.toLocaleString()}₮
                </Badge>
              </div>
            ))}
            {invoices.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Төлбөрийн түүх байхгүй
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}