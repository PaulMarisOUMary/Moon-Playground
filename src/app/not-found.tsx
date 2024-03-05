import Link from "next/link";
import { ROUTE_ROOT } from "./lib/routes/routes";

export default function NotFound() {
    return (
        <Link href={ROUTE_ROOT}>Not found</Link>
    );
}