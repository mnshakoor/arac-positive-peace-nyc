import Link from "next/link";
import { PeaceMark } from "@/components/PeaceMark";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center py-28 text-center">
      <PeaceMark size={72} />
      <p className="kicker mt-6">404</p>
      <h1 className="mt-2 font-display text-4xl text-ink">This page could not be found</h1>
      <p className="mt-3 max-w-md text-ink-2">The story may have moved. Try the latest event coverage or the newsroom.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/nyc-events" className="btn btn-solid">NYC Events</Link>
        <Link href="/press-media" className="btn btn-outline">Press &amp; Media</Link>
      </div>
    </div>
  );
}
