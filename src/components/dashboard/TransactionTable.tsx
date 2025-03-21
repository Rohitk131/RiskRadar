
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MoreHorizontal, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

// Mock data for transaction table
const transactions = [
  {
    id: 'txn_1234567890',
    date: '2023-10-05T14:48:00',
    amount: 1299.99,
    channel: 'Web',
    payment_mode: 'Card',
    gateway: 'CitiBank',
    payer_email: 'john.doe@example.com',
    payer_device: 'Windows Chrome',
    payee: 'Electronics Store',
    is_fraud_predicted: true,
    is_fraud_reported: true,
    fraud_score: 0.89,
  },
  {
    id: 'txn_0987654321',
    date: '2023-10-05T13:24:00',
    amount: 499.50,
    channel: 'Mobile',
    payment_mode: 'UPI',
    gateway: 'HDFC',
    payer_email: 'jane.smith@example.com',
    payer_device: 'iOS Safari',
    payee: 'Fashion Outlet',
    is_fraud_predicted: false,
    is_fraud_reported: false,
    fraud_score: 0.12,
  },
  {
    id: 'txn_5432167890',
    date: '2023-10-05T11:15:00',
    amount: 2450.00,
    channel: 'Web',
    payment_mode: 'NEFT',
    gateway: 'SBI',
    payer_email: 'robert.johnson@example.com',
    payer_device: 'macOS Firefox',
    payee: 'Home Appliances',
    is_fraud_predicted: true,
    is_fraud_reported: false,
    fraud_score: 0.76,
  },
  {
    id: 'txn_6789054321',
    date: '2023-10-05T10:03:00',
    amount: 750.25,
    channel: 'Mobile',
    payment_mode: 'Card',
    gateway: 'ICICI',
    payer_email: 'sarah.wilson@example.com',
    payer_device: 'Android Chrome',
    payee: 'Grocery Store',
    is_fraud_predicted: false,
    is_fraud_reported: false,
    fraud_score: 0.23,
  },
  {
    id: 'txn_0123456789',
    date: '2023-10-05T09:30:00',
    amount: 1899.99,
    channel: 'Web',
    payment_mode: 'UPI',
    gateway: 'Axis',
    payer_email: 'michael.brown@example.com',
    payer_device: 'Windows Edge',
    payee: 'Electronics Store',
    is_fraud_predicted: false,
    is_fraud_reported: true,
    fraud_score: 0.45,
  },
];

const TransactionTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatFraudScore = (score: number) => {
    return `${(score * 100).toFixed(0)}%`;
  };

  const getFraudStatusElement = (isPredicted: boolean, isReported: boolean, score: number) => {
    if (isPredicted && isReported) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1 px-2 py-1">
          <AlertCircle className="h-3 w-3" />
          <span>Confirmed</span>
        </Badge>
      );
    } else if (isPredicted) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1 px-2 py-1 opacity-80">
          <AlertCircle className="h-3 w-3" />
          <span>Suspected</span>
        </Badge>
      );
    } else if (isReported) {
      return (
        <Badge variant="warning" className="flex items-center gap-1 px-2 py-1">
          <HelpCircle className="h-3 w-3" />
          <span>Reported</span>
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-green-900/30 text-green-400 border-green-500/20">
          <CheckCircle className="h-3 w-3" />
          <span>Safe</span>
        </Badge>
      );
    }
  };

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.payer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.payee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions, emails, payees..."
            className="pl-9 pr-4 py-2 w-full bg-white/5 border-white/10 rounded-lg focus-visible:ring-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1 border-white/10 bg-white/5 hover:bg-white/10">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden glass-card">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-white/5">
              <TableHead className="w-[200px] text-white/70">Transaction ID</TableHead>
              <TableHead className="w-[100px] text-white/70">Date</TableHead>
              <TableHead className="w-[100px] text-white/70">Amount</TableHead>
              <TableHead className="w-[100px] text-white/70">Channel</TableHead>
              <TableHead className="w-[100px] text-white/70">Payment</TableHead>
              <TableHead className="text-white/70">Payer</TableHead>
              <TableHead className="text-white/70">Payee</TableHead>
              <TableHead className="w-[100px] text-center text-white/70">Status</TableHead>
              <TableHead className="w-[80px] text-right text-white/70">Score</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow 
                  key={transaction.id}
                  className={`
                    transition-colors duration-200
                    ${transaction.is_fraud_predicted && transaction.is_fraud_reported 
                      ? 'bg-red-950/20' 
                      : ''}
                    ${hoveredRow === transaction.id ? 'bg-white/5' : 'hover:bg-white/5'}
                  `}
                  onMouseEnter={() => setHoveredRow(transaction.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell className="font-mono text-xs">
                    {transaction.id}
                  </TableCell>
                  <TableCell className="text-sm text-white/80">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {formatAmount(transaction.amount)}
                  </TableCell>
                  <TableCell className="text-sm text-white/80">
                    {transaction.channel}
                  </TableCell>
                  <TableCell className="text-sm text-white/80">
                    {transaction.payment_mode}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="truncate max-w-[180px]">{transaction.payer_email}</div>
                    <div className="text-xs text-white/50 truncate max-w-[180px]">
                      {transaction.payer_device}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {transaction.payee}
                  </TableCell>
                  <TableCell className="text-center">
                    {getFraudStatusElement(
                      transaction.is_fraud_predicted,
                      transaction.is_fraud_reported,
                      transaction.fraud_score
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    <div 
                      className={`
                        ${transaction.fraud_score > 0.7 ? 'text-red-400' : 
                          transaction.fraud_score > 0.4 ? 'text-amber-400' : 
                          'text-green-400'}
                      `}
                    >
                      {formatFraudScore(transaction.fraud_score)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-xl border-white/10">
                        <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">View details</DropdownMenuItem>
                        <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">Flag as fraud</DropdownMenuItem>
                        <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">Verify as legitimate</DropdownMenuItem>
                        <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">Export data</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center text-white/50">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
