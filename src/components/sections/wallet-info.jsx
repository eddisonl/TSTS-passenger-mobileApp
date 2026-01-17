import { CreditCard, Plus, Send, History } from "lucide-react";

export default function WalletInfo({ passenger }) {
  const transactions = [
    {
      id: 1,
      type: "booking",
      description: "Booking: Accra to Tema",
      amount: -15.5,
      date: "Today 10:30 AM",
    },
    {
      id: 2,
      type: "topup",
      description: "Wallet Top-up",
      amount: 100.0,
      date: "Yesterday 2:15 PM",
    },
    {
      id: 3,
      type: "booking",
      description: "Booking: Kumasi to Takoradi",
      amount: -45.0,
      date: "2 days ago",
    },
    {
      id: 4,
      type: "refund",
      description: "Refund: Cancelled Booking",
      amount: 28.0,
      date: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Wallet Balance */}
      <div className="bg-gradient-to-br from-pass-primary to-pass-accent rounded-2xl p-6 text-white shadow-lg">
        <p className="text-sm opacity-90 mb-2">Wallet Balance</p>
        <h2 className="text-4xl font-bold mb-6">
          GHS {passenger.wallet.toFixed(2)}
        </h2>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="opacity-80 text-xs mb-1">Monthly Spending</p>
            <p className="font-semibold">GHS 234.50</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="opacity-80 text-xs mb-1">Trips This Month</p>
            <p className="font-semibold">12</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-pass-surface border border-pass-border rounded-xl p-4 text-center hover:border-pass-primary hover:shadow-lg transition-all">
          <Plus className="w-6 h-6 text-pass-primary mx-auto mb-2" />
          <p className="text-sm font-semibold text-pass-foreground">Top Up</p>
        </button>
        <button className="bg-pass-surface border border-pass-border rounded-xl p-4 text-center hover:border-pass-primary hover:shadow-lg transition-all">
          <Send className="w-6 h-6 text-pass-accent mx-auto mb-2" />
          <p className="text-sm font-semibold text-pass-foreground">
            Send Money
          </p>
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-pass-surface border border-pass-border rounded-2xl p-4 space-y-3">
        <h3 className="font-bold text-pass-foreground flex items-center gap-2">
          <History className="w-5 h-5" />
          Transaction History
        </h3>

        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-pass-bg rounded-lg hover:border border-pass-border transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-pass-primary/20 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-pass-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-pass-foreground">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-pass-muted">{transaction.date}</p>
                </div>
              </div>
              <p
                className={`text-sm font-bold whitespace-nowrap ml-2 ${
                  transaction.amount > 0
                    ? "text-pass-primary"
                    : "text-pass-foreground"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-pass-surface border border-pass-border rounded-2xl p-4 space-y-3">
        <h3 className="font-bold text-pass-foreground">
          Saved Payment Methods
        </h3>

        <div className="space-y-2">
          <div className="p-3 bg-pass-bg rounded-lg border border-pass-border flex items-center justify-between hover:border-pass-primary transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📱</div>
              <div>
                <p className="text-sm font-semibold text-pass-foreground">
                  MTN Mobile Money
                </p>
                <p className="text-xs text-pass-muted">024X XXX XXXX</p>
              </div>
            </div>
            <span className="text-xs bg-pass-primary/20 text-pass-primary px-2 py-1 rounded">
              Default
            </span>
          </div>

          <div className="p-3 bg-pass-bg rounded-lg border border-pass-border flex items-center justify-between hover:border-pass-primary transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💳</div>
              <div>
                <p className="text-sm font-semibold text-pass-foreground">
                  Visa Card
                </p>
                <p className="text-xs text-pass-muted">•••• •••• •••• 4242</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-2 text-pass-primary font-semibold text-sm hover:underline">
          + Add Payment Method
        </button>
      </div>
    </div>
  );
}
