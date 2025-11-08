import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CryptoTableSkeleton() {
  const headerColumns = [
    "w-[60px]", // Rank
    "w-[180px]", // Name
    "w-[100px]", // Price
    "w-[80px]", // 1h
    "w-[80px]", // 24h
    "w-[80px]", // 7d
    "w-[120px]", // Volume
    "w-[120px]", // Market Cap
  ];

  const dummyRows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {headerColumns.map((width, i) => (
              <TableHead key={i} className={width}>
                <Skeleton className="h-5 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyRows.map((row) => (
            <TableRow key={row}>
              <TableCell>
                <Skeleton className="h-5 w-3 rounded" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
