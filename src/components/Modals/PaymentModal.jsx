import { callGet } from '@/axios/api';
import { useRouter } from 'next/router';
import { QRCodeCanvas } from 'qrcode.react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

const PaymentModal = ({ isOpen, onClose, data, price, slug }) => {
  const router = useRouter();

//   const handleClick = () => {
//     callGet(`${apiList.payment}/check/${data?.orderId}`).then((res) => {
//       if (res?.data === 'COMPLETED') {
//         router.push(`/successful/${res?.data}`);
//       }
//     });
//   };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white flex flex-col max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle className="text-center text-xl font-semibold text-black">Төлбөр төлөх</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-4 sm:space-y-6 pb-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{price} MNT</div>
            </div>

            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="mb-4">
                  <div className="flex justify-center items-center">
                    <div className="w-full max-w-[200px] sm:max-w-[256px]">
                      <QRCodeCanvas value={data?.qrCode || ""} size={200} className="w-full h-auto" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-sm font-medium text-gray-900">QR уншуулж төлнө үү</div>
                  <div className="text-xs text-gray-500">Банкны аппликейшн ашиглаж төлөх</div>
                </div>
<div className="shrink-0 px-6 py-4 pb-safe border-t bg-white sticky bottom-0">
          <div className="flex gap-2 sm:gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent text-black">
              Буцах
            </Button>
            <Button onClick={() => checkPayment()} className="flex-1 bg-black hover:bg-blue-700">
              Төлбөр шалгах
            </Button>
          </div>
        </div>
                <div>
                  <ul className="sm:hidden flex justify-center flex-wrap gap-5">
                    {data &&
                      data?.links.map((el, i) => {
                        return (
                          <li key={i}>
                            <a href={el.link}>
                              <img alt={el.logo} width={50} height={50} src={el.logo || "/placeholder.svg"} />
                            </a>
                          </li>
                        )
                      })}
                      
                  </ul>
                  
                </div>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <div className="text-center">
              <div className="text-xs text-gray-500">Төлбөр төлсөн тохиолдолд захиалга автоматаар баталгаажна</div>
            </div>
          </div>
        </div>

        {/* Buttons sticky at bottom with safe area padding */}
        
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
