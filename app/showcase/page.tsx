import { redirect } from 'next/navigation';

export default function ShowcasePage() {
  redirect('/gallery?tab=showcase');
}
