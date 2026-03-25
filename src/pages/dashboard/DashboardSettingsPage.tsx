import { useState } from 'react';
import { useVendorContext } from '@/contexts/VendorContext';
import { TIER_CONFIG } from '@/types';
import type { VendorTier } from '@/types';

const TIER_ORDER: VendorTier[] = ['Griot', 'Merchant', 'Mogul'];

const TIER_FEATURES: Record<string, Record<VendorTier, string>> = {
  'Platform Fee': { Griot: '20%', Merchant: '10%', Mogul: '4%' },
  'Listing Limit': { Griot: '10', Merchant: '100', Mogul: 'Unlimited' },
  'Monthly Cost': { Griot: 'Free', Merchant: '$49/mo', Mogul: '$200/mo' },
  'Analytics Dashboard': { Griot: 'Basic', Merchant: 'Advanced', Mogul: 'Full Suite' },
  'Priority Support': { Griot: '--', Merchant: 'Email', Mogul: 'Dedicated' },
  'Featured Placement': { Griot: '--', Merchant: 'Monthly', Mogul: 'Always On' },
};

export default function DashboardSettingsPage() {
  const { vendor, updateVendorTier } = useVendorContext();
  const currentTier = vendor?.tier ?? 'Griot';
  const config = TIER_CONFIG[currentTier];
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleTierChange = (newTier: VendorTier) => {
    updateVendorTier(newTier);
    setSuccessMsg(`Plan changed to ${newTier} successfully.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleConnectStripe = () => {
    alert('Coming Soon -- Stripe Connect onboarding will be available in a future update.');
  };

  return (
    <div className="dashboard-page">
      <h1>Settings</h1>

      {successMsg && (
        <div className="settings-success-msg">{successMsg}</div>
      )}

      {/* Current Plan */}
      <div className="dashboard-settings-plan">
        <h2>Current Plan</h2>
        <div className="settings-plan-current">
          <span className={`sidebar-tier-badge tier-${currentTier.toLowerCase()}`}>
            {currentTier}
          </span>
          <ul className="settings-plan-features">
            <li>Platform fee: {config.fee}%</li>
            <li>
              Listing limit:{' '}
              {config.limit === Infinity ? 'Unlimited' : config.limit}
            </li>
            <li>
              Monthly cost:{' '}
              {config.monthly === 0 ? 'Free' : `$${config.monthly}/mo`}
            </li>
          </ul>
        </div>

        <div className="settings-plan-actions">
          {currentTier === 'Griot' && (
            <>
              <button
                className="btn btn-primary"
                onClick={() => handleTierChange('Merchant')}
              >
                Upgrade to Merchant
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleTierChange('Mogul')}
              >
                Upgrade to Mogul
              </button>
            </>
          )}
          {currentTier === 'Merchant' && (
            <>
              <button
                className="btn btn-outline"
                onClick={() => handleTierChange('Griot')}
              >
                Downgrade to Griot
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleTierChange('Mogul')}
              >
                Upgrade to Mogul
              </button>
            </>
          )}
          {currentTier === 'Mogul' && (
            <>
              <button
                className="btn btn-outline"
                onClick={() => handleTierChange('Merchant')}
              >
                Downgrade to Merchant
              </button>
              <button
                className="btn btn-outline"
                onClick={() => handleTierChange('Griot')}
              >
                Downgrade to Griot
              </button>
            </>
          )}
        </div>

        {/* Tier Cards */}
        <div className="settings-plan-tiers">
          {TIER_ORDER.map((tier) => {
            const tc = TIER_CONFIG[tier];
            const isCurrent = tier === currentTier;
            return (
              <div
                key={tier}
                className={`settings-tier-card${isCurrent ? ' settings-tier-current' : ''}`}
              >
                <h3>{tier}</h3>
                <p className="settings-tier-price">
                  {tc.monthly === 0 ? 'Free' : `$${tc.monthly}/mo`}
                </p>
                <ul>
                  <li>{tc.fee}% platform fee</li>
                  <li>
                    {tc.limit === Infinity ? 'Unlimited' : tc.limit} listings
                  </li>
                </ul>
                {isCurrent && <span className="settings-tier-badge">Current</span>}
              </div>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <h2 className="settings-comparison-heading">Plan Comparison</h2>
        <div className="settings-comparison-grid">
          <table className="settings-comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                {TIER_ORDER.map((t) => (
                  <th key={t} className={t === currentTier ? 'comparison-current' : ''}>
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(TIER_FEATURES).map(([feature, values]) => (
                <tr key={feature}>
                  <td>{feature}</td>
                  {TIER_ORDER.map((t) => (
                    <td key={t} className={t === currentTier ? 'comparison-current' : ''}>
                      {values[t]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stripe Connect */}
      <div className="dashboard-settings-plan settings-stripe-section">
        <h2>Stripe Connect</h2>
        {vendor?.stripeAccountId ? (
          <div className="settings-plan-current">
            <p>
              Connected account: <strong>{vendor.stripeAccountId}</strong>
            </p>
          </div>
        ) : (
          <div className="settings-plan-current">
            <p>
              Connect your Stripe account to receive payouts from sales on the
              marketplace.
            </p>
            <button
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={handleConnectStripe}
            >
              Connect Stripe Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
