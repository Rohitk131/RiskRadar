
// Rule-based fraud detection engine

export interface Rule {
  id: string;
  name: string;
  description: string;
  weight: number;
  enabled: boolean;
  checkFunction: (transaction: Transaction, userHistory?: UserHistory) => boolean;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  channel: string;
  payment_mode: string;
  gateway: string;
  payer_email: string;
  payer_device: string;
  payer_location?: string;
  payer_usual_location?: string;
  payer_browser?: string;
  payer_usual_browser?: string;
  payee: string;
  is_new_payee?: boolean;
  avg_transaction_amount?: number;
  std_transaction_amount?: number;
  transaction_count_last_hour?: number;
  usual_transaction_count_per_hour?: number;
  password_changed_recently?: boolean;
  usual_channel?: string;
}

export interface UserHistory {
  avgTransactionAmount: number;
  stdTransactionAmount: number;
  usualLocation: string;
  usualDevice: string;
  usualBrowser: string;
  usualPayees: string[];
  usualTransactionCountPerHour: number;
  usualChannel: string;
  recentPasswordChange?: Date;
}

export interface FraudDetectionResult {
  transactionId: string;
  isFraud: boolean;
  isSuspicious: boolean;
  fraudScore: number;
  triggeredRules: {
    ruleId: string;
    ruleName: string;
    weight: number;
  }[];
  fraudReason: string;
}

// Define the rules
export const defaultRules: Rule[] = [
  {
    id: 'social-media-location-mismatch',
    name: 'Social Media Location Mismatch',
    description: 'Flags transactions originating from a location different from the user\'s usual social media activity',
    weight: 20,
    enabled: true,
    checkFunction: (transaction: Transaction) => {
      return transaction.payer_location !== transaction.payer_usual_location;
    }
  },
  {
    id: 'high-value-transaction',
    name: 'High-Value Transaction',
    description: 'Flags transactions exceeding a predefined threshold (e.g., 10x the user\'s average transaction value)',
    weight: 30,
    enabled: true,
    checkFunction: (transaction: Transaction) => {
      return transaction.amount > (transaction.avg_transaction_amount || 0) * 10;
    }
  },
  {
    id: 'z-score-anomaly',
    name: 'Z-Score Anomaly Detection',
    description: 'Identifies transactions that deviate significantly from the user\'s normal spending behavior',
    weight: 25,
    enabled: true,
    checkFunction: (transaction: Transaction) => {
      if (!transaction.avg_transaction_amount || !transaction.std_transaction_amount) return false;
      
      const zScore = (transaction.amount - transaction.avg_transaction_amount) / transaction.std_transaction_amount;
      return Math.abs(zScore) > 3; // More than 3 standard deviations
    }
  },
  {
    id: 'channel-switching',
    name: 'Channel Switching Behavior',
    description: 'Flags users who frequently switch between transaction methods',
    weight: 15,
    enabled: true,
    checkFunction: (transaction: Transaction) => {
      return transaction.channel !== transaction.usual_channel;
    }
  },
  {
    id: 'transaction-volume-spike',
    name: 'Sudden Spike in Transaction Volume',
    description: 'Flags a significant increase in the number of transactions within a short period',
    weight: 35,
    enabled: true,
    checkFunction: (transaction: Transaction) => {
      return (transaction.transaction_count_last_hour || 0) > (transaction.usual_transaction_count_per_hour || 0) * 3;
    }
  },
  {
    id: 'unusual-browser-device',
    name: 'Unusual Browser or Device Usage',
    description: 'Flags transactions from an unknown or unusual browser/device',
    weight: 30,
    enabled: true,
    checkFunction: (transaction: Transaction) => {
      return transaction.payer_browser !== transaction.payer_usual_browser || 
             transaction.payer_device.toLowerCase().includes('headless') ||
             transaction.payer_browser?.toLowerCase().includes('tor');
    }
  },
  {
    id: 'new-payee-high-amount',
    name: 'New Payee with High Transaction Amount',
    description: 'Flags high-value transactions to new payees',
    weight: 40,
    enabled: true,
    checkFunction: (transaction: Transaction) => {
      return transaction.is_new_payee === true && 
             transaction.amount > (transaction.avg_transaction_amount || 0) * 5;
    }
  },
  {
    id: 'password-change-high-transaction',
    name: 'Password Change & High-Value Transaction',
    description: 'Flags transactions made shortly after a password change',
    weight: 35,
    enabled: true,
    checkFunction: (transaction: Transaction) => {
      return transaction.password_changed_recently === true && 
             transaction.amount > (transaction.avg_transaction_amount || 0) * 5;
    }
  }
];

// Dynamic weight adjustment function
const calculateDynamicWeight = (triggeredRules: Rule[]): number => {
  if (triggeredRules.length <= 1) return 1;
  
  // Increase weight by 20% for each additional rule triggered beyond the first
  return 1 + ((triggeredRules.length - 1) * 0.2);
};

// Thresholds for fraud classification
const FRAUD_THRESHOLD = 70;
const SUSPICIOUS_THRESHOLD = 40;

// Main detection function
export const detectFraud = (
  transaction: Transaction, 
  rules: Rule[] = defaultRules,
  userHistory?: UserHistory
): FraudDetectionResult => {
  // Filter only enabled rules
  const enabledRules = rules.filter(rule => rule.enabled);
  
  // Check which rules are triggered
  const triggeredRules = enabledRules.filter(rule => 
    rule.checkFunction(transaction, userHistory)
  );
  
  // Calculate dynamic weight multiplier
  const dynamicMultiplier = calculateDynamicWeight(triggeredRules);
  
  // Calculate total score
  let totalScore = 0;
  const triggeredRuleDetails = triggeredRules.map(rule => {
    const adjustedWeight = rule.weight * dynamicMultiplier;
    totalScore += adjustedWeight;
    return {
      ruleId: rule.id,
      ruleName: rule.name,
      weight: adjustedWeight
    };
  });
  
  // Determine if the transaction is fraudulent
  const isFraud = totalScore >= FRAUD_THRESHOLD;
  const isSuspicious = totalScore >= SUSPICIOUS_THRESHOLD && !isFraud;
  
  // Generate fraud reason
  let fraudReason = '';
  if (isFraud || isSuspicious) {
    fraudReason = triggeredRuleDetails
      .map(rule => `${rule.ruleName} (Score: ${rule.weight.toFixed(1)})`)
      .join(', ');
  }
  
  return {
    transactionId: transaction.id,
    isFraud,
    isSuspicious,
    fraudScore: totalScore,
    triggeredRules: triggeredRuleDetails,
    fraudReason
  };
};
