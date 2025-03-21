
import React from 'react';

interface ConfusionMatrixProps {
  truePositive: number;
  falsePositive: number;
  trueNegative: number;
  falseNegative: number;
  className?: string;
}

const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({
  truePositive,
  falsePositive,
  trueNegative,
  falseNegative,
  className,
}) => {
  const total = truePositive + falsePositive + trueNegative + falseNegative;
  
  const precision = truePositive / (truePositive + falsePositive) || 0;
  const recall = truePositive / (truePositive + falseNegative) || 0;
  const f1Score = 2 * ((precision * recall) / (precision + recall)) || 0;
  const accuracy = (truePositive + trueNegative) / total || 0;
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Confusion Matrix</div>
          <div className="grid grid-cols-3 grid-rows-3 border rounded-md overflow-hidden">
            <div className="row-start-1 col-start-1 p-2 bg-muted/30"></div>
            <div className="row-start-1 col-start-2 p-2 text-center bg-muted/30 font-medium text-sm">Predicted Fraud</div>
            <div className="row-start-1 col-start-3 p-2 text-center bg-muted/30 font-medium text-sm">Predicted Safe</div>
            
            <div className="row-start-2 col-start-1 p-2 flex items-center justify-start font-medium bg-muted/30 text-sm">
              <div className="transform -rotate-90">Actual Fraud</div>
            </div>
            <div className="row-start-2 col-start-2 p-4 text-center bg-green-100 dark:bg-green-900/20 border-r border-b border-border">
              <div className="font-bold">{truePositive}</div>
              <div className="text-xs text-muted-foreground">True Positive</div>
            </div>
            <div className="row-start-2 col-start-3 p-4 text-center bg-red-100 dark:bg-red-900/20 border-b border-border">
              <div className="font-bold">{falseNegative}</div>
              <div className="text-xs text-muted-foreground">False Negative</div>
            </div>
            
            <div className="row-start-3 col-start-1 p-2 flex items-center justify-start font-medium bg-muted/30 text-sm">
              <div className="transform -rotate-90">Actual Safe</div>
            </div>
            <div className="row-start-3 col-start-2 p-4 text-center bg-red-100 dark:bg-red-900/20 border-r border-border">
              <div className="font-bold">{falsePositive}</div>
              <div className="text-xs text-muted-foreground">False Positive</div>
            </div>
            <div className="row-start-3 col-start-3 p-4 text-center bg-green-100 dark:bg-green-900/20">
              <div className="font-bold">{trueNegative}</div>
              <div className="text-xs text-muted-foreground">True Negative</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Metrics</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-md bg-white dark:bg-black/40 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{(precision * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Precision</div>
            </div>
            <div className="p-4 border rounded-md bg-white dark:bg-black/40 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{(recall * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Recall</div>
            </div>
            <div className="p-4 border rounded-md bg-white dark:bg-black/40 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{(f1Score * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">F1 Score</div>
            </div>
            <div className="p-4 border rounded-md bg-white dark:bg-black/40 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{(accuracy * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;
