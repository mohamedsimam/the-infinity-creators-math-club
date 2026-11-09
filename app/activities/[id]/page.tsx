import EventDetailContent from './EventDetailContent';
import { DEFAULT_DATA } from '@/app/lib/data';

export function generateStaticParams() {
  return (DEFAULT_DATA.events || []).map((event) => ({
    id: event.id,
  }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <EventDetailContent id={resolvedParams?.id} />;
}
