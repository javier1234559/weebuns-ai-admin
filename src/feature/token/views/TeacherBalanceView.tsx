import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "../hooks/useToken";
import TeacherTokenBalance from "../components/TeacherTokenBalance";
export default function TeacherBalanceView() {
  const { data: wallet, isLoading } = useWallet();
  const balance = wallet?.wallet.balance || 0;

  return (
    <div className="w-full">
      {isLoading ? (
        <Skeleton className="size-5 bg-muted" />
      ) : (
        <TeacherTokenBalance tokenAmount={balance} />
      )}
    </div>
  );
}