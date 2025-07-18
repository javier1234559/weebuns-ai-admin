import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  TokenWalletResponse,
  TokenPackagesResponse,
  TransactionsResponse,
  CreateTransactionDto,
  UseTokensDto,
  WithdrawTokensDto,
  TransactionWithUserResponse,
} from "@/services/swagger-types";
import tokenApi from "@/feature/token/services/tokenApi";
import { FindAllTransactionsQuery } from "@/feature/token/services/tokenApi";
import { STATS_KEY_FACTORY } from "@/feature/analysis/hooks/useStats";

const TOKEN_BASE = ["token"] as const;

export const TOKEN_KEY_FACTORY = {
  all: TOKEN_BASE,
  wallet: () => [...TOKEN_BASE, "wallet"] as const,
  packages: () => [...TOKEN_BASE, "packages"] as const,
  transactions: () => [...TOKEN_BASE, "transactions"] as const,
  adminTransactions: () => [...TOKEN_BASE, "admin-transactions"] as const,
  transactionList: (params: FindAllTransactionsQuery) =>
    [...TOKEN_BASE, "transactions", params] as const,
  adminTransactionList: (params: FindAllTransactionsQuery) =>
    [...TOKEN_BASE, "admin-transactions", params] as const,
  withdrawalRequests: (params: FindAllTransactionsQuery) =>
    [...TOKEN_BASE, "withdrawal-requests", params] as const,
  withdrawalRequestList: (params: { requestId: string }) =>
    [...TOKEN_BASE, "withdrawal-requests", params.requestId] as const,
  withdrawalRequestDetails: (params: { requestId: string }) =>
    [...TOKEN_BASE, "withdrawal-requests", params.requestId] as const,
} as const;

// Wallet hooks
export const useWallet = (options?: UseQueryOptions<TokenWalletResponse>) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.wallet(),
    queryFn: () => tokenApi.getWallet(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

// Packages hooks
export const usePackages = (
  options?: UseQueryOptions<TokenPackagesResponse>,
) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.packages(),
    queryFn: () => tokenApi.getPackages(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

// Transaction hooks
export const useTransactions = (
  query: FindAllTransactionsQuery,
  options?: UseQueryOptions<TransactionsResponse>,
) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.transactionList(query),
    queryFn: () => tokenApi.getTransactions(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useAdminTransactions = (
  query: FindAllTransactionsQuery,
  options?: UseQueryOptions<TransactionsResponse>,
) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.adminTransactionList(query),
    queryFn: () => tokenApi.getAdminTransactions(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionDto) =>
      tokenApi.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TOKEN_KEY_FACTORY.transactions(),
      });
    },
  });
};

export const useUseTokens = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UseTokensDto) => tokenApi.useTokens(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TOKEN_KEY_FACTORY.wallet(),
      });
    },
  });
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WithdrawTokensDto) => tokenApi.withdraw(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TOKEN_KEY_FACTORY.wallet(),
      });
      queryClient.invalidateQueries({
        queryKey: ["token", "withdrawal-requests"],
      });
    },
  });
};

export const useWithdrawalRequestDetails = (
  requestId: string,
  options?: UseQueryOptions<TransactionWithUserResponse>,
) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.withdrawalRequestDetails({ requestId }),
    queryFn: () => tokenApi.getWithdrawalRequestDetails(requestId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useWithdrawalRequests = (
  query: FindAllTransactionsQuery,
  options?: UseQueryOptions<TransactionsResponse>,
) => {
  return useQuery({
    queryKey: TOKEN_KEY_FACTORY.withdrawalRequests(query),
    queryFn: () => tokenApi.getWithdrawalRequests(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useApproveWithdrawalRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tokenApi.approveWithdrawalRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TOKEN_KEY_FACTORY.withdrawalRequests({}),
      });

      queryClient.invalidateQueries({
        queryKey: STATS_KEY_FACTORY.analysis(),
      });
    },
  });
};

export const useDeclineWithdrawalRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tokenApi.declineWithdrawalRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TOKEN_KEY_FACTORY.withdrawalRequests({}),
      });

      queryClient.invalidateQueries({
        queryKey: STATS_KEY_FACTORY.analysis(),
      });
    },
  });
};
