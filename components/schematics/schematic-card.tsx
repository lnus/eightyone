import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

export const SchematicCard = ({ id }: { id: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schematic {id}</CardTitle>
        <CardDescription>
          Author: <a href="#">lnus</a>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
