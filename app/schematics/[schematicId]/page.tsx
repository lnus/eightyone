export default function SchematicDetails({
  params,
}: {
  params: { schematicId: string };
}) {
  return (
    <main>
      <p>Schematic Details</p>
      <p>{params.schematicId}</p>
    </main>
  );
}
