import StatCounter from '@/components/ui/StatCounter';

const STATS = [
  { target: 5_000, label: 'Active Vendors' },
  { target: 150_000, label: 'Products Listed' },
  { target: 75, label: 'Countries' },
  { target: 2_000_000, label: 'Community Members' },
] as const;

export default function StatsBar() {
  return (
    <section className="stats-wrapper">
      <div className="stats">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item">
            <StatCounter target={s.target} label={s.label} />
          </div>
        ))}
      </div>
    </section>
  );
}
