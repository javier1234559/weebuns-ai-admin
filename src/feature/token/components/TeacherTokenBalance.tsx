import { useState } from "react";
import { ArrowUpRight, Clock, CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWithdraw } from "../hooks/useToken";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface TeacherTokenBalanceProps {
  tokenAmount: number;
}

export default function TeacherTokenBalance({
  tokenAmount,
}: TeacherTokenBalanceProps) {
  const tokenValue = 1000; // 1 token = 1000 VND
  const systemFeePercentage = 20; // 20% system fee
  const withdrawMutation = useWithdraw();
  const [openDialog, setOpenDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(1);

  const realMoneyValue =
    (tokenAmount * tokenValue * (100 - systemFeePercentage)) / 100;

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleWithdraw = (amount: number) => {
    if (amount <= 0 || amount > tokenAmount) {
      toast.error("Số lượng token không hợp lệ");
      return;
    }
    withdrawMutation.mutate(
      { tokenAmount: amount },
      {
        onSuccess: () => {
          toast.success("Yêu cầu rút token đã được gửi");
          setOpenDialog(false);
        },
        onError: (error: any) => {
          toast.error("Có lỗi xảy ra khi gửi yêu cầu rút token");
          console.log(error);
        },
      },
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Số dư tài khoản</CardTitle>
        <DollarSign className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Số dư token</p>
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">
                {formatNumber(tokenAmount)} Token
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Giá trị thực (VND)</p>
            <div className="flex items-center">
              <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-2xl font-bold">
                {formatNumber(realMoneyValue)} ₫
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Đã trừ {systemFeePercentage}% phí hệ thống
            </p>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-4">
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tỷ giá:</span>
            <span className="font-medium">
              1 Token = {formatNumber(tokenValue)} ₫
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Phí hệ thống:</span>
            <span className="font-medium">{systemFeePercentage}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cập nhật lần cuối:</span>
            <span className="flex items-center font-medium">
              <Clock className="mr-1 h-3 w-3" />
              Hôm nay, {new Date().getHours()}:
              {String(new Date().getMinutes()).padStart(2, "0")}
            </span>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => setOpenDialog(true)}
              disabled={tokenAmount <= 0 || withdrawMutation.isPending}
            >
              {withdrawMutation.isPending ? "Đang xử lý..." : "Rút token"}
            </Button>
          </div>
        </div>
      </CardFooter>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nhập số lượng token muốn rút</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              type="number"
              min={1}
              max={tokenAmount}
              value={withdrawAmount}
              onChange={(e) =>
                setWithdrawAmount(
                  Math.max(1, Math.min(tokenAmount, Number(e.target.value))),
                )
              }
              disabled={withdrawMutation.isPending}
            />
            <div className="text-xs text-muted-foreground">
              Tối đa: {formatNumber(tokenAmount)} Token
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
              disabled={withdrawMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              onClick={() => handleWithdraw(withdrawAmount)}
              disabled={
                withdrawMutation.isPending ||
                withdrawAmount < 1 ||
                withdrawAmount > tokenAmount
              }
            >
              {withdrawMutation.isPending ? "Đang xử lý..." : "Xác nhận rút"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
