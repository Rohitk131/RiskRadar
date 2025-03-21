
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
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  AlertCircle, 
  CheckCircle, 
  HelpCircle, 
  Eye,
  AlertTriangle 
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { detectFraud, Transaction } from '@/services/ruleEngine';

// Enhanced mock data for transaction table
const enhancedTransactions: Transaction[] = [
  {
    id: 'txn_1234567890',
    date: '2023-10-05T14:48:00',
    amount: 1299.99,
    channel: 'Web',
    payment_mode: 'Card',
    gateway: 'CitiBank',
    payer_email: 'john.doe@example.com',
    payer_device: 'Windows Chrome',
    payer_location: 'Russia',
    payer_usual_location: 'India',
    payer_browser: 'Chrome',
    payer_usual_browser: 'Chrome',
    payee: 'Electronics Store',
    is_new_payee: false,
    avg_transaction_amount: 200,
    std_transaction_amount: 50,
    transaction_count_last_hour: 5,
    usual_transaction_count_per_hour: 1,
    password_changed_recently: true,
    usual_channel: 'Mobile',
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
    payer_location: 'India',
    payer_usual_location: 'India',
    payer_browser: 'Safari',
    payer_usual_browser: 'Safari',
    payee: 'Fashion Outlet',
    is_new_payee: false,
    avg_transaction_amount: 450,
    std_transaction_amount: 100,
    transaction_count_last_hour: 1,
    usual_transaction_count_per_hour: 2,
    password_changed_recently: false,
    usual_channel: 'Mobile',
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
    payer_location: 'USA',
    payer_usual_location: 'USA',
    payer_browser: 'Tor Browser',
    payer_usual_browser: 'Firefox',
    payee: 'Home Appliances',
    is_new_payee: true,
    avg_transaction_amount: 500,
    std_transaction_amount: 150,
    transaction_count_last_hour: 3,
    usual_transaction_count_per_hour: 1,
    password_changed_recently: false,
    usual_channel: 'Web',
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
    payer_location: 'India',
    payer_usual_location: 'India',
    payer_browser: 'Chrome',
    payer_usual_browser: 'Chrome',
    payee: 'Grocery Store',
    is_new_payee: false,
    avg_transaction_amount: 800,
    std_transaction_amount: 100,
    transaction_count_last_hour: 1,
    usual_transaction_count_per_hour: 1,
    password_changed_recently: false,
    usual_channel: 'Mobile',
  },
  {
    id: 'txn_0123456789',
    date: '2023-10-05T09:30:00',
    amount: 12899.99,
    channel: 'Web',
    payment_mode: 'UPI',
    gateway: 'Axis',
    payer_email: 'michael.brown@example.com',
    payer_device: 'Windows Edge',
    payer_location: 'UK',
    payer_usual_location: 'India',
    payer_browser: 'Edge',
    payer_usual_browser: 'Chrome',
    payee: 'New Electronics Store',
    is_new_payee: true,
    avg_transaction_amount: 800,
    std_transaction_amount: 200,
    transaction_count_last_hour: 8,
    usual_transaction_count_per_hour: 2,
    password_changed_recently: true,
    usual_channel: 'Mobile',
  },
];

const EnhancedTransactionTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [processedTransactions, setProcessedTransactions] = useState<Array<Transaction & { 
    fraudResult: ReturnType<typeof detectFraud>,
    is_fraud_predicted: boolean,
    is_fraud_reported: boolean,
    fraud_score: number
  }>>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  useEffect(() => {
    // Process transactions with the rule engine
    const processed = enhancedTransactions.map(transaction => {
      const fraudResult = detectFraud(transaction);
      
      // Map old data model to new one for compatibility
      return {
        ...transaction,
        fraudResult,
        is_fraud_predicted: fraudResult.isFraud,
        is_fraud_reported: Math.random() > 0.7 && fraudResult.isFraud, // Random for demo
        fraud_score: fraudResult.fraudScore / 100
      };
    });
    
    setProcessedTransactions(processed);
  }, []);

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

  const getFraudStatusElement = (transaction: any) => {
    if (transaction.is_fraud_predicted && transaction.is_fraud_reported) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1 px-2 py-1">
          <AlertCircle className="h-3 w-3" />
          <span>Confirmed</span>
        </Badge>
      );
    } else if (transaction.is_fraud_predicted) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1 px-2 py-1 opacity-80">
          <AlertCircle className="h-3 w-3" />
          <span>Suspected</span>
        </Badge>
      );
    } else if (transaction.fraudResult.isSuspicious) {
      return (
        <Badge variant="warning" className="flex items-center gap-1 px-2 py-1">
          <AlertTriangle className="h-3 w-3" />
          <span>Suspicious</span>
        </Badge>
      );
    } else if (transaction.is_fraud_reported) {
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
  const filteredTransactions = processedTransactions.filter(transaction => 
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.payer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.payee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

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
                      : transaction.fraudResult.isSuspicious
                        ? 'bg-amber-950/10'
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
                    {transaction.is_new_payee && (
                      <Badge variant="outline" className="ml-2 text-amber-400 border-amber-400/20 text-[10px] py-0">New</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {getFraudStatusElement(transaction)}
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
                    <div className="flex space-x-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full hover:bg-white/10"
                            onClick={() => handleViewDetails(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl bg-black/80 backdrop-blur-xl border-white/10">
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                            <DialogDescription>
                              Detailed information about this transaction and fraud analysis
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-6 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <p className="text-xs text-white/60">Transaction ID</p>
                                  <p className="font-mono text-sm">{selectedTransaction.id}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-white/60">Date & Time</p>
                                  <p className="text-sm">{new Date(selectedTransaction.date).toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-white/60">Amount</p>
                                  <p className="text-lg font-bold">{formatAmount(selectedTransaction.amount)}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-white/60">Status</p>
                                  <div>{getFraudStatusElement(selectedTransaction)}</div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Fraud Analysis</h4>
                                <div className="rounded-lg border border-white/10 p-4 bg-white/5">
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm">Fraud Score</span>
                                    <div className="text-lg font-bold">
                                      <span className={`
                                        ${selectedTransaction.fraud_score > 0.7 ? 'text-red-400' : 
                                          selectedTransaction.fraud_score > 0.4 ? 'text-amber-400' : 
                                          'text-green-400'}
                                      `}>
                                        {formatFraudScore(selectedTransaction.fraud_score)}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h5 className="text-xs font-medium text-white/70">Triggered Rules:</h5>
                                    {selectedTransaction.fraudResult.triggeredRules.length > 0 ? (
                                      <div className="space-y-2">
                                        {selectedTransaction.fraudResult.triggeredRules.map((rule: any) => (
                                          <div key={rule.ruleId} className="flex justify-between items-center text-sm p-2 rounded bg-white/10">
                                            <span>{rule.ruleName}</span>
                                            <Badge variant="outline" className="text-white/80 border-white/20">
                                              +{rule.weight.toFixed(1)} points
                                            </Badge>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-white/60">No rules triggered</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-medium">Payer Details</h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-white/60">Email:</span>
                                      <span>{selectedTransaction.payer_email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white/60">Device:</span>
                                      <span>{selectedTransaction.payer_device}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white/60">Browser:</span>
                                      <span className={selectedTransaction.payer_browser !== selectedTransaction.payer_usual_browser ? 'text-amber-400' : ''}>
                                        {selectedTransaction.payer_browser}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white/60">Location:</span>
                                      <span className={selectedTransaction.payer_location !== selectedTransaction.payer_usual_location ? 'text-amber-400' : ''}>
                                        {selectedTransaction.payer_location}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white/60">Usual Location:</span>
                                      <span>{selectedTransaction.payer_usual_location}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="text-sm font-medium">Transaction Context</h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-white/60">Channel:</span>
                                      <span className={selectedTransaction.channel !== selectedTransaction.usual_channel ? 'text-amber-400' : ''}>
                                        {selectedTransaction.channel}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white/60">Payment Mode:</span>
                                      <span>{selectedTransaction.payment_mode}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white/60">Gateway:</span>
                                      <span>{selectedTransaction.gateway}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white/60">New Payee:</span>
                                      <span className={selectedTransaction.is_new_payee ? 'text-amber-400' : ''}>
                                        {selectedTransaction.is_new_payee ? 'Yes' : 'No'}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-white/60">Recent Password Change:</span>
                                      <span className={selectedTransaction.password_changed_recently ? 'text-amber-400' : ''}>
                                        {selectedTransaction.password_changed_recently ? 'Yes' : 'No'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Statistical Analysis</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-white/60">Avg Transaction:</span>
                                    <span>{formatAmount(selectedTransaction.avg_transaction_amount)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-white/60">Std Deviation:</span>
                                    <span>{formatAmount(selectedTransaction.std_transaction_amount)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-white/60">Z-Score:</span>
                                    <span className={Math.abs((selectedTransaction.amount - selectedTransaction.avg_transaction_amount) / selectedTransaction.std_transaction_amount) > 3 ? 'text-amber-400' : ''}>
                                      {((selectedTransaction.amount - selectedTransaction.avg_transaction_amount) / selectedTransaction.std_transaction_amount).toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-white/60">Transactions in last hour:</span>
                                    <span className={selectedTransaction.transaction_count_last_hour > selectedTransaction.usual_transaction_count_per_hour * 2 ? 'text-amber-400' : ''}>
                                      {selectedTransaction.transaction_count_last_hour}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-xl border-white/10">
                          <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">Flag as fraud</DropdownMenuItem>
                          <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">Verify as legitimate</DropdownMenuItem>
                          <DropdownMenuItem className="text-white/80 focus:text-white hover:bg-white/10 cursor-pointer">Export data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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

export default EnhancedTransactionTable;
