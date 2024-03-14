import { SchematicCard } from '@/components/schematics/schematic-card';

export default function Schematics() {
  // For now, just loop and spawn 10 schematic cards with a random ID
  return (
    <main>
      <div className="container py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 10 }, (_, i) => (
            <SchematicCard key={i} id={i.toString()} />
          ))}
        </div>
      </div>
    </main>
  );
}
