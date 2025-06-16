import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "../hooks/useToken";
import TeacherTokenBalance from "../components/TeacherTokenBalance";

export default function TeacherBalanceView() {
  const { data: wallet, isLoading } = useWallet();
  const balance = wallet?.wallet.balance || 0;

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Số dư</h2>
      <p className="text-sm text-muted-foreground">Số dư của giáo viên</p>
      {isLoading ? (
        <Skeleton className="size-5 bg-muted" />
      ) : (
        <TeacherTokenBalance tokenAmount={balance} />
      )}
    </div>
  );
}
